import React from 'react';
import Slider from '../atoms/Slider';

export default class RangeControl extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = { range: 1 };
    }
    changeRange(range) {
        this.props.range(Number(range));
    }
    render() {
        return (
            <Slider
                sliderName="Range"
                value={this.state.range}
                min={1}
                max={5}
                step={1}
                onSlide={r => this.changeRange(r)}
            />
        );
    }
}

