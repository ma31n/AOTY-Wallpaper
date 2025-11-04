function update(){
    fetch('AOTYjson.txt').then(response => response.text()).then(data => {
        let obj = eval(data);

        let rand = Math.floor(Math.random() * obj.length);
        //`${obj[rand].artist}\n${obj[rand].album}\n${obj[rand].rating}`;
        
        searchLastFM(obj[rand].artist, obj[rand].album)
        .then(data => {
            console.log(data);
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

            document.getElementById('bg-img').src = data.album.image[4]['#text'];
        });

    });
}

//setInterval(update, 5000);

let api_key = '9cac2ae29a26c0653a024c68295349e3';
let username = 'ma31nho';

async function searchLastFM(artist, album){
    return fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${api_key}&artist=${artist}&album=${album}&username=${username}&autocorrect=1&format=json`)
    .then(response => response.json()) 
}

document.getElementById('btn').addEventListener('click', update);