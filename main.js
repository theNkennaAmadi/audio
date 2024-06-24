import './style.css'
import {Howl, Howler} from 'howler';

const sound = new Howl({
    src: ['1.wav'],
    loop: true,
    volume: 0.2,
    html5: true,
    preload: false,
});

const sound2 = new Howl({
    src: ['2.wav'],
    preload: false,
    volume: 1,
    html5: true,
});

document.querySelector('#btn-start').addEventListener('click', () => {
    //sound2.playing() ? sound2.stop() : sound2.play();
    if (sound2.state() !== 'loaded') {
        sound2.load();
    }
    sound2.play()
});

document.querySelector('#btn-stop').addEventListener('click', () => {
    sound.stop();
});

document.querySelector('#btn-volume').addEventListener('click', () => {
    sound.volume(0.2);
});

document.querySelector('#btn-mute').addEventListener('click', () => {
    sound.mute(true);
})

document.querySelector('#btn-hover').addEventListener('mouseenter', () => {
    sound2.load();
    sound2.play();
});