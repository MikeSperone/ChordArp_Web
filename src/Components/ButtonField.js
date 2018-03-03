import React, { Component } from 'react';
import ChordButton from './atoms/ChordButton';
import styled from 'styled-components';

const FieldWrapper = styled.div`
    display: block;
    clear: both;
    height: 50vh;
`;
const Row = styled.div`
    height: 20%;
`;

class ButtonField extends Component {

    constructor(props) {
        super();
        this.state = {
            currentChord: props.currentChord
        };
    }

    changeChord(e) {
        e.persist();
        this.setState((prevState, props) => {
            document.getElementById(prevState.currentChord).style.backgroundColor = 'gray';
            e.target.style.backgroundColor = 'blue';
            props.changeChord(e.target.id);
            return { currentChord: e.target.id };
        });
    }

  render() {
    return (
      <FieldWrapper onClick={this.changeChord.bind(this)}>
        <Row>
            <ChordButton chordName="Gb-maj"/>
            <ChordButton chordName="Db-maj"/>
            <ChordButton chordName="Ab-maj"/>
            <ChordButton chordName="Eb-maj"/>
            <ChordButton chordName="Bb-maj"/>
            <ChordButton chordName="F-maj" />
        </Row>
        <Row>
            <ChordButton chordName="eb-min"/>
            <ChordButton chordName="bb-min"/>
            <ChordButton chordName="f-min" />
            <ChordButton chordName="c-min" />
            <ChordButton chordName="g-min" />
            <ChordButton chordName="d-min" />
        </Row>
        <Row>
            <ChordButton chordName="Bb-maj"/>
            <ChordButton chordName="F-maj" />
            <ChordButton chordName="C-maj" />
            <ChordButton chordName="G-maj" />
            <ChordButton chordName="D-maj" />
            <ChordButton chordName="A-maj" />
        </Row>
        <Row>
            <ChordButton chordName="g-min"/>
            <ChordButton chordName="d-min" />
            <ChordButton chordName="a-min" />
            <ChordButton chordName="e-min" />
            <ChordButton chordName="b-min" />
            <ChordButton chordName="f#-min" />
        </Row>
        <Row>
            <ChordButton chordName="D-maj"/>
            <ChordButton chordName="A-maj" />
            <ChordButton chordName="E-maj" />
            <ChordButton chordName="B-maj" />
            <ChordButton chordName="F#-maj" />
            <ChordButton chordName="C#-maj" />
        </Row>
      </FieldWrapper>
    );
  }
}

export default ButtonField;
