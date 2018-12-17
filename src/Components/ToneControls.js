import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: solid 3px SteelBlue;
    display: inline-block;
    margin: 20px;
    border-radius: 10px;
    overflow: hidden;
    float: left;
`;

const RadioInput = styled.input`
    position: absolute;
    visibility: hidden;
    display: none;
`;

const RadioLabel = styled.label`
    color: #332f35;
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 5px 20px;
    & + ${RadioInput} + & {
        border-left: solid 3px LightSteelBlue;
    }
    ${RadioInput}:checked + & {
        padding: 20px;
        color: LightSteelBlue;
        background: SteelBlue;
    }
`;

class ToneControl extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.id = this.props.value + '-radio';
    }
    changeTone(e) {
        this.props.tone(e.target.value);
        console.log(e.target.value);
    }
    render() {
        return (
            <React.Fragment>
                <RadioInput
                    id={this.id}
                    onChange={(t) => this.changeTone(t)}
                    type="radio"
                    name="tone"
                    value={this.props.value}
                />
                <RadioLabel htmlFor={this.id}>{this.props.value}</RadioLabel>
            </React.Fragment>
        );
    }
}

class ToneControls extends React.Component {
    render() {
        return (
            <Wrapper>
                <ToneControl value="sawtooth" tone={(t) => this.props.tone(t)} />
                <ToneControl value="sine" tone={(t) => this.props.tone(t)} />
                <ToneControl value="square" tone={(t) => this.props.tone(t)} />
                <ToneControl value="triangle" tone={(t) => this.props.tone(t)} />
            </Wrapper>
        );
    }
}

export default ToneControls;
