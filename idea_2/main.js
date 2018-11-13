const player = document.getElementById('player');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const loadingIndicator = document.getElementById('loading-indicator');
const songTitle = document.getElementById('song-title');
const progressBar = document.getElementById('song-progress-bar');

let progress = 0;
let targetProgress = 0;
let isPlaying = false;
let progressBarUpdateHandle;

playButton.addEventListener('click', () => {
  startPlayback();
});

pauseButton.addEventListener('click', () => {
  pausePlayback();
});

player.addEventListener('ended', () => {
  pausePlayback();
  songTitle.classList.add('hidden');
});

player.addEventListener('timeupdate', () => {
  targetProgress = player.currentTime / player.duration;
});

function startPlayback() {
  playButton.classList.add('hidden');
  loadingIndicator.classList.add('hidden');
  pauseButton.classList.remove('hidden');
  player.play();
  isPlaying = true;

  songTitle.classList.remove('hidden');
  //   updateProgressBarWidth();
}

function pausePlayback() {
  loadingIndicator.classList.add('hidden');
  pauseButton.classList.add('hidden');
  playButton.classList.remove('hidden');
  player.pause();
  isPlaying = false;
  //   window.cancelInterval(progressBarUpdateHandle);
}

function togglePlayback() {
  if (isPlaying) {
    pausePlayback();
  } else {
    startPlayback();
  }
}

document.addEventListener('keypress', e => {
  if (e.key === ' ') togglePlayback();
});

function updateProgressBarWidth() {
  function setProgress(percentage) {
    progressBar.style.width = `${percentage * 100}%`;
    progress = percentage;
  }
  const difference = targetProgress - progress;
  if (difference < 0) {
    // Somehow we overshot.
    setProgress(targetProgress);
  } else {
    let increment = 0;
    if (difference > 0.8) {
      increment = 0.1;
    } else if (difference > 0.5) {
      increment = 0.04;
    } else if (difference > 0.2) {
      increment = 0.02;
    } else if (difference > 0.01) {
      increment = 0.005;
    } else if (difference > 0.001) {
      increment = 0.0005;
    }
    // } else if (difference > 0.0001) {
    //   increment = 0.00005;
    // }
    console.log(increment);
    const clamped = Math.max(0, Math.min(progress + increment, 1.0));
    setProgress(clamped);
  }
  setTimeout(updateProgressBarWidth, 5);
}

updateProgressBarWidth();
