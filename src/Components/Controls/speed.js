import React from 'react';
import styled from 'styled-components';
import Slider from '../atoms/Slider';

export default class SpeedControl extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { speed: 0.5 };
    }
    changeSpeed(speed) {
        speed = (1 - speed) + 0.001;
        this.props.speed(speed);
    }
    render() {
        return (
            <Slider
                sliderName="Speed"
                value={this.state.speed}
                min={0}
                max={1}
                step={0.01}
                onSlide={s => this.changeSpeed(s)}
            />
        );
    }
}

