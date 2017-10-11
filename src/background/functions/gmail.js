const gmailFn = (args) => {
    const url = `https://mail.google.com/mail/u/${args}/#inbox`;
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(tab, {url});
    });
};
    
export default gmailFn;
