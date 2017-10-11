import akFn from './functions/akkarakazhchakal.js';
import gmailFn from './functions/gmail.js';
import torrentSearchFn from './functions/torrent-search.js';
import spFunction from './functions/south-park.js';
import cleanURL from "../utils/CleanURL";

const getFunction = {
    'sp': spFunction,
	'ak': akFn,
    'gm': gmailFn,
    'tr': torrentSearchFn,
};

chrome.omnibox.onInputEntered.addListener(
    (text) => {
      const args = text.toLowerCase().split('-');
      try {
        const type = args[0];
        const func = getFunction[type];
        if(func) {
            args.shift();
            func(args);
        } else {
            window.alert('I don\'t know what you mean!');
        }
    } catch (error) {
        window.alert(error);
    }
});

chrome.webRequest.onBeforeRequest.addListener((request) => {
        const redirectUrl = cleanURL(request.url);
        return {redirectUrl};
    },
    {urls: ["<all_urls>"]},
    ["blocking", "responseHeaders"]
);