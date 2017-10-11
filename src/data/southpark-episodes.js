const seasonCount = 21;

const episodesPerSeason = [0, 13, 18, 17, 17, 14, 17, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14, 10, 10, 10, 10, 10];

const unavailableEpisodes = ['s05e04', 's14e05', 's14e06', 's21e04', 's21e05', 's21e06', 's21e07', 's21e08', 's21e09', 's21e10'];

const prependZero = (n) => (n < 10 ? `0${n}` : n);

const getRandomEpisode = (season) => {
    season = season || prependZero(Math.floor(Math.random()*seasonCount)+1);
    let episode = `s${season}e${prependZero(Math.floor(Math.random()*episodesPerSeason[season]))}`;
    while(unavailableEpisodes.includes(episode)) {
        episode = `s${season}e${prependZero(Math.floor(Math.random()*episodesPerSeason[season]))}`;
    }
    return episode;
};

export {getRandomEpisode};
