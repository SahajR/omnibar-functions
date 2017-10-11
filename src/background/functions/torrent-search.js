const torrentSearchFn = (args) => {
    const url = `https://torrentz2.eu/searchA?f=${args}`;
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(tab, {url});
    });
};
    
export default torrentSearchFn;
