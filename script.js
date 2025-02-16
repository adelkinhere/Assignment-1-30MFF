const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const songTitle = document.getElementById("song-title");


// Array of songs (you can add more)
const songs = [
    { src: "audio/kissme.mp3", title: "Sixpence None The Richer - Kiss Me" },
    { src: "audio/coldplay.mp3", title: "Coldplay - Something Just Like This" },
    { src: "audio/beatles.mp3", title: "The Beatles - Here Comes the Sun" }
];

let currentSongIndex = 0;
let isPlaying = false; // Track song state

// Load first song
function loadSong(index) {
    audio.src = songs[index].src;
    songTitle.innerHTML = `<i>${songs[index].title}</i>`;
    playPauseBtn.src = "img/play.png"; // Ensure play button resets
    isPlaying = false;
}
loadSong(currentSongIndex);

// Play/Pause function (One Image Switch)
playPauseBtn.addEventListener("click", () => {
    if (!isPlaying) {
        audio.play();
        playPauseBtn.src = "img/stop.png"; // Show pause icon
        isPlaying = true;
    } else {
        audio.pause(); // Pause instead of resetting
        playPauseBtn.src = "img/play.png"; // Show play icon
        isPlaying = false;
    }
});

// Next Song
nextBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = "img/stop.png"; // Show pause icon
    isPlaying = true;
});

// Previous Song
prevBtn.addEventListener("click", () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = "img/stop.png"; // Show pause icon
    isPlaying = true;
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
});

// Seek in song
progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

// Reset play/pause button when song ends
audio.addEventListener("ended", () => {
    playPauseBtn.src = "img/play.png"; // Reset to play icon
    isPlaying = false;
});


// Create sun elements
function createSunElements() {
    const sunContainer = document.createElement('div');
    sunContainer.id = 'sun-container';
    
    const corona = document.createElement('div');
    corona.id = 'corona';
    
    const glow = document.createElement('div');
    glow.id = 'glow';
    
    const sun = document.createElement('div');
    sun.id = 'sun';
    
    sunContainer.appendChild(glow);
    sunContainer.appendChild(corona);
    sunContainer.appendChild(sun);
    
    const header = document.querySelector('.header');
    header.appendChild(sunContainer);
}

function initSunAnimation() {
    const sun = document.getElementById('sun');
    const glow = document.getElementById('glow');
    const corona = document.getElementById('corona');
    const header = document.querySelector('.header');

    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update positions
        sun.style.left = x + 'px';
        sun.style.top = y + 'px';
        corona.style.left = x + 'px';
        corona.style.top = y + 'px';
        glow.style.left = x + 'px';
        glow.style.top = y + 'px';
    });

    header.addEventListener('mouseleave', () => {
        sun.style.opacity = '0';
        corona.style.opacity = '0';
        glow.style.opacity = '0';
    });

    header.addEventListener('mouseenter', () => {
        sun.style.opacity = '0.9';
        corona.style.opacity = '0.7';
        glow.style.opacity = '1';
    });

    // Enhanced pulsing animation
    function pulseAnimation() {
        let scale = 1;
        let growing = true;
        let coronaScale = 1;

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

document.addEventListener('DOMContentLoaded', () => {
    createSunElements();
    initSunAnimation();
});

