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

const AppContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 6em;
    grid-template-rows: 0.5fr 1.5fr 1fr 1fr;
    grid-template-areas: "tone-controls other power-controls" "main-controls adsr power-controls" "buttons buttons buttons" "buttons buttons buttons";
`;

const ToneSection = styled.div`grid-area: tone-controls`;
const MainControls = styled.div`grid-area: main-controls`;
const PowerSection = styled.div`grid-area: power-controls`;
const ButtonSection = styled.div`grid-area: buttons`;
const OtherSection = styled.div`grid-area: other`;
const ADSRSection = styled.div`grid-area: adsr`;
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
        this.power = this.power.bind(this);
        this.setRange = r => this.synth.setRange(r);
        this.setSpeed = s => this.synth.setSpeed(s);
        this.setDensity = d => this.synth.setDensity(d);
        this.setTone = t => this.synth.setTone(t);
        this.setVolume = v => this.synth.setVolume(v);
    }

    componentDidMount() {
        document.getElementById(this.defaults.currentTone + '-radio').checked = true;
    }
    setChord(currentChord) {
        this.setState({ currentChord }, () => this.synth.setChord(this.state.currentChord));
    }

    power() {
        this.setState(
            prevState => ({power: !prevState.power}),
            () => this.synth.power(this.state.power)
        );
    }

    render() {
        return (
            <AppContainer>
                <ToneSection>
                    <ToneControls tone={this.setTone} />
                </ToneSection>
                <MainControls>
                    <RangeControl range={this.setRange} />
                    <SpeedControl speed={this.setSpeed} />
                    <DensityControl density={this.setDensity} />
                </MainControls>
                <PowerSection>
                    <Power
                        handleChange={this.power}
                        style={{backgroundColor: this.state.power ? "green" : "red"}}
                    >
                        Power
                    </Power>
                    <VolumeControl volume={this.setVolume} />
                </PowerSection>
                <ButtonSection>
                    <ButtonField
                        changeChord={c => this.setChord(c)}
                        currentChord={this.state.currentChord}
                    />
                </ButtonSection>
                <ADSRSection />
                <OtherSection />
            </AppContainer>
        );
    }
}

export default App;
