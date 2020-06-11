import chords from '../util/chords';
const speedConst = 5000;

export default (c, d) => {
    var voice = new Voice(c, d);
    this.addEventListener("message", e => {
        switch (e.thing) {
            case "run":
                voice.run(e.value);
                break;
            case "arpeggiate":
                voice.arpeggiate();
                break;
            case "setChord":
                break;
        }
    });
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
            setTimeout(() => {
                requestAnimationFrame(this.arpeggiate.bind(this));
            }, interval);
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
