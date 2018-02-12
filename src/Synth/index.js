import chords from '../util/chords';
const speedConst = 5000;
export default class Synth {
    constructor(num, defaults) {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.synthVoices = [];
        this.defaults = defaults;
        var i = 0;
        for (i; i < num; i++) {
            this.createNewSynthVoice();
        }
    }
    createNewSynthVoice() {
        this.synthVoices.push(new Voice(this.context, this.defaults));
    }

    power(power) {
        console.log("Synth power: ", power);
        this.synthVoices.forEach(synth => {
            synth.run(power);
        });
    }

    changeBaseOctave(oct) {
        this.synthVoices.forEach(synth => {
            synth.changeBaseOctave(oct);
        });
    }
    changeChord(currentChord) {
        const nameSplit = currentChord.split("-");
        const letterName = nameSplit[0].toLowerCase();
        const chordType = nameSplit[1].toLowerCase();
        this.synthVoices.forEach(synth => {
            synth.changeChord(letterName, chordType);
        });
    }
    changeRange(range) {
        this.synthVoices.forEach(synth => {
            synth.changeRange(range);
        });
    }
    changeSpeed(speed) {
        this.synthVoices.forEach(synth => {
            synth.changeSpeed(speed);
        });
    }
    changeTone(t) {
        this.synthVoices.forEach(synth => {
            synth.changeTone(t);
        });
    }
    changeVolume(v) {
        this.synthVoices.forEach(synth => {
            synth.changeVolume(v);
        });
    }
}
    
class Voice {
    constructor(ctx, defaults) {
        this.context = ctx;
        this.chordLetter = 'c';
        this.chordType = 'maj';
        this.power = defaults.power;
        this.range = defaults.range;
        this.speed = defaults.speed;
        this.currentTone = defaults.currentTone;
        this.currentVolume = defaults.currentVolume;
        this.baseOctave = defaults.baseOctave;
    }

    run(power) {
        this.power = power;
        if (this.power) this.arpeggiate();
    }

    arpeggiate() {
        const interval = Math.random() * speedConst * this.speed;
        this.playNote();
        if (this.power) {
            setTimeout(this.arpeggiate.bind(this), interval);
        }
    }

    changeChord(letter, type) {
        this.chordLetter = letter;
        this.chordType = type;
    }

    changeBaseOctave(oct) {
        this.baseOctave = oct;
    }
    changeRange(range) {
        this.range = range;
    }
    changeSpeed(speed) {
        this.speed = speed;
    }
    changeTone(t) {
        this.currentTone = t;
    }
    changeVolume(v) {
        this.currentVolume = v;
    }
    playNote() {
        const i = Math.floor(Math.random() * 3);
        const r = Math.floor(Math.random() * this.range);
        const note = chords.getChord(this.chordLetter, this.chordType)[i];
        const freq = this.mtof(note + (this.baseOctave + r)*12);
        this.synth(freq);
    }

    mtof(midi) {
        return (Math.pow(2, ((midi-69)/12)) * 440);
    }
    synth(freq) {
        let ctx = this.context;
        let vol = this.currentVolume * 0.5;
        let osc = ctx.createOscillator();
        osc.type = this.currentTone;
        osc.frequency.value = freq;

        let gainNode = ctx.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        gainNode.gain.value = 0;
        osc.start();
        gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.1);
        osc.stop(ctx.currentTime + 2.2);
    }
}
