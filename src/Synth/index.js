import voice from "./Voice.js";
import WebWorker from "../util/webWorker";

export default class Synth {
    constructor(num, defaults) {
        this.context = (typeof window !== "undefined") ?
            new (window.AudioContext || window.webkitAudioContext)() :
            // for testing
            {};
        this.synthVoices = [];
        this.state = {
            chord: {
                letter: 'c',
                type: 'maj'
            },
            power: defaults.power,
            range: defaults.range,
            speed: defaults.speed,
            baseOctave: defaults.baseOctave,
            currentTone: defaults.currentTone,
            currentVolume: defaults.currentVolume
        };
        this.addSynthVoices(num);
        // this.worker = new WebWorker(worker);
        this._bind.call(this);
    }
    
    _bind() {
        this.addSynthVoices = this.addSynthVoices.bind(this);
        this.removeSynthVoices = this.removeSynthVoices.bind(this);
        this.power = this.power.bind(this);
        this.setBaseOctave = this.setBaseOctave.bind(this);
        this.setChord = this.setChord.bind(this);
        this.setDensity = this.setDensity.bind(this);
        this.setRange = this.setRange.bind(this);
        this.setSpeed = this.setSpeed.bind(this);
        this.setTone = this.setTone.bind(this);
        this.setVolume = this.setVolume.bind(this);
    }

    addSynthVoices(num) {
        var i = 0;
        for (i; i < num; i++) {
            // this.synthVoices.push(new Voice(this.context, this.state));
            this.synthVoices.push(new WebWorker(voice));
        }
    }
    removeSynthVoices(num) {
        for (num; num < 0; num++) {
            const last = this.synthVoices.length - 1;
            this.synthVoices[last].run(false);
            this.synthVoices[last] = {};
            this.synthVoices.pop();
        }
    }
    power(power) {
        this.state.power = power;
        this.synthVoices.forEach(synth => {
            synth.run(power);
        });
    }
    setBaseOctave(oct) {
        this.synthVoices.forEach(synth => {
            synth.setBaseOctave(oct);
        });
    }
    setChord(currentChord) {
        const nameSplit = currentChord.split("-");
        this.state.chord.letter = nameSplit[0].toLowerCase();
        this.state.chord.type = nameSplit[1].toLowerCase();
        this.synthVoices.forEach(synth => {
            synth.setChord(this.state.chord.letter, this.state.chord.type);
        });
    }
    setDensity(newDensity) {
        const currentDensity = this.synthVoices.length;
        const voiceDiff = newDensity - currentDensity;
        if (voiceDiff === 0) return;
        if (voiceDiff > 0) {
            this.addSynthVoices(voiceDiff);
        } else {
            this.removeSynthVoices(voiceDiff);
        }
    }
    setRange(range) {
        this.state.range = range;
        this.synthVoices.forEach(synth => synth.setRange(range));
    }
    setSpeed(speed) {
        this.state.speed = speed;
        this.synthVoices.forEach(synth => synth.setSpeed(speed));
    }
    setTone(t) {
        this.state.currentTone = t;
        this.synthVoices.forEach(synth => synth.setTone(t));
    }
    setVolume(v) {
        this.state.currentVolume = v;
        this.synthVoices.forEach(synth => synth.setVolume(v));
    }
}
