import React, { Component } from 'react';
import ButtonField from './Components/ButtonField';
import Power from './Components/atoms/Power';
import {
    DensityControl,
    RangeControl,
    SpeedControl,
    VolumeControl
} from './Components/Controls';
import ToneControls from './Components/ToneControls';
import styled, { injectGlobal } from 'styled-components';

import Synth from './Synth';

injectGlobal`
    :focus {outline: none;}
    body {
        font-family: 'Open Sans', sans-serif;
        margin: 0;
    }
`;
const ControlSection = styled.div`
    height: 50vh;
`;
const MainControls = styled.div`
    float: left;
    width: 50vw;
    min-width: 320px;
    padding: 1rem;
`;
const PowerSection = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    margin: 1rem;
`;
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
            currentChord: this.defaults.currentChord,
            density: this.defaults.density,
            power: this.defaults.power
        };
        this.synth = new Synth(this.state.density, this.defaults);
    }

    componentDidMount() {
        document.getElementById(this.defaults.currentTone + '-radio').checked = true;
    }
    setChord(currentChord) {
        this.setState({ currentChord }, () => this.synth.setChord(this.state.currentChord));
    }

    power() {
        this.setState(
            prevState => {
                return {power: !prevState.power};
            },
            () => this.synth.power(this.state.power)
        );
    }

    render() {
        return (
            <div className="App">
                <ControlSection>
                    <MainControls>
                        <RangeControl range={r => this.synth.setRange(r)} />
                        <SpeedControl speed={s => this.synth.setSpeed(s)} />
                        <DensityControl density={d => this.synth.setDensity(d)} />
                    </MainControls>
                    <ToneControls
                        tone={(t) => this.synth.setTone(t)}
                    />
                    <VolumeControl width='40vh' volume={v => this.synth.setVolume(v)} />
                    <PowerSection>
                        <Power
                            onClick={() => this.power()}
                            style={{backgroundColor: this.state.power ? "green" : "red"}}
                        >
                            Power
                        </Power>
                    </PowerSection>
                </ControlSection>
                <ButtonField
                    changeChord={c => this.setChord(c)}
                    currentChord={this.state.currentChord}
                />

            </div>
        );
    }
}

export default App;
