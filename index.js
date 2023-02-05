
const mainHeader = document.querySelector("#main-header"),
      description = document.querySelector("#description"),
      countdownContainer = document.querySelector("#countdown-container"),
      cancelContainer = document.querySelector("#cancel-container"),
      cancelButton = document.querySelector("#cancel-button"),
      videoContainer = document.querySelector("#video-container"),
      selectionContainer = document.querySelector("#selection-container"),
      instruction = document.querySelector("#instruction"),
      timeButtonsContainer = document.querySelector("#time-buttons-container"),
      takeBreak = document.querySelector(".take-break")


selectionContainer.addEventListener("click", renderCountdown);


function renderCountdown(evt) {
  

  if (evt.target.classList.contains("set-time")) {
    videoContainer.innerHTML = "";

    hideElements(description, selectionContainer, videoContainer);
    unhideElements(countdownContainer, cancelContainer);

    const minutesChosen = parseFloat(evt.target.id);

    startCountdown(minutesChosen);
  }
}


function hideElements(...elems) {

  elems.forEach((elem) => (elem.hidden = true));
}

function unhideElements(...elems) {
  elems.forEach((elem) => (elem.hidden = false));
}

function startCountdown(minutesChosen) {

  let totalTimeInSeconds = minutesChosen * 60;

  let setCountDownInterval = setInterval(function () {
    let displaySeconds = totalTimeInSeconds % 60;
    let displayMinutes = Math.floor(totalTimeInSeconds / 60);

    displaySeconds =
      displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;

    
    countdownContainer.innerHTML = `${displayMinutes} : ${displaySeconds}`;
    

    totalTimeInSeconds--;

    if (totalTimeInSeconds < 0) {
      clearInterval(setCountDownInterval);
      renderVideo();
    }

    
    cancelButton.addEventListener("click", (evt) => {
      clearInterval(setCountDownInterval);
      renderBackToStart();
    });
  }, 1000);
}

function renderBackToStart() {
 
  hideElements(countdownContainer, cancelContainer, videoContainer, takeBreak);

 
  unhideElements(description, selectionContainer, timeButtonsContainer);
}

function renderVideo() {
  hideElements(countdownContainer, cancelContainer);
  unhideElements(videoContainer, selectionContainer, takeBreak);


  const songURLs = [
    "https://www.youtube.com/embed/lkJaKaRvB7w?rel=0&start=4&autoplay=1",
    "https://www.youtube.com/embed/2gQZ-F9IrSk?rel=0&start=1&autoplay=1",
    "https://www.youtube.com/embed/iJFseWl8AlE?rel=0&start=1&autoplay=1",
    "https://www.youtube.com/embed/2iidlwQ-NfU?rel=0&start=18&autoplay=1",
  ];

  const randomIdx = Math.floor(Math.random() * songURLs.length);

  videoContainer.innerHTML = `
    <iframe width="560" height="315" src=${songURLs[randomIdx]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
}