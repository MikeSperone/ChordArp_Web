import React from 'react';
import styled from 'styled-components';

const SLIDER_WIDTH = '200px';
const InputWrapper = styled.div`
    padding: 1rem;
    width: 100%;
`;

const Label = styled.label`
    display: inline-block;
    width: 120px;
    padding: 1rem;
    ${props => props.vertical && `
        position: relative;
        top: ${SLIDER_WIDTH};
        left: -20px;
    `}
`;
const Name = styled.span`
    display: inline-block;
    width: 80%;
`;
const Value = styled.span`
    display: inline-block;
    width: 20%;
`;
const StyledInput= styled.input`
    -webkit-appearance: none;
    background: silver;
    border-radius: 3px;
    width: ${SLIDER_WIDTH};
    border: 1px solid black;
    padding: .25rem .5rem;
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
        height: 40px;
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
                <Label htmlFor={this.props.sliderName} {...this.props} >
                    <Name>{this.props.sliderName}</Name>
                    {this.props.vertical ? null : (
                        <Value>{this.state.sliderValue}</Value>
                    )}
                </Label>
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
