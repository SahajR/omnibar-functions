import {getRandomEpisode} from "../../data/southpark-episodes";
import prependZero from "../../utils/PrependZero";

// eg: f sp-2 => Loads South park season 2 list
// f sp-2-4 => Plays episode 4 of season 2
// f sp-r => Plays a random available episode
const spFunction = (args) => {

    if(!args) {
        throw 'Bad request!';
    }

    let url = '';

    if(args[0] === 'r') {
        const season = Number(args[1]);
        url = `http://southpark.cc.com/full-episodes/${getRandomEpisode(isNaN(season) ? undefined : prependZero(season))}`;
    } else {
        let [season, episode] = args.map(Number);
        if(isNaN(season) || isNaN(episode)) {
            throw 'Invalid season or episode!';
        }
        if(season < 0 || season > 22) {
            season = 1;
        }
        url = episode ? `http://southpark.cc.com/full-episodes/s${prependZero(season)}e${prependZero(episode)}`
            : `http://southpark.cc.com/full-episodes/season-${season}?sort=!airdate`;
    }

    chrome.tabs.getCurrent((tab) => {
        chrome.tabs.update(tab, {url});
    });
};

export default spFunction;
