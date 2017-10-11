import RandomEpisode from '../../data/akkarakazchakal-episodes';

const akFn = (_) => {
    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(tab, {url: `https://www.youtube.com/watch?v=${RandomEpisode()}`});
    });
};
    
export default akFn;
