import React from 'react';
import Slider from '../atoms/Slider';

export default class DensityControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {density: 4};
        this.props = props;
    }
    changeDensity(density) {
        this.props.density(Number(density));
    }
    render() {
        return (
            <Slider
                sliderName="Density"
                value={this.state.density}
                min={1}
                max={8}
                step={1}
                onSlide={d => this.changeDensity(d)}
            />
        );
    }
}

