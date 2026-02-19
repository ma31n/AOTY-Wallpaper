function getJSONdataFromUsername(username){
    username = username.toLowerCase();
    username = username.replaceAll('_', '-');
    statusText.innerText = `fetching data for ${username}...  (might take a minute or two)`;
    return fetch(`https://aotywallpaperhelper-1.onrender.com/user/${username}`)
}

function update(){
    
    if(settings.username==null || settings.apiKey==null){
        document.getElementById('artist').innerText = "Please fill in the settings form.";
        console.log('missing settings...');
        return;
    }


    let obj = JSON.parse(settings.jsonData);

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
        if(obj[rand].rating <= settings.minRating){
            console.log('rating too low, retrying...');
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

                load(data);
                document.getElementById('main').removeEventListener('transitionend', handler);
            });

        }

    });

}

async function settingsUpdate(e){
    e.preventDefault();
    document.getElementById('save-status').innerText = "Updating settings...";
    let interval = document.getElementById('interval').value;
    let minRating = document.getElementById('rating').value;
    let apiKey = document.getElementById('api_key').value;
    let username = document.getElementById('username').value;

    if(username!=settings.username){
        await getJSONdataFromUsername(username)
        .then(response => {
            if(response.ok) return response.json()
            statusText.innerText = 'Failed to fetch user data. Please check your username and try again.';
            throw new Error('Failed to fetch user data', response.status);
            })
        .then(data => {
            settings.jsonData = JSON.stringify(data);
            console.log('fetched user!', settings.jsonData);
            document.getElementById('json-display').innerText = settings.jsonData;
            update();
        });
    }

    if(interval != settings.interval){
        clearInterval(update);
        setInterval(update, interval * 1000);
    }

    settings.interval = interval;
    settings.minRating = minRating;
    settings.apiKey = apiKey;
    settings.username = username;

    

    localStorage.setItem('settings', JSON.stringify(settings));
    statusText.innerText = "Settings updated!";

    update();
}

async function searchLastFM(artist, album){
    return fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${settings.apiKey}&artist=${artist}&album=${album}&username=${settings.username}&autocorrect=1&format=json`)
    .then(response => response.json()) 
}


//CODE START
let settings = {
    interval: document.getElementById('interval').value,
    minRating: document.getElementById('rating').value,
    apiKey: "9cac2ae29a26c0653a024c68295349e3",
    username: null,
    jsonData: null
}

let statusText = document.getElementById('save-status');
document.getElementById('api_key').value = settings.apiKey;

let temp = localStorage.getItem('settings');
console.log(settings);
if(temp!==null){
    console.log(temp);
    temp = JSON.parse(temp);

    document.getElementById('interval').value = temp.interval;
    document.getElementById('rating').value = temp.minRating;
    document.getElementById('api_key').value = temp.apiKey;
    document.getElementById('username').value = temp.username;
    document.getElementById('json-display').innerText = temp.jsonData;

    settings.apiKey = temp.apiKey;
    settings.username = temp.username;
    settings.jsonData = temp.jsonData;
    settings.interval = temp.interval;
    settings.minRating = temp.minRating;
}

update();
setInterval(update, settings.interval * 1000);


document.getElementById("settings-form").addEventListener('submit', settingsUpdate);

document.getElementById('settings-container').classList.add('panel-hidden');

document.getElementById('settings-button').addEventListener('click', function(){
    let settingsContainer = document.getElementById('settings-container');
    let bodyContainer = document.getElementById('body');
    statusText.innerText = "";
    settingsContainer.classList.toggle('panel-hidden');
    bodyContainer.classList.toggle('panel-hidden');

});