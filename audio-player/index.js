let allMusic = [
    {
        title:'Chasing Sunbeams',
        artist:'Luna Bright',
        img:'assets/img/Luna_Bright.JPG',
        src:'assets/audio/Chasing_Sunbeams-Luna_Bright.mp3',
        duration:'1:15',
        liked: false
    },
    {
        title:'Cozy Mornings',
        artist:'Oliver & Sound',
        img:'assets/img/Oliver.JPG',
        src:'assets/audio/Cozy_Mornings-Oliver&Sound.mp3',
        duration:'1:35',
        liked: false
    },
    {
        title:'Feline Fiesta',
        artist:'Kitty Bliss',
        img:'assets/img/Kitty_Bliss.JPG',
        src:'assets/audio/Feline_Fiesta-Kitty_Bliss.mp3',
        duration:'2:39',
        liked: false
    },
    {
        title:'Gentle Paws',
        artist:'Sunny Whiskers',
        img:'assets/img/Sunny_Whiskers.JPG',
        src:'assets/audio/Gentle_Paws-Sunny_Whiskers.mp3',
        duration:'1:52',
        liked: false
    },
    {
        title:'Meowgical Moments',
        artist:'Chloe Sparkle',
        img:'assets/img/Chloe_Sparkle.JPG',
        src:'assets/audio/Meowgical_Moments-Chloe_Sparkle.mp3',
        duration:'1:57',
        liked: false
    },
    {
        title:'Paws & Sunshine',
        artist:'Mia Melody',
        img:'assets/img/Mia.JPG',
        src:'assets/audio/Paws&Sunshine-Mia_Melody.mp3',
        duration:'2:15',
        liked: false
    },
    {
        title:'Purrfectly Happy',
        artist:'Tom & Harmony',
        img:'assets/img/Tom.JPG',
        src:'assets/audio/Purrfectly_Happy-Tom&Harmony.mp3',
        duration:'1:40',
        liked: false
    },
    {
        title:'Whiskers on Fire',
        artist:'Felix Tune',
        img:'assets/img/Felix_Tune.JPG',
        src:'assets/audio/Whiskers_on_Fire-Felix_Tune.mp3',
        duration:'1:10',
        liked: false
    }
]

const player = document.querySelector('.player');
const playerImage = document.querySelector('.player__image');
const playerTitle = document.querySelector('.player__title');
const playerArtist = document.querySelector('.player__artist');
const mainAudio = document.getElementById('main-audio');
const playButton = document.querySelector('.button.play');
const nextButton = document.querySelector('.button.next');
const prevButton = document.querySelector('.button.prev');
const progressBar = document.querySelector('.progress__bar');
const currentTimeDisplay = document.querySelector('.time__current');
const totalTimeDisplay = document.querySelector('.time__total');
const playlist = document.querySelector('.playlist');
const heartIcon = document.querySelector('.heart-icon');


heartIcon.addEventListener('click', () => {
    allMusic[musicIndex].liked = !allMusic[musicIndex].liked; 
    updateHeartIcon(); 
});

function updateHeartIcon() {
    if (allMusic[musicIndex].liked) {
        heartIcon.innerText = 'favorite'; 
        heartIcon.classList.add('active'); 
    } else {
        heartIcon.innerText = 'favorite_border'; 
        heartIcon.classList.remove('active'); 
    }
}

//! play / pause
let musicIndex = 0;
let isPlaying = false;

window.addEventListener('load', ()=>{
    mainAudio.volume = 0.5; 
    currentTimeDisplay.innerText = formatTime(0);
    loadMusic(musicIndex);
    updateVolumeLevel();
});

function loadMusic(musicIndex) {
    if (musicIndex >= 0 && musicIndex < allMusic.length) {
    playerTitle.innerText = allMusic[musicIndex].title;
    playerArtist.innerText = allMusic[musicIndex].artist;
    playerImage.style.backgroundImage = `url('${allMusic[musicIndex].img}')`;
    mainAudio.src = allMusic[musicIndex].src;
    }
}

function playMusic() {
    player.classList.add('played');
    playButton.querySelector('i').innerText = 'pause';
    mainAudio.play();
    playerImage.classList.add('play');
    isPlaying = true;
}

function pauseMusic(){
    player.classList.remove('played');
    playButton.querySelector('i').innerText = 'play_arrow';
    mainAudio.pause();
    playerImage.classList.remove('play');
    isPlaying = false;
}

function playNext() {
    musicIndex = (musicIndex + 1) % allMusic.length; 
    loadMusic(musicIndex);
    if (isPlaying) playMusic();
    updatePlaylist();
}

function playPrev() {
    musicIndex = (musicIndex - 1 + allMusic.length) % allMusic.length; 
    loadMusic(musicIndex);
    if (isPlaying) playMusic();
    updatePlaylist();
}

playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);

// ! volume control
const volumeDown = document.querySelector('.volume-down');
const volumeUp = document.querySelector('.volume-up');
const volumeLevel = document.querySelector('.volume-control__level');

function updateVolumeLevel() {
    const volumePercent = Math.round(mainAudio.volume * 100);
    volumeLevel.textContent = `${volumePercent}%`;
    volumeDown.disabled = mainAudio.volume === 0; 
    volumeUp.disabled = mainAudio.volume === 1; 
}

function changeVolume(step) {
    mainAudio.volume = Math.min(1, Math.max(0, (mainAudio.volume + step).toFixed(1)));
    updateVolumeLevel();
    volumeLevel.classList.add('active');
    setTimeout(() => volumeLevel.classList.remove('active'), 1000);
}

volumeDown.addEventListener('click', () => changeVolume(-0.1));
volumeUp.addEventListener('click', () => changeVolume(0.1));

// ! audio duration
mainAudio.addEventListener('loadedmetadata', () => {
    const duration = mainAudio.duration;
    totalTimeDisplay.innerText = formatTime(duration);
    progressBar.max = duration;
});

mainAudio.addEventListener('timeupdate', () => {
    const currentTime = mainAudio.currentTime;
    progressBar.value = currentTime;
    currentTimeDisplay.innerText = formatTime(currentTime);
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

progressBar.addEventListener('input', (e) => {
    mainAudio.currentTime = e.target.value;
});

// !Repeat
const repeatButton = document.querySelector('.button.repeat');

let isRepeat = false;

repeatButton.addEventListener('click', () => {
    isRepeat = !isRepeat;
    repeatButton.classList.toggle('active', isRepeat);

    if (isRepeat) {
        repeatButton.querySelector('i').innerText = 'repeat_one';
    } else {
        repeatButton.querySelector('i').innerText = 'repeat';
    }
});

mainAudio.addEventListener('ended', () => {
    if (isRepeat) {
        mainAudio.currentTime = 0;
        playMusic();
    }
});

// ! Open / Close
const openListButton = document.querySelector('.button.list');
const closeListButton = document.querySelector('.button.close');

openListButton.addEventListener('click', () => {
    playlist.classList.add('open');
});

closeListButton.addEventListener('click', closePlaylist);

document.addEventListener('click', (event) => {
    if (!playlist.contains(event.target) && !openListButton.contains(event.target) && !closeListButton.contains(event.target)) {
        closePlaylist();
    }
});

function closePlaylist() {
    playlist.classList.remove('open');
}

//! create playlist
const playlistTracks = document.querySelector('.playlist__tracks');
let currentTrackIndex = 0;

function createTrackItem(track, index) {
    const li = document.createElement('li');
    li.classList.add('tracks__item');
    li.dataset.index = index;
    li.innerHTML = `
        <div class="item__info">
            <span class="item__title">${track.title}</span>
            <p class="item__artist">${track.artist}</p>
        </div>
        <div class="item__duration">${track.duration}</div>
    `;
    return li;
}

function renderPlaylist() {
    playlistTracks.innerHTML = '';
    allMusic.forEach((track, index) => {
        const trackItem = createTrackItem(track, index);
        playlistTracks.appendChild(trackItem);
    });
}
//! update playlist
function updatePlaylist() {
    const allTracks = document.querySelectorAll('.tracks__item');
    allTracks.forEach((track, musicIndex) => {
        const duration = track.querySelector('.item__duration');
        if (musicIndex === currentTrackIndex) {
            track.classList.add('active');
            duration.innerText = 'playing';
            duration.classList.add('playing');
        } else {
            track.classList.remove('active');
            duration.innerText = allMusic[musicIndex].duration;
            duration.classList.remove('playing');
        }
    });
}

playlistTracks.addEventListener('click', (event) => {
    const item = event.target.closest('.tracks__item');
    if (item) {
        currentTrackIndex = parseInt(item.dataset.index, 10);
        loadMusic(currentTrackIndex);
        playMusic();
        updatePlaylist();
    }
});

renderPlaylist();
updatePlaylist();











