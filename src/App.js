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

const TopSection = styled.div`
    display: grid;
    height: 50vh;
    grid-template-columns: 50% calc(50% - 6rem) 6rem;
    grid-template-rows: 6rem 50%;
    grid-template-areas: "tone-controls other power" "main-controls adsr volume";
`;

const ToneSection = styled.div`width: grid-area: tone-controls`;
const MainControls = styled.div`grid-area: main-controls`;
const OtherSection = styled.div`grid-area: other`;
const ADSRSection = styled.div`grid-area: adsr`;
const PowerSection = styled.div`grid-area: power`;
const VolumeSection = styled.div`grid-area: volume; overflow: hidden;`;
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
            <div>
                <TopSection>
                    <ToneSection>
                        <ToneControls tone={this.setTone} />
                    </ToneSection>
                    <MainControls>
                        <RangeControl range={this.setRange} />
                        <SpeedControl speed={this.setSpeed} />
                        <DensityControl density={this.setDensity} />
                    </MainControls>
                    <ADSRSection />
                    <OtherSection />
                    <PowerSection>
                        <Power
                            handleChange={this.power}
                            style={{backgroundColor: this.state.power ? "green" : "red"}}
                        >
                            Power
                        </Power>
                    </PowerSection>
                    <VolumeSection>
                        <VolumeControl volume={this.setVolume} />
                    </VolumeSection>
                </TopSection>
                <ButtonField
                    changeChord={c => this.setChord(c)}
                    currentChord={this.state.currentChord}
                />
            </div>
        );
    }
}

export default App;
