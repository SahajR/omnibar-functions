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

const shortenURL = (_url, done) => {
    const url = `https://sahajr.xyz/shorten/?url=${cleanURL(_url)}`;
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            const response = JSON.parse(request.responseText);
            done(response.shortURL);
        }
    };
    request.send();
};

document.addEventListener('DOMContentLoaded', () => {

    const overlay = document.getElementById('overlay');
    const shortenButton = document.getElementById('shorten-button');
    const shortenResult = document.getElementById('shorten-result');
    const shortenCopy = document.getElementById('shorten-copy');
    const generateQR = document.getElementById('generate-qr');
    const goToExtensions = document.getElementById("shortcut-extensions");
    const shortenAndQR = document.getElementById("generate-qr-short-url");

    shortenResult.style.display = 'none';
    shortenCopy.style.display = 'none';
    overlay.style.display = 'none';

    shortenButton.addEventListener('click', () => {
        getCurrentTab((tab) => {
            try {
                overlay.style.display = 'block';
                shortenURL(tab.url, (shortURL) => {
                    shortenResult.style.display = 'block';
                    shortenResult.focus();
                    shortenResult.value = shortURL;
                    shortenResult.select();
                    overlay.style.display = 'none';
                    shortenCopy.style.display = 'block';
                });
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
                window.close();
            });
        } catch (err) {
            window.alert(err);
        }
    });

    goToExtensions.addEventListener('click', () => {
        chrome.tabs.create({url: "chrome://extensions"});
    });

    shortenAndQR.addEventListener('click', () => {
        getCurrentTab((tab) => {
            try {
                overlay.style.display = 'block';
                shortenURL(tab.url, (shortURL) => {
                    overlay.style.display = 'none';
                    chrome.tabs.sendMessage(tab.id, {text: shortURL});
                    window.close();
                });
            } catch (err) {
                window.alert(err);
            }
        });
    });

});