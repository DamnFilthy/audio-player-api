import AudioPlayer from './MyAudioPlayer.js'

new AudioPlayer('#audio-player', {
    playlist: [
        {trackSrc: '../audio/Amon-Amarth-gold.mp3', trackName: 'Amon-Amarth-gold', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-light.mp3', trackName: 'Amon-Amarth-light', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-universe.mp3', trackName: 'Amon-Amarth-universe', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-Shield.mp3', trackName: 'Amon-Amarth-Shield', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'},
        {trackSrc: '../audio/Amon-Amarth-Wrath.mp3', trackName: 'Amon-Amarth-Wrath', trackImg: 'https://resources.tidal.com/images/4ea9e190/1821/409a/8e6a/e05965b09cd2/750x750.jpg'}
    ],
    songList: true
});

