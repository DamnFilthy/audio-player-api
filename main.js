class AudioPlayer{
    constructor(element) {
        this.$audio = document.querySelector(element);
        this.$time = document.querySelector(".time");
        this.$progress = document.querySelector("#progress");
        this.$btnPlay = document.querySelector(".play");
        this.$btnPause = document.querySelector(".pause");
        this.$btnPrev = document.querySelector(".prev");
        this.$btnNext = document.querySelector(".next");
        this.$btnStop = document.querySelector(".stop");
        this.$blockSongName = document.querySelector('#song-name');
        this.$blockSongsList = document.querySelector('#songs-list');
        this.$blockSongDuration = document.querySelector('.song-duration');
        this.$blockCurrentDuration = document.querySelector('.current-duration');
        this.$playBtnGroup = document.querySelectorAll('.btn-group');
        this.$btnReplay = document.querySelector(".replay");
        this.$btnVolume = document.querySelector(".sound");
        this.$btnGroupImpulse = document.querySelectorAll('.btn-impulse');
        this.$blockSongName = document.querySelector('#song-name');
        this.$blockSongsList = document.querySelector('#songs-list');
        this.$blockSongDuration = document.querySelector('.song-duration');
        this.$blockCurrentDuration = document.querySelector('.current-duration');
        this.$blockVolume = document.querySelector('.volume');
        this.$blockVolumeLVL = document.querySelector('.volume-lvl');
        this.blockSongItem = null,
        this.interval = null;
        this.track = 0;
        this.defaultVolume = 0.5;
        this.playlist = [
            'Amon-Amarth-gold.mp3',
            'Amon-Amarth-light.mp3',
            'Amon-Amarth-universe.mp3',
            'Amon-Amarth-Shield.mp3',
            'Amon-Amarth-Wrath.mp3'
        ];

        this.setListeners()
        this.initialise()
        this.initialiseSongList()
    }

    initialise(){
        this.createSongsList()
        this.setAudioVolume()
        this.setFirstSong()
    }

    setListeners(){
        this.$blockSongName.innerHTML = this.playlist[0].slice(0, -4)

        this.$audio.onloadedmetadata = () => {
            this.$blockCurrentDuration.innerText = 0
            this.$blockSongDuration.innerHTML = Number(this.$audio.duration / 60).toFixed(2)
        };

        this.$btnPlay.addEventListener("click", () => {
            this.$audio.play();
            this.intervalTrackRunning();
        })

        this.$btnPause.addEventListener("click", () => {
            this.$audio.pause();
        });

        this.$btnStop.addEventListener("click", () => {
            this.switchTrack()
        });

        this.$btnPrev.addEventListener("click", () => {
            if (this.track > 0) {
                this.track -= 1;
                this.switchTrack();
            } else {
                this.track = this.playlist.length - 1;
                this.switchTrack();
            }
        });

        this.$btnNext.addEventListener("click", () => {
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
            this.$blockVolume.classList.toggle('hide')
        })

        this.$btnReplay.addEventListener("click",  () => {
            this.$btnReplay.classList.toggle('impulse-active')
            clearInterval(this.interval)
            this.interval = this.intervalTrackRunning(true);
        })

        this.$playBtnGroup.forEach(btn => {
            btn.addEventListener("click",  () => {
            this.$playBtnGroup.forEach(btn => {btn.classList.remove('playBtnActive')})
                btn.classList.toggle('playBtnActive')
            })
        })

        this.$btnGroupImpulse.forEach(btn => {
            btn.addEventListener("click", () => {
            this.$btnGroupImpulse.forEach(btn => {btn.classList.remove('impulse-active')})
            setTimeout(()=>{
                btn.classList.toggle('impulse-active')
            }, 300)
                btn.classList.toggle('impulse-active')
            })
        })

        this.$progress.addEventListener("click",  (event) => {
            let widthLeft = this.$time.offsetLeft,
                x = event.pageX - widthLeft,
                xPersent =  x / this.$progress.offsetWidth * 100;
            this.$audio.currentTime = this.$audio.duration * (xPersent / 100);
        })

        this.$blockVolume.addEventListener('click',  (event) => {
            let blockWidth = this.$blockVolume.offsetWidth,
                percent = Math.floor((event.offsetX / blockWidth) * 100)
            this.$blockVolumeLVL.style.width = `${percent}%`
            this.$audio.volume = `${percent / 100}`
        })
    }

    intervalTrackRunning(replay = false) {

        return setInterval(() => {
            let audioTime = Math.round(this.$audio.currentTime),
                audioLength = Math.round(this.$audio.duration)

            this.$blockCurrentDuration.innerText = (audioTime / 60).toFixed(2)
            this.$time.style.width = (audioTime * 100) / audioLength + '%';
            if (audioTime === audioLength && this.track < this.playlist.length - 1) {
                if (replay){
                    this.switchTrack();
                } else {
                    this.track += 1;
                    this.currentTrack = this.track
                    this.switchTrack();
                }
            } else if (audioTime === audioLength && this.track === this.playlist.length - 1) {
                if (replay){
                    this.switchTrack();
                } else {
                    this.track = 0;
                    this.currentTrack = this.track
                    this.switchTrack();
                }
            }
        }, 10)
    }

    switchTrack () {
        this.$audio.src = './audio/' + this.playlist[this.track]
        this.$audio.currentTime = 0;
        this.$audio.play();
        this.setSongName(this.playlist[this.track].slice(0,-4))

        this.blockSongItem.forEach(item => {
            item.classList.remove('active-song')
        })
        this.blockSongItem[this.track].classList.add('active-song')
    }

    setSongName(name) {
        this.$blockSongName.innerHTML = name
    }

    setAudioVolume() {
        this.$audio.volume = this.defaultVolume
        this.$blockVolumeLVL.style.width = `${this.defaultVolume * 100}%`
    }

    setFirstSong() {
        this.$audio.src = './audio/' + this.playlist[0];
    }

    createSongsList() {
        this.playlist.forEach( (song, index) => {
            let li = document.createElement('li')
            li.innerText = song
            li.dataset.idx = index
            this.$blockSongsList.append(li)
        })
    }

    initialiseSongList(){
        this.blockSongItem = this.$blockSongsList.querySelectorAll('li');

        this.blockSongItem.forEach(item => {
            this.blockSongItem[0].classList.add('active-song')
            item.addEventListener("click",  () => {
                this.track = Number(item.getAttribute('data-idx'))
                this.switchTrack()

                this.blockSongItem.forEach(item => {
                    item.classList.remove('active-song')
                })

                item.classList.add('active-song')
            })
        })
    }
}

const myAudioPlayer = new AudioPlayer('#audio');
