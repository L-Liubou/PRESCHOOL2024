let allMusic = [
    {
        title:'Chasing Sunbeams',
        artist:'Luna Bright',
        img:'assets/img/Luna_Bright.JPG',
        src:'assets/audio/Chasing_Sunbeams-Luna_Bright.mp3',
        duration:'1:15'
    },
    {
        title:'Cozy Mornings',
        artist:'Oliver & Sound',
        img:'assets/img/Oliver.JPG',
        src:'assets/audio/Cozy_Mornings-Oliver&Sound.mp3',
        duration:'1:35'
    },
    {
        title:'Feline Fiesta',
        artist:'Kitty Bliss',
        img:'assets/img/Kitty_Bliss.JPG',
        src:'assets/audio/Feline_Fiesta-Kitty_Bliss.mp3',
        duration:'2:39'
    },
    {
        title:'Gentle Paws',
        artist:'Sunny Whiskers',
        img:'assets/img/Sunny_Whiskers.JPG',
        src:'assets/audio/Gentle_Paws-Sunny_Whiskers.mp3',
        duration:'1:52'
    },
    {
        title:'Meowgical Moments',
        artist:'Chloe Sparkle',
        img:'assets/img/Chloe_Sparkle.JPG',
        src:'assets/audio/Meowgical_Moments-Chloe_Sparkle.mp3',
        duration:'1:57'
    },
    {
        title:'Paws & Sunshine',
        artist:'Mia Melody',
        img:'assets/img/Mia.JPG',
        src:'assets/audio/Paws&Sunshine-Mia_Melody.mp3',
        duration:'2:15'
    },
    {
        title:'Purrfectly Happy',
        artist:'Tom & Harmony',
        img:'assets/img/Tom.JPG',
        src:'assets/audio/Purrfectly_Happy-Tom&Harmony.mp3',
        duration:'1:40'
    },
    {
        title:'Whiskers on Fire',
        artist:'Felix Tune',
        img:'assets/img/Felix_Tune.JPG',
        src:'assets/audio/Whiskers_on_Fire-Felix_Tune.mp3',
        duration:'1:10'
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
let isFavorite = false;

heartIcon.addEventListener('click', () => {
    isFavorite = !isFavorite;
    heartIcon.innerText = isFavorite ? 'favorite' : 'favorite_border';
    heartIcon.classList.toggle('active');

});

//! play / pause
let musicIndex = 0;
let isPlaying = false;

window.addEventListener('load', ()=>{
    loadMusic(musicIndex);
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
    musicIndex++;
    if (musicIndex > allMusic.length - 1) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    if (isPlaying) {
        playMusic();
    }
}

function playPrev() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = allMusic.length - 1;
    }
    loadMusic(musicIndex);
    if (isPlaying) {
        playMusic();
    }
}

playButton.addEventListener('click', () => {
    const isPlayed = player.classList.contains('played');
    isPlayed ? pauseMusic() : playMusic();
});

nextButton.addEventListener('click',() => {
    playNext();
});

prevButton.addEventListener('click',() => {
    playPrev();
});

// ! volume control
const volumeDown = document.querySelector('.volume-down');
const volumeUp = document.querySelector('.volume-up');
const volumeLevel = document.querySelector('.volume-control__level');

function updateVolumeLevel() {
    let volumePercent = Math.floor(mainAudio.volume * 100);
    volumeLevel.textContent = `${volumePercent}%`;
}

window.addEventListener('load', () => {
    mainAudio.volume = 0.5;
    updateVolumeLevel();
});

volumeDown.addEventListener('click', () => {
    mainAudio.volume = Math.max(0, mainAudio.volume - 0.1);
    updateVolumeLevel();
    volumeLevel.classList.add('active');

    setTimeout(() => {
        volumeLevel.classList.remove('active');
    }, 1000);
});

volumeUp.addEventListener('click', () => {
    mainAudio.volume = Math.min(1, mainAudio.volume + 0.1);
    updateVolumeLevel();
    volumeLevel.classList.add('active');

    setTimeout(() => {
        volumeLevel.classList.remove('active');
    }, 1000);
});

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

function closePlaylist() {
    playlist.classList.remove('open');
}

openListButton.addEventListener('click', () => {
    playlist.classList.add('open');
});

closeListButton.addEventListener('click', () => {
    closePlaylist();
});

document.addEventListener('click', (event) => {
    if (!playlist.contains(event.target) && !openListButton.contains(event.target) && !closeListButton.contains(event.target)) {
        closePlaylist();
    }
});










