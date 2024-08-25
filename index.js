/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// index.js
// Array of song URLs
const songs = ['./raw/song3.mp3', './raw/song2.mp3', './raw/song4.mp3', './raw/song.mp3'];
let currentSongIndex = 0;

// Create an audio element
const audio = document.createElement('audio');

// Function to play the next song
const playNextSong = () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  audio.src = songs[currentSongIndex];
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
};

// Set up the audio element
audio.src = songs[currentSongIndex];
audio.volume = 0.5;

// Event listener for when a song ends
audio.addEventListener('ended', playNextSong);

// Append the audio element to the body
document.body.appendChild(audio);

// Function to start playing the audio
const startAudio = () => {
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
  document.removeEventListener('click', startAudio);
};

// Add an event listener to start the audio on the first user interaction
document.addEventListener('click', startAudio);

// Mute/Unmute functionality
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');

muteButton.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
    muteIcon.src = './images/mute.svg';
  } else {
    audio.pause();
    muteIcon.src = './images/unmute.svg';
  }
});
// Media key support
navigator.mediaSession.setActionHandler('play', () => {
  audio.play();
  muteIcon.src = './images/mute.svg';
});

navigator.mediaSession.setActionHandler('pause', () => {
  audio.pause();
  muteIcon.src = './images/unmute.svg';
});

// Modal functionality
const modal = document.getElementById('welcome-modal');
const closeModal = document.getElementById('close-modal');

// Show the modal when the page loads
window.onload = () => {
  modal.style.display = 'block';
};

// Hide the modal when the user clicks the close button
closeModal.onclick = () => {
  modal.style.display = 'none';
};

// Hide the modal when the user clicks anywhere outside of the modal
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};