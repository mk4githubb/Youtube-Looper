/*
 * Added variables outside so that they don't need to be selected everytime from the docuement or passed to each method.
 * The values of these will be updated when DOM is loaded.
 */
let startTimeInput;
let finishTimeInput;
let loopItButton;
let errorContainer;
let status;
let videoDuration;
let form;
let errorMessage = null;

document.addEventListener('DOMContentLoaded', function () {
    startTimeInput = document.getElementById("startTime");
    finishTimeInput = document.getElementById("finishTime");
    loopItButton = document.getElementById("loopItButton");
    errorContainer = document.getElementById("errorContainer");
    status = document.getElementById("status");
    form = document.getElementById("mainForm");

    fetchCurrentState()
    attachButtonCallback();
});

// Attaches the right callback to the button.
const attachButtonCallback = () => {
    loopItButton.addEventListener("click", (event) => {
        event.preventDefault();

        const userInputTimes = fetchInputTimes();

        if(userInputTimes){
            makeRequest("requestOrStop", userInputTimes);
            errorMessage = null;
        }
        displayErrorMessage();
    })
}

// This method can make any request to content script.
const makeRequest = (action, userInputTimes) => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action, ...userInputTimes }, response => {
           updatePopupPage(response)
        });
    });
}

// This method makes only fetchCurrentState Request
const fetchCurrentState = () => {
    makeRequest({action: "fetchCurrentState"});
}

// fetches and validates time input by users.
const fetchInputTimes = () => {
    const startTime = convertTimeStringToSeconds(startTimeInput.value);
    const finishTime = convertTimeStringToSeconds(finishTimeInput.value);

    if(!startTime || startTime < 0 || startTime > videoDuration){
        errorMessage = "Please enter a valid start time."
        return null;
    }else if( !finishTime|| finishTime < 0 || finishTime < startTime || finishTime > videoDuration ){
        errorMessage = "Please enter a valid finish time."
        return null;
    }
    return { startTime, finishTime}
}
// converts the time input by user to Integer seconds
const convertTimeStringToSeconds = (timeString) => {
    const splittedTimes = timeString.split(":").map(i => Number(i));

    let seconds = 0;
    for(let i = 0; i < splittedTimes.length; i++){
        seconds = seconds*60 + splittedTimes[i];
    }
    return seconds
}

// converts integer time to string
const convertSecondsToFormattedString = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const remainder = Math.round(seconds % 3600);
    const minutes = Math.floor(remainder / 60);
    seconds = Math.round(remainder % 60);

    let timeString = ""

    if(hours){
        timeString += hours.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":"
    }

    if(minutes){
        timeString += minutes.toLocaleString('en-US', {minimumIntegerDigits: 2}) + ":"
    }
    timeString += seconds.toLocaleString('en-US', {minimumIntegerDigits: 2})
    return timeString;
}

// updates the chrome extensions popup window according.
const updatePopupPage = (response) => {
    if(chrome.runtime.lastError || !response){
        console.log("Error Response: ", response)

        errorMessage = "Please try again after the youtube page has been loaded."
        startTimeInput.disabled = true;
        finishTimeInput.disabled = true;
        loopItButton.disabled = true;
        form.style.opacity= "0";
        displayErrorMessage();
        return;
    }

    errorMessage = null;
    status.style.display='block';
    form.style.opacity = "1";

    status.innerText = response.playable.title;
    videoDuration = response.playable.duration;

    if(response.inLoop){
        startTimeInput.value = convertSecondsToFormattedString(response.playing.startTime);
        finishTimeInput.value = convertSecondsToFormattedString(response.playing.finishTime);
        loopItButton.innerText = "stop it!";
        return;
    }
    startTimeInput.value = "";
    finishTimeInput.value = "";
    loopItButton.innerText = "loop it!";
    displayErrorMessage();
}

const displayErrorMessage = () => {
    if(!errorMessage){
        errorContainer.style.display = 'none';
        return;
    }
    errorContainer.innerText = errorMessage;
    errorContainer.style.display = 'block';
}