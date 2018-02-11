import React, { Component } from 'react';
import ButtonField from './Components/ButtonField';
import TopControls from './Components/TopControls';
import SideControls from './Components/SideControls';
import chords from './util/chords';

const speedConst = 5000;

class App extends Component {
    constructor(props) {
        super();

        this.state = {
            context: new (window.AudioContext || window.webkitAudioContext)(),
            density: 4,
            power: false,
            speed: 0.5,
            range: 1
        };
        this.baseOctave = 5;
        this.currentChord = 'C maj';
        this.currentVolume = 0.8;
        this.currentTone = 'sine';
    }
    changeRange(range) {
        this.setState({range});
    }
    changeSpeed(speed) {
        this.setState({speed});
    }
    changeTone(t) {
        this.currentTone = t;
    }
    changeVolume(v) {
        this.currentVolume = v;
    }
    mtof(midi) {
        return (Math.pow(2, ((midi-69)/12)) * 440);
    }
    arpeggiate(index) {
        const interval = Math.random() * speedConst * this.state.speed;
        this.playNote();
        if (this.state.power && index <= this.state.density) {
            setTimeout(this.arpeggiate.bind(this, index), interval);
        }
    }

    playNote() {
        const nameSplit = this.currentChord.split(" ");
        const letterName = nameSplit[0];
        const chordType = nameSplit[1];

        const i = Math.floor(Math.random() * 3);
        const r = Math.floor(Math.random() * this.state.range);
        const note = chords.getChord(letterName.toLowerCase(), chordType)[i];
        const freq = this.mtof(note + (this.baseOctave + r)*12);
        this.synth(freq);
    }

    synth(freq) {
        let ctx = this.state.context;
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
    setChord(c) {
        this.currentChord = c;
    }
    power(power) {
        this.setState({power}, () => {
            if (power) {
                var i = 0;
                for (i; i<this.state.density; i++) this.arpeggiate(i);
            }
        });
    }

  render() {

    return (
      <div className="App">
        <div className="App-header">
            <TopControls
                range={r => this.setState({range: r})}
                speed={s => this.setState({speed: s})}
                density={d => this.setState({density: d})}
                volume={v => this.changeVolume(v)}
            />
        </div>
        <ButtonField
            currentChord={(c) => this.setChord(c)}
            context={this.context}
        />
        <SideControls
            power={(p) => this.power(p)}
            tone={(t) => this.changeTone(t)}
        />

      </div>
    );
  }
}

export default App;
