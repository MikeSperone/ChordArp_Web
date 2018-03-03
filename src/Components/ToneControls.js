import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    float: left;
    padding: 1rem;
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
                    id={this.props.value + '-radio'}
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
