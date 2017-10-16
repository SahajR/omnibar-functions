import cleanURL from "../utils/clean-url";

const getCurrentTab = (callback) => {
    const queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      callback(tabs[0]);
    });
};

document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.getElementById('overlay');
    const shortenButton = document.getElementById('shorten-button');
    const shortenResult = document.getElementById('shorten-result');
    const shortenCopy = document.getElementById('shorten-copy');
    const generateQR = document.getElementById('generate-qr');
    const goToExtensions = document.getElementById("shortcut-extensions");

    shortenResult.style.display = 'none';
    shortenCopy.style.display = 'none';
    overlay.style.display = 'none';

    shortenButton.addEventListener('click', () => {
        getCurrentTab((tab) => {
            try {
                const url = `https://sahajr.xyz/shorten/?url=${cleanURL(tab.url)}`;
                const request = new XMLHttpRequest();
                overlay.style.display = 'block';
                request.open("GET", url, true);
                request.onreadystatechange = () => {
                    if (request.readyState === 4) {
                        const response = JSON.parse(request.responseText);
                        shortenResult.style.display = 'block';
                        shortenResult.focus();
                        shortenResult.value = response.shortURL;
                        shortenResult.select();
                        overlay.style.display = 'none';
                        shortenCopy.style.display = 'block';
                    }
                };
                request.send();
            } catch (err) {
                window.alert(err);
            }
        });
    });

    shortenCopy.addEventListener('click', () => {
       try {
           if(document.execCommand('copy')) {
               shortenCopy.style.display = 'none';
               shortenResult.style.display = 'none';
           }
       } catch (err) {
           window.alert(err);
       }
    });

    generateQR.addEventListener('click', () => {
        try {
            getCurrentTab((tab) => {
                chrome.tabs.sendMessage(tab.id, {text: tab.url});
            });
        } catch (err) {
            window.alert(err);
        }
    });

    goToExtensions.addEventListener('click', () => {
        getCurrentTab((tab) => {
            chrome.tabs.update(tab.id, {url: "chrome://extensions"});
        });
    });

});