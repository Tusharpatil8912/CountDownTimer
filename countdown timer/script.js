const timerDisplay = document.getElementById("timerDisplay");
const daysInput = document.getElementById("days");
const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

let countdown;
let remainingTime = 0;

function updateDisplay() {
  const days = Math.floor(remainingTime / 86400);
  const hours = Math.floor((remainingTime % 86400) / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;
  timerDisplay.textContent = `${days.toString().padStart(2, "0")}:${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  countdown = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(countdown);
      updateDisplay();
      startButton.disabled = false;
      stopButton.disabled = true;
      resetButton.disabled = false;
    }
  }, 1000);
}

startButton.addEventListener("click", () => {
  const days = parseInt(daysInput.value, 10) || 0;
  const hours = parseInt(hoursInput.value, 10) || 0;
  const minutes = parseInt(minutesInput.value, 10) || 0;
  const seconds = parseInt(secondsInput.value, 10) || 0;
  
  remainingTime = days * 86400 + hours * 3600 + minutes * 60 + seconds;
  
  if (remainingTime > 0) {
    updateDisplay();
    startTimer();
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
    
    daysInput.disabled = true;
    hoursInput.disabled = true;
    minutesInput.disabled = true;
    secondsInput.disabled = true;
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(countdown);
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  
  daysInput.disabled = false;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(countdown);
  remainingTime = 0;
  updateDisplay();
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
  
  daysInput.disabled = false;
  hoursInput.disabled = false;
  minutesInput.disabled = false;
  secondsInput.disabled = false;
});
