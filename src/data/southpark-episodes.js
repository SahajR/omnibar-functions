import prependZero from "../utils/PrependZero";

const seasonCount = 21;

const episodesPerSeason = [0, 13, 18, 17, 17, 14, 17, 15, 14, 14, 14, 14, 14, 14, 14, 14, 14, 10, 10, 10, 10, 10];

const unavailableEpisodes = ['s05e04', 's14e05', 's14e06', 's21e04', 's21e05', 's21e06', 's21e07', 's21e08', 's21e09', 's21e10'];

const getRandomEpisode = (season = prependZero(Math.floor(Math.random()*seasonCount)+1)) => {
    const seasonNumber = Number(season);
    let episode = `s${season}e${prependZero(1+Math.floor(Math.random()*episodesPerSeason[seasonNumber]))}`;
    while(unavailableEpisodes.includes(episode)) {
        episode = `s${season}e${prependZero(1+Math.floor(Math.random()*episodesPerSeason[seasonNumber]))}`;
    }
    return episode;
};

export {getRandomEpisode};
