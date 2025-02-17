// referencing elements from HTML to control music player through javascript
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const songTitle = document.getElementById("song-title");


// array of songs, storing info about file path and song title
const songs = [
    { src: "audio/kissme.mp3", title: "Sixpence None The Richer - Kiss Me" },
    { src: "audio/coldplay.mp3", title: "Coldplay - Something Just Like This" },
    { src: "audio/beatles.mp3", title: "The Beatles - Here Comes the Sun" }
];

let currentSongIndex = 0; //keeps track of which song is currently playing
let isPlaying = false; // tracks whether audio is playing or paused

// loading songs
function loadSong(index) {
    audio.src = songs[index].src; //sets the audio source to the selected song
    songTitle.innerHTML = `<i>${songs[index].title}</i>`; //updates the displayed song title in italic
    playPauseBtn.src = "img/play.png"; // resets the play/pause button to show 'play'
    isPlaying = false; //resets the playing state
}
loadSong(currentSongIndex);

// play/pause function 
playPauseBtn.addEventListener("click", () => { //when the play/pause image is clicked, the function activates
    if (!isPlaying) {
        audio.play();
        playPauseBtn.src = "img/stop.png"; // show pause image
        isPlaying = true;
    } else {
        audio.pause(); // pausing instead of resetting the whole song
        playPauseBtn.src = "img/play.png"; // show play image
        isPlaying = false;
    }
});

// next song function
nextBtn.addEventListener("click", () => { //when the next icon image is clicked, the function activates
    currentSongIndex = (currentSongIndex + 1) % songs.length; //cycling through the playlist forward using modulo operator
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = "img/stop.png";
    isPlaying = true;
});

// previous song function
prevBtn.addEventListener("click", () => { //when the back icon image is clicked, the function activates
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; //cycling through the playlist back using modulo operator
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = "img/stop.png"; 
    isPlaying = true;
});

// progress bar - updates as song plays
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0; //updating the progress bar in real-time
});

// seeking in song
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// resetting play/pause button when song ends
audio.addEventListener("ended", () => {
    playPauseBtn.src = "img/play.png"; // Reset to play icon
    isPlaying = false;
});


// creating sun elements for the main page animation
function createSunElements() {
    const sunContainer = document.createElement('div');
    sunContainer.id = 'sun-container';
    
    const corona = document.createElement('div');
    corona.id = 'corona';
    
    const glow = document.createElement('div');
    glow.id = 'glow';
    
    const sun = document.createElement('div');
    sun.id = 'sun';
    
    // appending elements in correct order
    sunContainer.appendChild(glow);
    sunContainer.appendChild(corona);
    sunContainer.appendChild(sun);
    
    const header = document.querySelector('.header');
    header.appendChild(sunContainer); //adding to the header section
}

function initSunAnimation() {
    const sun = document.getElementById('sun');
    const glow = document.getElementById('glow');
    const corona = document.getElementById('corona');
    const header = document.querySelector('.header');

    //tracking mouse movement
    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // updating positions of all elements
        sun.style.left = x + 'px';
        sun.style.top = y + 'px';
        corona.style.left = x + 'px';
        corona.style.top = y + 'px';
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });

    //mouse leave effect when it leaves the header
    header.addEventListener('mouseleave', () => {
        sun.style.opacity = '0';
        corona.style.opacity = '0';
        glow.style.opacity = '0';
    });

    //mouse enter effect when it enters the header section
    header.addEventListener('mouseenter', () => {
        sun.style.opacity = '0.9';
        corona.style.opacity = '0.7';
        glow.style.opacity = '1';
    });

    // creating pulsing animation
    function pulseAnimation() {
        let scale = 1;
        let growing = true;
        let coronaScale = 1;

        //makes the sun elements grow in size and go backr
        setInterval(() => {
            if (growing) {
                scale += 0.003;
                coronaScale += 0.004;
                if (scale >= 1.05) growing = false;
            } else {
                scale -= 0.003;
                coronaScale -= 0.004;
                if (scale <= 0.95) growing = true;
            }
            
            sun.style.transform = `translate(-50%, -50%) scale(${scale})`;
            corona.style.transform = `translate(-50%, -50%) scale(${coronaScale})`;
        }, 50);
    }

    pulseAnimation();
}

document.addEventListener('DOMContentLoaded', () => { //ensures all animations and elements are initialized after the page loads completely.
    createSunElements();
    initSunAnimation();
});

