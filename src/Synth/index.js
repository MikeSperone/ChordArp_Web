import voice from "./Voice.js";
import WebWorker from "../util/webWorker";

export default class Synth {
    constructor(num, defaults) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.synthVoices = [];
        this.current = {
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
        this.worker = new WebWorker(worker);
    }
    addSynthVoices(num) {
        var i = 0;
        for (i; i < num; i++) {
            // this.synthVoices.push(new Voice(this.context, this.current));
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
        this.current.power = power;
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
        this.current.chord.letter = nameSplit[0].toLowerCase();
        this.current.chord.type = nameSplit[1].toLowerCase();
        this.synthVoices.forEach(synth => {
            synth.setChord(this.current.chord.letter, this.current.chord.type);
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
        this.current.range = range;
        this.synthVoices.forEach(synth => synth.setRange(range));
    }
    setSpeed(speed) {
        this.current.speed = speed;
        this.synthVoices.forEach(synth => synth.setSpeed(speed));
    }
    setTone(t) {
        this.current.currentTone = t;
        this.synthVoices.forEach(synth => synth.setTone(t));
    }
    setVolume(v) {
        this.current.currentVolume = v;
        this.synthVoices.forEach(synth => synth.setVolume(v));
    }
}
