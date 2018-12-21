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
        this.changeChord = this.changeChord.bind(this);
    }

    changeChord(e) {
        e.persist();
        if (e.target.id) {
            this.setState((prevState, props) => {
                document.getElementById(prevState.currentChord)
                    .style.backgroundImage = '-webkit-linear-gradient(top, #f7f7f7, #e7e7e7)';
                e.target.style.backgroundImage = '-webkit-linear-gradient(top, #61a1f7, #e7e7e7)';
                props.changeChord(e.target.id);
                return { currentChord: e.target.id };
            });
        }
    }

  render() {
    return (
      <FieldWrapper onClick={this.changeChord}>
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
            <ChordButton chordName="Bb-maj-1"/>
            <ChordButton chordName="F-maj-1" />
            <ChordButton chordName="C-maj" />
            <ChordButton chordName="G-maj" />
            <ChordButton chordName="D-maj" />
            <ChordButton chordName="A-maj" />
        </Row>
        <Row>
            <ChordButton chordName="g-min-1"/>
            <ChordButton chordName="d-min-1" />
            <ChordButton chordName="a-min" />
            <ChordButton chordName="e-min" />
            <ChordButton chordName="b-min" />
            <ChordButton chordName="f#-min" />
        </Row>
        <Row>
            <ChordButton chordName="D-maj-1"/>
            <ChordButton chordName="A-maj-1" />
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
