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

// Create an audio element
const audio = document.createElement('audio');

// Set the source of the audio file
audio.src = './raw/song.mp3'; 

// Set the audio to loop infinitely
audio.loop = true;

// Append the audio element to the body
document.body.appendChild(audio);

// Set the volume to 50%
audio.volume = 0.5;

// Function to start playing the audio
const startAudio = () => {
  audio.play().catch(error => {
    console.error('Error playing audio:', error);
  });
  document.removeEventListener('click', startAudio); // Remove the event listener after the first interaction
};

// Add an event listener to start the audio on the first user interaction
document.addEventListener('click', startAudio);

// Mute/Unmute functionality
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');

muteButton.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    muteIcon.src = './images/mute.svg'; // Replace with the path to your mute icon
  } else {
    audio.muted = true;
    muteIcon.src = './images/unmute.svg'; // Replace with the path to your unmute icon
  }
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