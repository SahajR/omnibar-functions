import cleanURL from "../utils/CleanURL";

const getCurrentTabUrl = (callback) => {
    const queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      const tab = tabs[0];
      const url = tab.url;
      console.assert(typeof url === 'string', 'tab.url should be a string');
  
      callback(url);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('overlay');
    const shortenButton = document.getElementById('shorten-button');
    const shortenResult = document.getElementById('shorten-result');
    const shortenCopy = document.getElementById('shorten-copy');
    shortenResult.style.display = 'none';
    shortenCopy.style.display = 'none';
    overlay.style.display = 'none';

    shortenButton.addEventListener('click', () => {
        getCurrentTabUrl((to) => {
            try {
                const url = `https://sahajr.xyz/shorten/?url=${cleanURL(to)}`;
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
});