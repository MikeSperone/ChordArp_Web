import chords from '../util/chords';
const speedConst = 5000;

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
    }
    addSynthVoices(num) {
        var i = 0;
        for (i; i < num; i++) {
            this.synthVoices.push(new Voice(this.context, this.current));
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
        this.synthVoices.forEach(synth => {
            synth.setRange(range);
        });
    }
    setSpeed(speed) {
        this.current.speed = speed;
        this.synthVoices.forEach(synth => {
            synth.setSpeed(speed);
        });
    }
    setTone(t) {
        this.current.currentTone = v;
        this.synthVoices.forEach(synth => {
            synth.setTone(t);
        });
    }
    setVolume(v) {
        this.current.currentVolume = v;
        this.synthVoices.forEach(synth => {
            synth.setVolume(v);
        });
    }
}
    
class Voice {
    constructor(ctx, defaults) {
        this.context = ctx;
        this.chordLetter = defaults.chord.letter;
        this.chordType = defaults.chord.type;
        this.power = defaults.power;
        this.range = defaults.range;
        this.speed = defaults.speed;
        this.tone = defaults.currentTone;
        this.volume = defaults.currentVolume;
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

    setChord(letter, type) {
        this.chordLetter = letter;
        this.chordType = type;
    }

    setBaseOctave(oct) {
        this.baseOctave = oct;
    }
    setRange(range) {
        this.range = range;
    }
    setSpeed(speed) {
        this.speed = speed;
    }
    setTone(t) {
        this.tone = t;
    }
    setVolume(v) {
        this.volume = v;
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
        let vol = this.volume * 0.5;
        let osc = ctx.createOscillator();
        osc.type = this.tone;
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
