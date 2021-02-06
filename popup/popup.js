document.addEventListener('DOMContentLoaded', function () {
    const x = fetchCurrentState()
    attachButtonCallback();
});

const attachButtonCallback = () => {
    const button = document.getElementById("loopItButton");
    button.addEventListener("click", (event) => {
        event.preventDefault();

        const userInputTimes = fetchInputTimes();

        if(userInputTimes){
            makeRequest("requestOrStop", userInputTimes);
        }else {
            alert("Please input correct time.")
        }
    })
}

const makeRequest = (action, userInputTimes) => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action, ...userInputTimes }, response => {
           updatePopupPage(response)
        });
    });
}

const fetchCurrentState = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "fetchCurrentState"}, response => {
            updatePopupPage(response)
        });
    });
}

const fetchInputTimes = () => {
    const startTime = convertTimeStringToSeconds(document.getElementById("startTime").value);
    const finishTime = convertTimeStringToSeconds(document.getElementById("finishTime").value);

    if(!startTime || !finishTime){
        return null;
    }
    return { startTime, finishTime}
}

const updatePopupPage = (response) => {
    document.getElementById("status").innerText = response.playable.title;

    if(response.inLoop){
        document.getElementById("startTime").value = response.playing.startTime;
        document.getElementById("finishTime").value = response.playing.finishTime;
        document.getElementById("loopItButton").innerText = "stop it!";
        return;
    }
    document.getElementById("startTime").value = "--:--";
    document.getElementById("finishTime").value = "--:--";
    document.getElementById("loopItButton").innerText = "loop it!";
}

const convertTimeStringToSeconds = (timeString) => {
    const splittedTimes = timeString.split(":").map(i => Number(i));

    let seconds = 0;
    for(let i = 0; i < splittedTimes.length; i++){
        seconds = seconds*60 + splittedTimes[i];
    }
    return seconds
}