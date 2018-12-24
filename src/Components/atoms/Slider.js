import React from 'react';
import styled from 'styled-components';

const SLIDER_WIDTH = '200px';
const InputWrapper = styled.div`
    padding: 0;
    padding-bottom: 1rem;
    width: 100%;
`;

const Label = styled.label`
    display: inline-block;
    padding: 1rem;
    padding-left: 0;
    width: 6rem;
    vertical-align: bottom;
    ${props => props.vertical && `
        width: auto;
        padding: .5rem;
        position: relative;
    `}
`;
const Name = styled.span`
    display: inline-block;
    width: 80%;
`;
const Value = styled.span`
    display: inline-block;
    width: 20%;
    @media (max-width: 920px) {
        display: none;
        width: auto;
    }
`;
const StyledInput = styled.input`
    -webkit-appearance: none;
    background: silver;
    border-radius: 3px;
    width: calc(99% - 8rem);
    height: 0.1rem;
    border: 1px solid black;
    box-shadow: inset 1px 1px 1px grey;
    padding: 0 .25rem;
    margin: 0;
    ${props => props.vertical && `
        width: ${props.width || '100%'};
        transform-origin: top right;
        transform: rotate(-90deg) translateY(-${props.width});
    `}
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        background: SteelBlue;
        border-radius: 10%;
        box-shadow: inset 1px 1px 1px LightSteelBlue;
        cursor: pointer;
        outline: 1px solid black;
        height: 40px;
        width: 12px;
    }
    @media (max-width: 920px) {
        width: auto;
    }
`;

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.slide = this.slide.bind(this);
        this.state = {
            sliderValue: props.value
        }
    }
    slide(e) {
        const val = e.target.value;
        this.setState(() => ({sliderValue: val}));
        this.props.onSlide(val);
    }

    render() {
        return (
            <InputWrapper>
                {this.props.hideLabel ? null : (
                    <Label htmlFor={this.props.sliderName}>
                        <Name>{this.props.sliderName}</Name>
                        {this.props.vertical ? null : (
                            <Value>{this.state.sliderValue}</Value>
                        )}
                    </Label>
                )}
                <StyledInput
                    id={this.props.sliderName}
                    max={this.props.max}
                    min={this.props.min}
                    step={this.props.step}
                    type="range"
                    value={this.state.sliderValue}
                    onChange={this.slide}
                    vertical={this.props.vertical || false}
                    width={this.props.width}
                />
            </InputWrapper>
        );
    }
}

export default Slider;
