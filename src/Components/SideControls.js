import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    float: right;
    padding: 1rem;
`;
const Power = styled.button`
    height: 80px;
    width: 80px;
`;

class ToneControl extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    changeTone(e) {
        this.props.tone(e.target.value);
        console.log(e.target.value);
    }

    render() {
        return (
            <p>
                <input
                    onChange={(t) => this.changeTone(t)}
                    type="radio"
                    name="tone"
                    value={this.props.value}
                />
                {this.props.value}
            </p>
        );
    }
}

class SideControls extends React.Component {

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {power: false};
    }

    powerSwitch() {
        console.log("power switch");
        this.setState((prevState, props) => {
            props.power(!prevState.power);
            return {power: !prevState.power};
        });
    }

    render() {
        return (
            <Wrapper>
                <Power
                    onClick={() => this.powerSwitch()}
                    className="Power"
                    style={{backgroundColor: this.state.power ? "green" : "red"}}
                >
                    Power
                </Power>
                <div className="tone-controls">
                    <ToneControl value="sawtooth" tone={(t) => this.props.tone(t)} />
                    <ToneControl value="sine" tone={(t) => this.props.tone(t)} />
                    <ToneControl value="square" tone={(t) => this.props.tone(t)} />
                    <ToneControl value="triangle" tone={(t) => this.props.tone(t)} />
                </div>
            </Wrapper>
        );
    }
}

export default SideControls;
