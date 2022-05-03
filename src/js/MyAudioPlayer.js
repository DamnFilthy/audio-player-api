export default  class AudioPlayer{
    constructor(element, params) {
        this.params = params;
        this.allGlobalAudios = document.querySelectorAll('audio');
        this.$audioPlayer = document.querySelector(element);
        this.$audio = this.$audioPlayer.querySelector('#audio');
        this.$time = this.$audioPlayer.querySelector("#progress-time");
        this.$progress = this.$audioPlayer.querySelector("#progress");
        this.$btnDownloadTrack = this.$audioPlayer.querySelector('#download-track');
        this.$btnVKshare = this.$audioPlayer.querySelector('#vk-share');
        this.$btnPlay = this.$audioPlayer.querySelector("#play");
        this.$btnPause = this.$audioPlayer.querySelector("#pause");
        this.$btnPrev = this.$audioPlayer.querySelector("#prev");
        this.$btnNext = this.$audioPlayer.querySelector("#next");
        this.$btnRerun = this.$audioPlayer.querySelector("#rerun");
        this.$btnReplay = this.$audioPlayer.querySelector("#replay");
        this.$btnVolume = this.$audioPlayer.querySelector("#sound");
        this.$blockSongName = this.$audioPlayer.querySelector('#song-name');
        this.$blockAuthorName = this.$blockSongName.querySelector('#song-author');
        this.$blockTrackName = this.$blockSongName.querySelector('#track-name');
        this.$blockSongsList = this.$audioPlayer.querySelector('#songs-list');
        this.$blockSongDuration = this.$audioPlayer.querySelector('.song-duration');
        this.$blockCurrentDuration = this.$audioPlayer.querySelector('#current-duration');
        this.$blockSongDuration = this.$audioPlayer.querySelector('#song-duration');
        this.$blockVolume = this.$audioPlayer.querySelector('#volume');
        this.$blockVolumeLVL = this.$audioPlayer.querySelector('#volume-lvl');
        this.blockSongItem = null;
        this.interval = null;
        this.replay = false;
        this.track = 0;
        this.defaultVolume = 0.5;
        this.audioPLay = false;
        this.playlist = params.playlist;

        this.setListeners()
        this.initialise()
    }

    initialise(){
        this.createBtns()
        if (this.params.songList){
            this.createSongsList()
            this.initialiseSongList()
        }
        this.setAudioVolume()
        this.setFirstSong()
    }

    setListeners(){
        this.$blockAuthorName.innerText = this.playlist[0].artistName
        this.$blockTrackName.innerText = this.playlist[0].trackName

        this.$audio.onloadedmetadata = () => {
            this.$blockCurrentDuration.innerText = 0
            this.$blockSongDuration.innerHTML = Number(this.$audio.duration / 60).toFixed(2)
        };

        this.$btnPlay.addEventListener("click", () => {
            this.allGlobalAudios.forEach(player => {
                player.pause()
            })
            this.$btnPlay.classList.add('hide')
            this.$btnPause.classList.remove('hide')
            this.$audio.play();
            this.intervalTrackRunning();
            this.audioPLay = true;
        })

        this.$btnPause.addEventListener("click", () => {
            this.$btnPlay.classList.remove('hide')
            this.$btnPause.classList.add('hide')
            this.$audio.pause();
            this.audioPLay = false;
        });

        this.$btnRerun.addEventListener("click", () => {
            this.switchTrack()
        });

        this.$btnPrev.addEventListener("click", () => {
            this.$btnPlay.classList.add('hide')
            this.$btnPause.classList.remove('hide')
            if (this.track > 0) {
                this.track -= 1;
                this.switchTrack();
            } else {
                this.track = this.playlist.length - 1;
                this.switchTrack();
            }
        });

        this.$btnNext.addEventListener("click", () => {
            this.$btnPlay.classList.add('hide')
            this.$btnPause.classList.remove('hide')
            if (this.track < this.playlist.length - 1) {
                this.track += 1;
                this.switchTrack();
            } else {
                this.track = 0;
                this.switchTrack();
            }
        });

        this.$btnVolume.addEventListener("click",  () => {
            this.$btnVolume.classList.toggle('impulse-active')
            if (this.$audio.volume === 0){
                this.$audio.volume = this.defaultVolume;
                this.$blockVolumeLVL.style.width = `${this.defaultVolume * 100}%`
            } else {
                this.$audio.volume = 0;
                this.$blockVolumeLVL.style.width = `0%`
            }
        })

        this.$btnReplay.addEventListener("click",  () => {
            this.$btnReplay.classList.toggle('audio-player__btn-active')
            clearInterval(this.interval)
            this.replay = !this.replay
            this.interval = this.intervalTrackRunning();
        })

        this.$progress.addEventListener("click",  (event) => {
            let widthLeft = this.$time.offsetLeft,
                x = event.pageX - widthLeft,
                xPersent =  x / this.$progress.offsetWidth * 100;
            this.$audio.currentTime = this.$audio.duration * (xPersent / 100);

            if (!this.audioPLay){
                this.allGlobalAudios.forEach(player => {
                    player.pause()
                })
                this.$btnPlay.classList.add('hide')
                this.$btnPause.classList.remove('hide')
                this.$audio.play();
                this.intervalTrackRunning();
            }
        })

        this.$blockVolume.addEventListener('click',  (event) => {
            let blockWidth = this.$blockVolume.offsetWidth,
                percent = Math.floor((event.offsetX / blockWidth) * 100)
            this.$blockVolumeLVL.style.width = `${percent}%`
            this.$audio.volume = `${percent / 100}`
        })

        this.$btnDownloadTrack.addEventListener("click", () => {
            this.downloadTrack()
        })

        this.$btnVKshare.addEventListener("click", () => {
            this.VKshare()
        })
    }

    intervalTrackRunning() {

        return setInterval(() => {
            let audioTime = Math.round(this.$audio.currentTime),
                audioLength = Math.round(this.$audio.duration)

            this.$blockCurrentDuration.innerText = (audioTime / 60).toFixed(2)
            this.$time.style.width = (audioTime * 100) / audioLength + '%';
            if (audioTime === audioLength && this.track < this.playlist.length - 1) {
                if (this.replay){
                    this.switchTrack();
                } else {
                    this.track += 1;
                    this.switchTrack();
                }
            } else if (audioTime === audioLength && this.track === this.playlist.length - 1) {
                if (this.replay){
                    this.switchTrack();
                } else {
                    this.track = 0;
                    this.switchTrack();
                }
            }
        }, 10)
    }

    switchTrack () {
        this.audioPLay = true
        this.$audio.src = this.playlist[this.track].trackSrc
        this.$audio.currentTime = 0;
        this.$audio.play();
        this.setSongName(this.playlist[this.track].trackName)

        if (this.params.songList) {
            this.blockSongItem.forEach(item => {
                item.classList.remove('active-song')
            })
            this.blockSongItem[this.track].classList.add('active-song')
        }
    }

    setSongName(name) {
        this.$blockAuthorName.innerText = this.playlist[this.track].artistName
        this.$blockTrackName.innerText = this.playlist[this.track].trackName
    }

    setAudioVolume() {
        this.$audio.volume = this.defaultVolume
        this.$blockVolumeLVL.style.width = `${this.defaultVolume * 100}%`
    }

    setFirstSong() {
        this.$audio.src = this.playlist[0].trackSrc;
    }

    createBtns(){
        this.params.btnShare ? this.$btnVKshare.innerHTML = this.params.btnShare : this.$btnVKshare.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6875 9.09375H9.9375V11.1562H2.0625V9.09375H1.3125V11.9062H10.6875V9.09375Z" fill="black"/>
                                <path d="M6.375 9.09376V2.22189L8.7375 4.58439L9.27187 4.05001L6 0.778137L2.72812 4.05001L3.26249 4.58439L5.62499 2.22189V9.09376H6.375Z" fill="black"/>
                            </svg>
        `
        this.params.btnDownload ? this.$btnDownloadTrack.innerHTML = this.params.btnDownload : this.$btnDownloadTrack.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.6875 9.09375H9.9375V11.1562H2.0625V9.09375H1.3125V11.9062H10.6875V9.09375Z" fill="black"/>
                                <path d="M5.62499 0.09375V6.98438L3.26249 4.6125L2.72812 5.14688L6 8.41875L9.27187 5.14688L8.7375 4.6125L6.375 6.98438V0.09375H5.62499Z" fill="black"/>
                            </svg>
        `
        this.params.btnPrev ?  this.$btnPrev.innerHTML = this.params.btnPrev : this.$btnPrev.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4.50937 2.72813L1.2375 6L4.50937 9.27188L5.04375 8.73751L2.67187 6.37501L8.625 6.37501V5.625L2.67187 5.625L5.04375 3.2625L4.50937 2.72813Z" fill="black"/>
                                <path d="M9.75 6.375H10.5V5.625H9.75V6.375Z" fill="black"/>
                            </svg>
        `
        this.params.btnPlay ? this.$btnPlay.innerHTML = this.params.btnPlay :  this.$btnPlay.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_2_51)">
                                    <path d="M4 2.5V9.5L9.5 6L4 2.5Z" fill="black"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_51">
                                        <rect width="12" height="12" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
        `
        this.params.btnPause ? this.$btnPause.innerHTML = this.params.btnPause : this.$btnPause.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 3.5H4V9H5V3.5Z" fill="#464646"/>
                                <path d="M8 3.5H7V9H8V3.5Z" fill="#464646"/>
                            </svg>
        `
        this.params.btnNext ? this.$btnNext.innerHTML = this.params.btnNext :  this.$btnNext.innerHTML = `
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.49063 9.27187L10.7625 6L7.49063 2.72812L6.95625 3.26249L9.32813 5.62499H3.375V6.375H9.32813L6.95625 8.7375L7.49063 9.27187Z" fill="black"/>
                                <path d="M2.25 5.625H1.5V6.375H2.25V5.625Z" fill="black"/>
                            </svg>
        `
        this.params.btnRerun ? this.$btnRerun.innerHTML = this.params.btnRerun : this.$btnRerun.innerHTML = `
                            <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h48v48H0z" fill="none"/><path d="M12 12h24v24H12z"/></svg>
        `
        this.params.btnReplay ? this.$btnReplay.innerHTML = this.params.btnReplay : this.$btnReplay.innerHTML = `
                             <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 2.5V0.5L3.5 3L6 5.5V3.5C7.6575 3.5 9 4.8425 9 6.5C9 8.1575 7.6575 9.5 6 9.5C4.3425 9.5 3 8.1575 3 6.5H2C2 8.71 3.79 10.5 6 10.5C8.21 10.5 10 8.71 10 6.5C10 4.29 8.21 2.5 6 2.5Z" fill="black"/>
                            </svg>
        `
        this.params.btnVolume ? this.$btnVolume.innerHTML = this.params.btnVolume : this.$btnVolume.innerHTML = `
                            <svg height="48" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg"><path d="M6 18v12h8l10 10V8L14 18H6zm27 6c0-3.53-2.04-6.58-5-8.05v16.11c2.96-1.48 5-4.53 5-8.06zM28 6.46v4.13c5.78 1.72 10 7.07 10 13.41s-4.22 11.69-10 13.41v4.13c8.01-1.82 14-8.97 14-17.54S36.01 8.28 28 6.46z"/><path d="M0 0h48v48H0z" fill="none"/></svg>
        `
    }

    createSongsList() {
        this.playlist.forEach( (song, index) => {
            let divBlockName = document.createElement('div')
            let divArtistName = document.createElement('div')
            let divTrackName = document.createElement('div')
            let div = document.createElement('div')
            let img = document.createElement('img')
            div.classList.add('track-item')
            img.classList.add('track-img')
            divArtistName.classList.add('artist-name')
            divTrackName.classList.add('track-name')
            divArtistName.innerText = song.artistName
            divTrackName.innerText = song.trackName
            divBlockName.append(divArtistName)
            divBlockName.append(divTrackName)

            img.src = song.trackImg
            div.append(img)
            div.append(divBlockName)
            div.dataset.idx = index
            this.$blockSongsList.append(div)
        })
    }
    initialiseSongList(){
        this.blockSongItem = this.$blockSongsList.querySelectorAll('.track-item');

        this.blockSongItem.forEach(item => {
            this.blockSongItem[0].classList.add('active-song')
            item.addEventListener("click",  () => {
                this.$btnPlay.classList.add('hide')
                this.$btnPause.classList.remove('hide')
                this.track = Number(item.getAttribute('data-idx'))
                this.switchTrack()
                this.intervalTrackRunning();
                this.blockSongItem.forEach(item => {
                    item.classList.remove('active-song')
                })

                item.classList.add('active-song')
            })
        })
    }

    downloadTrack(){
        const a = document.createElement('a')
        a.href = this.playlist[this.track].trackSrc
        a.download;
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
    VKshare(){
        const a = document.createElement('a')
        const vkURL = 'http://vkontakte.ru/share.php?url='
        a.href = vkURL + this.playlist[this.track].trackSrc
        a.target = '_blank'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
    }
}
