import { Howl } from "howler";

const sounds = {
    introSound: new Howl({
        src: ['https://cdn.shopify.com/s/files/1/0650/2826/0015/files/intro.mp3?v=1719228646'],
        preload: false,
        volume: 1,
        html5: true,
    }),
    bgSound: new Howl({
        src: ['https://cdn.shopify.com/s/files/1/0650/2826/0015/files/summer.m4a?v=1719228647'],
        loop: true,
        preload: false,
        volume: 0.2,
        html5: true,
    }),
    sound1: new Howl({
        src: ['https://cdn.shopify.com/s/files/1/0650/2826/0015/files/ringing.m4a?v=1719228646'],
        preload: false,
        volume: 1,
        html5: true,
    })
};

class SoundManager {
    constructor(sounds) {
        this.sounds = sounds;
        this.currentSound = null;
        this.bgSoundName = document.querySelector('body').dataset.soundName;
        this.bgSound = sounds[this.bgSoundName];
        this.isMuted = false;
        this.init();
    }

    loadAndPlaySound(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            if (this.currentSound && this.currentSound.playing()) {
                this.currentSound.stop();
            }
            if (sound.state() !== 'loaded') {
                sound.load();
            }
            sound.play();
            this.currentSound = sound;
        }
    }

    playIntroSoundWithBg(soundName, bgSoundName) {
        const sound = this.sounds[soundName];
        const bgSound = this.sounds[bgSoundName];

        if (sound) {
            if (this.currentSound && this.currentSound.playing()) {
                this.currentSound.stop();
            }
            if (sound.state() !== 'loaded') {
                sound.load();
            }
            sound.play();
            this.currentSound = sound;
        }

        if (bgSound) {
            if (bgSound.state() !== 'loaded') {
                bgSound.load();
            }
            bgSound.play();
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        Object.values(this.sounds).forEach(sound => {
            sound.mute(this.isMuted);
        });
    }

    init() {
        this.initIntroSound();
        this.initMuteButton();
        this.addTriggerListeners();
    }

    initIntroSound() {
        const introBtn = document.querySelector('[data-sound-intro]');
        if (introBtn) {
            const soundName = introBtn.dataset.soundName;
            introBtn.addEventListener('click', () => this.playIntroSoundWithBg(soundName, this.bgSoundName));
        }
    }

    initMuteButton() {
        const muteBtn = document.querySelector('[data-sound-mute]');
        if (muteBtn) {
            muteBtn.addEventListener('click', () => this.toggleMute());
        }
    }

    addTriggerListeners() {
        const buttons = document.querySelectorAll('[data-sound-trigger]');
        buttons.forEach(button => {
            const trigger = button.dataset.soundTrigger;
            const soundName = button.dataset.soundName;

            if (trigger === 'click') {
                button.addEventListener('click', () => this.loadAndPlaySound(soundName));
            } else if (trigger === 'hover') {
                button.addEventListener('mouseenter', () => this.loadAndPlaySound(soundName));
            }
        });
    }
}

// Initialize the SoundManager and add listeners
const soundManager = new SoundManager(sounds);
