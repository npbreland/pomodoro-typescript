/// <reference lib="dom" />
const stages = [
    {
        'name': 'Work 1/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 1/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 2/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 2/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 3/4',
        'duration': 25 * 60
    },
    {
        'name': 'Short Break 3/3',
        'duration': 5 * 60
    },
    {
        'name': 'Work 4/4',
        'duration': 25 * 60
    },
    {
        'name': 'Long Break',
        'duration': 15 * 60
    },
];

let stageIdx = 0;
let timer: Timer;
let timeLeft = stages[stageIdx].duration;

const timeLeftEl = document.getElementById('time-left');
const stageNameEl = document.getElementById('stage-name');
const pauseButton = document.getElementById('pause');
const playButton = document.getElementById('play');

if (!timeLeftEl || !stageNameEl || !pauseButton || !playButton) {
  throw new Error('Missing element');
}

const formatTime = (timeLeft: number) => {
  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
};

const initStageInUI = () => {
  const stage = stages[stageIdx];
  timeLeft = stage.duration;
  timeLeftEl.textContent = formatTime(timeLeft);
  stageNameEl.textContent = stage.name;
};

const play = () => {
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
  timer = setInterval(() => {
    timeLeft--;
    timeLeftEl.textContent = formatTime(timeLeft);
  }, 1000);
};

const pause = () => {
  playButton.style.display = 'block';
  pauseButton.style.display = 'none';
  clearInterval(timer);
};

const advanceStage = () => {
  stageIdx = (stageIdx + 1) % stages.length;
  initStageInUI();
};

const restartStage = () => {
  pause();
  initStageInUI();
};

const restartSession = () => {
  pause();
  stageIdx = 0;
  initStageInUI();
};

document.addEventListener('DOMContentLoaded', function() {
  initStageInUI();
});

document.addEventListener('click', function(e) {
    if (!e.target) {
        return;
    }

    const target = e.target as HTMLElement;

    if (target.id === 'play') {
        play();
    } else if (target.id === 'pause') {
        pause();
    } else if (target.id === 'advance-stage') {
        advanceStage();
    } else if (target.id === 'restart-stage') {
        restartStage();
    } else if (target.id === 'restart-session') {
        restartSession();
    }
});
