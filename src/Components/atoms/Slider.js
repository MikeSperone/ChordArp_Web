import React from 'react';

class Slider extends React.Component {
    constructor(props) {
        super();
        this.state = {
            sliderValue: props.value
        }
    }
    slide(e) {
        const val = e.target.value;
        this.setState({sliderValue: val});
        this.props.onSlide(val);
    }

    render() {
        return (
            <div className="slider">
                <label htmlFor={this.props.sliderName}>{this.props.sliderName}: {this.state.sliderValue}</label>
                <input
                    id={this.props.sliderName}
                    max={this.props.max}
                    min={this.props.min}
                    step={this.props.step}
                    type="range"
                    value={this.state.sliderValue}
                    onChange={this.slide.bind(this)}
                />
            </div>
        );
    }
}

export default Slider;
