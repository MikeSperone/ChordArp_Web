import React from 'react';
import Slider from './atoms/Slider';

class TopControls extends React.Component {

    constructor(props) {
        super();
        this.state = {
            base: 3,
            range: 1,
            density: 4,
            speed: 0.5,
            volume: 0.80
        };
        this.volume = props.currentVolume;
    }

    getChordName(e) {
        this.currentChord(e.target.id);
    }
    changeRange(range) {
        this.props.range(Number(range));
        console.log("changing Range");
    }
    changeSpeed(speed) {
        speed = (1 - speed) + 0.001;
        this.props.speed(speed);
        console.log("changing speed");
    }

    changeVolume(volume) {
        this.props.volume(volume);
    }
    changeDensity(density) {
        this.props.density(Number(density));
    }
    change(e) {
        console.log(e.target);
    }

  render() {
    return (
      <div className="top-controls">
        <h1>Chord Arp</h1>
        <Slider
                sliderName="Volume"
                value={this.state.volume}
                min={0}
                max={1}
                step={0.01}
                onSlide={(v) => this.changeVolume(v)}
        />
        <Slider sliderName="Speed"
                value={this.state.speed}
                min={0}
                max={1}
                step={0.01}
                onSlide={(s) => this.changeSpeed(s)}
        />
                <Slider sliderName="Range"
                    value={this.state.range}
                    min={1}
                    max={5}
                    step={1}
                    onSlide={(r) => this.changeRange(r)}
                />
                <Slider sliderName="Density"
                    value={this.state.density}
                    min={1}
                    max={8}
                    step={1}
                    onSlide={(r) => this.changeDensity(r)}
                />
            </div>
        );
    }
}

export default TopControls;
