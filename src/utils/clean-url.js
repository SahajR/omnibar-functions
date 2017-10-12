import blackList from '../data/blacklisted-params';
import whitelist from '../data/whitelisted-sites';

// TODO: Allow user to set this from the popop
const allowWhitelist = false;

const cleanURL = (url) => {
    if (allowWhitelist) {
        for (const value of whitelist) {
            if (url.indexOf(value) > -1) {
                return url;
            }
        }
    }
    const urlArray = url.split('?');
    if(urlArray.length < 2) {
        return url;
    }
    const cleanURL = urlArray[0].split('ref=')[0];
    const params = urlArray[1].split('&');
    const goodParams = params.filter((param) => {
        for(value of blackList) {
            if(param.indexOf(value) > -1) {
                return false;
            }
        }
        return true;
    });

    return [cleanURL, goodParams.join('&')].join('?');
};

export default cleanURL;
