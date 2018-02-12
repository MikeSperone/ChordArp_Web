import React, { Component } from 'react';
import ButtonField from './Components/ButtonField';
import TopControls from './Components/TopControls';
import SideControls from './Components/SideControls';

import Synth from './Synth';


class App extends Component {
    constructor(props) {
        super();
        this.defaults = {
            baseOctave: 5,
            currentChord: 'C-maj',
            currentTone: 'sine',
            currentVolume: 0.8,
            density: 4,
            power: false,
            speed: 0.5,
            range: 1

        };
        this.state = {
            density: this.defaults.density,
            currentChord: this.defaults.currentChord
        };
        this.synth = new Synth(this.state.density, this.defaults);
    }

    setChord(currentChord) {
        this.setState({ currentChord }, () => this.synth.changeChord(this.state.currentChord));
    }

    power(power) {
        console.log("App power: ", power);
        this.setState({power}, () => this.synth.power(this.state.power));
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <TopControls
                        range={r => this.synth.changeRange(r)}
                        speed={s => this.synth.changeSpeed(s)}
                        density={d => this.synth.changeDensity(d)}
                        volume={v => this.synth.changeVolume(v)}
                    />
                </div>
                <ButtonField
                    changeChord={c => this.setChord(c)}
                    currentChord={this.state.currentChord}
                />
                <SideControls
                    power={this.power.bind(this)}
                    tone={(t) => this.synth.changeTone(t)}
                />

            </div>
        );
    }
}

export default App;
