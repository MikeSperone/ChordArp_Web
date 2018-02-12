import React from 'react';
import styled from 'styled-components';
import Slider from '../atoms/Slider';

const StyleWrapper = styled.div`
    float: left;
    height: 200px;
    width: 40px;
`;
export default class VolumeControl extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { volume: 0.80 };
    }
    changeVolume(volume) {
        this.props.volume(volume);
    }
    render() {
        return (
            <StyleWrapper>
                <Slider
                    sliderName="Volume"
                    value={this.state.volume}
                    min={0}
                    max={1}
                    step={0.01}
                    onSlide={v => this.changeVolume(v)}
                    vertical
                />
            </StyleWrapper>
        );
    }
}

