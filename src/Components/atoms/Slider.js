import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    margin: 40px 0 0 0%;
    width: 100%;
`;

const Label = styled.label`
    display: inline-block;
    width: 75px;
`;
const StyledInput= styled.input`
    -webkit-appearance: none;
    background: silver;
    border-radius: 3px;
    width: 200px;
    outline: none;
    padding: 0;
    margin: 0;
    ${props => props.vertical && `
        transform-origin: 75px 75px;
        transform: rotate(-90deg);
    `}

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: SteelBlue;
        border-radius: 10%;
        border: 1px solid LightSteelBlue;
        height: 20px;
        width: 12px;
    }
`;

class Slider extends React.Component {
    constructor(props) {
        super(props);
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
            <InputWrapper>
                <Label htmlFor={this.props.sliderName}>{this.props.sliderName}: {this.state.sliderValue}</Label>
                <StyledInput
                    id={this.props.sliderName}
                    max={this.props.max}
                    min={this.props.min}
                    step={this.props.step}
                    type="range"
                    value={this.state.sliderValue}
                    onChange={this.slide.bind(this)}
                    vertical={this.props.vertical || false}
                />
            </InputWrapper>
        );
    }
}

export default Slider;
