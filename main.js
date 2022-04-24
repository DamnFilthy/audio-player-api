document.addEventListener('DOMContentLoaded', function () {

    let audio = document.getElementById("audio"),
        time = document.querySelector(".time"),
        progress = document.querySelector("#progress"),
        btnPlay = document.querySelector(".play"),
        btnPause = document.querySelector(".pause"),
        btnPrev = document.querySelector(".prev"),
        btnNext = document.querySelector(".next"),
        btnStop = document.querySelector(".stop"),
        blockSongName = document.querySelector('#song-name'),
        blockSongsList = document.querySelector('#songs-list'),
        blockSongDuration = document.querySelector('.song-duration'),
        blockCurrentDuration = document.querySelector('.current-duration'),
        track = 0,
        currentTrack = 0,
        playlist = [
            'Amon-Amarth-gold.mp3',
            'Amon-Amarth-light.mp3',
            'Amon-Amarth-universe.mp3',
            'Amon-Amarth-Shield.mp3',
            'Amon-Amarth-Wrath.mp3'
        ];

    audio.onloadedmetadata = function() {
        blockCurrentDuration.innerText = 0
        blockSongDuration.innerHTML = Number(audio.duration / 60).toFixed(2)
    };

    setSongName(blockSongName, playlist[0].slice(0, -4))
    createSongsList(blockSongsList, playlist)

    btnPlay.addEventListener("click", function() {
        audio.play();
        intervalTrackRunning(audio, time);
    });

    btnPause.addEventListener("click", function() {
        audio.pause();
        intervalTrackRunning(audio, time, true);
    });

    btnStop.addEventListener("click", function() {
        switchTrack (blockSongName, audio, playlist, currentTrack)
    });

    btnPrev.addEventListener("click", function() {
        if (track > 0) {
            track -= 1;
            currentTrack = track
            switchTrack(blockSongName, audio, playlist, track);
        } else {
            track = playlist.length - 1;
            currentTrack = track
            switchTrack(blockSongName, audio, playlist, track);
        }
    });

    btnNext.addEventListener("click", function() {
        if (track < playlist.length - 1) {
            track += 1;
            currentTrack = track
            switchTrack(blockSongName, audio, playlist, track);
        } else {
            track = 0;
            currentTrack = track
            switchTrack(blockSongName, audio, playlist, track);
        }
    });

    progress.addEventListener("click", function (event) {
        let widthLeft = time.offsetLeft,
            x = event.pageX - widthLeft,
            xPersent =  x / this.offsetWidth * 100;
        audio.currentTime = audio.duration * (xPersent / 100);
    })

    let blockSongItem = blockSongsList.querySelectorAll('li');

    blockSongItem.forEach(item => {
        blockSongItem[0].classList.add('active-song')
        item.addEventListener("click", function () {
            let track = this.getAttribute('data-idx')
            currentTrack = track
            switchTrack (blockSongName, audio, playlist, track)

                blockSongItem.forEach(item => {
                    item.classList.remove('active-song')
                })

            this.classList.add('active-song')
        })
    })


    function switchTrack (blockSongName, player, playlist, numOfTrack) {
        player.src = './audio/' + playlist[numOfTrack];
        player.currentTime = 0;
        player.play();
        setSongName(blockSongName, playlist[numOfTrack].slice(0,-4))

        blockSongItem.forEach(item => {
            item.classList.remove('active-song')
        })
        blockSongItem[numOfTrack].classList.add('active-song')
    }

    function intervalTrackRunning(audio, time, pause=false) {

        let audioPlay = setInterval(function() {
            let audioTime = Math.round(audio.currentTime),
                audioLength = Math.round(audio.duration)

            blockCurrentDuration.innerText = (audioTime / 60).toFixed(2)
            time.style.width = (audioTime * 100) / audioLength + '%';
            if (audioTime === audioLength && track < playlist.length - 1) {
                track += 1;
                currentTrack = track
                switchTrack(blockSongName, audio, playlist, track);
            } else if (audioTime === audioLength && track === playlist.length - 1) {
                track = 0;
                currentTrack = track
                switchTrack(blockSongName, audio, playlist, track);
            }
        }, 10)
        if(pause){
            audio.pause();
            clearInterval(audioPlay)
        }
    }

    function setSongName(block, name) {
        block.innerHTML = name
    }

    function createSongsList(blockSongsList, playlist) {
        playlist.forEach( (song, index) => {
            let li = document.createElement('li')
            li.innerText = song
            li.dataset.idx = index
            blockSongsList.append(li)
        })
    }
})


