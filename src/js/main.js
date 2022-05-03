import AudioPlayer from './MyAudioPlayer.js'

new AudioPlayer('#audio-player', {
    playlist: [
        {trackSrc: '../audio/Amon-Amarth-gold.mp3', artistName: 'Amon-Amarth', trackName: 'Fafner`s gold', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-light.mp3', artistName: 'Amon-Amarth', trackName: 'At Dawn`s First Light', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-universe.mp3', artistName: 'Amon-Amarth', trackName: 'Destroyer of the Universe', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-Shield.mp3', artistName: 'Amon-Amarth', trackName: 'Shield Wall', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-Wrath.mp3', artistName: 'Amon-Amarth', trackName: 'Wrath of the Norsemen', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'}
    ],
    songList: true
});

