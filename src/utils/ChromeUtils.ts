export const sendMessage = (request: any, callback: Function): any => {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id as number, request, function (response) {
            console.log("^^^^^^ Response ^^^^^^^^^", response);
            return callback(response.data);
        });
    });
}