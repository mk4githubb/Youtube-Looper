
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        const {action, ...data} = request;
        handleRequest(action, data, sendResponse)
    }
);


