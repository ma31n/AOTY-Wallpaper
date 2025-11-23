function update(){
    let obj = JSON.parse(data);

    let rand = Math.floor(Math.random() * obj.length);
    //`${obj[rand].artist}\n${obj[rand].album}\n${obj[rand].rating}`;
    
    searchLastFM(obj[rand].artist, obj[rand].album)
    .then(data => {
        console.log(data);
        if(!data.album || !data.album.tracks){
            console.log('retrying...');
            update();
            return;
        }


        function load(data){

            document.getElementById('cover').src = data.album.image[4]['#text'];
            document.getElementById('artist').innerText = "by " + obj[rand].artist;
            document.getElementById('album').innerText = obj[rand].album;
            document.getElementById('rating-bar').innerText = `${obj[rand].rating}`;
            document.getElementById('rating-bar').style.width = `${obj[rand].rating}%`;

            let list = document.getElementsByTagName('ol')[0];
            list.innerHTML = '';
            for(let i = 0; i < data.album.tracks.track.length; i++){
                let newli = document.createElement('li');
                newli.innerText = data.album.tracks.track[i].name;
                list.appendChild(newli);
            }

            document.getElementById('main').style.opacity = '1';

        }

        let img = document.getElementById('bg-img');
        img.src = data.album.image[4]['#text'];

        img.onload = function(){
            document.getElementById('main').style.opacity = '0';

            document.getElementById('main').addEventListener('transitionend', function handler(){
                console.log('hoće');
                load(data);
                document.getElementById('main').removeEventListener('transitionend', handler);
            });

        }

    });

}

function settingsUpdate(e){
    e.preventDefault();

    let interval = document.getElementById('interval').value;
    let minRating = document.getElementById('rating').value;
    let jsonData = document.getElementById('data').value;
    let apiKey = document.getElementById('api_key').value;
    let username = document.getElementById('username').value;

    settings = {
        interval: interval,
        minRating: minRating,
        jsonData: jsonData,
        apiKey: apiKey,
        username: username
    };

    let reader = new FileReader();
    reader.readAsText(document.getElementById('data').files[0]);
    
    reader.onload = function(e) {
        let contents = e.target.result;
        settings.jsonData = contents;
        
        localStorage.setItem('settings', JSON.stringify(settings));
    }
    
}

async function searchLastFM(artist, album){
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${artist}&album=${album}&username=${username}&autocorrect=1&format=json`)
    .then(response => response.json()) 
}

let api_key = '9cac2ae29a26c0653a024c68295349e3';
let username = 'ma31nho';
let data = null;

let settings = localStorage.getItem('settings');
console.log(settings);
if(settings!==null){
    settings = JSON.parse(settings);

    document.getElementById('interval').value = settings.interval;
    document.getElementById('rating').value = settings.minRating;
    document.getElementById('api_key').value = settings.apiKey;
    document.getElementById('username').value = settings.username;
    document.getElementById('json-display').innerText = settings.jsonData;

    api_key = settings.apiKey;
    username = settings.username;
    data = settings.jsonData;
}

update();
setInterval(update, 30000);


window.addEventListener('keypress', update);

document.getElementById("settings-form").addEventListener('submit', settingsUpdate);