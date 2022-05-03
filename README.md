#Audio-player-api

## Простая библиотека для работы с музыкой на вашем сайте

### Используйте только проигрыватель или все приложение целиком (вместе со списком треков)

![Alt text](Screenshot_1.png?raw=true "Optional Title")

- HTML 
```
<div id="audio-player">
        <div class="audio-player__panel">
            <audio id="audio" preload="metadata"></audio>
            <div class="audio-player__controls" id="controls">
                <div id="song-name">
                    <div class="audio-player__song-author" id="song-author"></div>
                    <div class="audio-player__track-name" id="track-name"></div>
                </div>
                <div class="audio-player__duration-block">
                    <span class="current-duration" id="current-duration"></span> /
                    <span class="song-duration" id="song-duration"></span>
                </div>
                <div class="audio-player__audio-track" id="progress">
                    <div class="audio-player__time-progress" id="progress-time"></div>
                </div>
                <div class="audio-player__btn-wrapper">
                    <div>
                        <button class="audio-player__btn" id="download-track"></button>
                        <button class="audio-player__btn" id="vk-share"></button>
                    </div>
                    <div>
                        <button id="prev" class="audio-player__btn audio-player__prev"></button>
                        <button id="play" class="audio-player__btn audio-player__play"></button>
                        <button id="pause" class="audio-player__btn audio-player__pause hide"></button>
                        <button id="next" class="audio-player__btn audio-player__next"></button>
                    </div>
                    <div>
                        <button id="rerun" class="audio-player__btn audio-player__rerun"></button>
                        <button id="replay" class="audio-player__btn audio-player__replay"></button>
                        <div class="audio-player__sound-controller">
                            <button id="sound" class="audio-player__btn audio-player__sound"></button>
                            <div class="audio-player__sound-area">
                                <div class="audio-player__volume" id="volume">
                                    <div class="audio-player__volume-lvl" id="volume-lvl"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="audio-player__songs-list">
            <div id="songs-list"></div>
        </div>
    </div>
```

- JavaScript
```
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
```

> Передайте на вход селектор основого блока и список ваших треков, для использования без блока со списком треков, 
>передайте флаг songList: false (либо не передавайте ничего, по умолчанию false)

### В библиотеки реализовано: 
- Проигрывание треков (пауза, воспроизведение с начала)
- Бесконечное проигрывание треков из списка (по кругу)
- Переключение по кнопкам или клику на треку из списка 
- Зацикливание трека
- Перемотка трека
- Регулирование/отключение звука на ползунок
- Поделится в соц. сетях (Вконтакте)
- Скачать текущий трек

### Для создание своих кнопок, при создании плеера передайте нужную кнопку и html:
```
new AudioPlayer('#audio-player', {
      btnPlay: `<button> PLAY </button>`,
      btnPause: `<button> PAUSE </button>`
  }); 
```

#### Список доступных кнопок:
- btnShare - поделиться
- btnDownload - скачать трек
- btnPrev - предыдущий трек
- btnPlay - запуск
- btnPause - пауза 
- btnNext - следующий трек
- btnRerun - перезапустить трек
- btnReplay - зацикливание трека
- btnVolume - регулировка звука


### Цель данной библиотеки - реализация функционала для работы с музыкой на сайте:
Вам остается только получить треки через через api и передать их в плеер.
Так же основной html-темплейт не скрыт, для возможности его изменения под ваши нужны. 
