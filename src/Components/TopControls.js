import React from 'react';
import styled from 'styled-components';
import Slider from './atoms/Slider';

const TopControlsWrapper = styled.div`
    float: left;
`;

class TopControls extends React.Component {

    constructor(props) {
        super();
    }

    getChordName(e) {
        this.currentChord(e.target.id);
    }

    change(e) {
        console.log(e.target);
    }

    render() {
        return (
            <TopControlsWrapper>
                <h3>Chord Arp</h3>
            </TopControlsWrapper>
        );
    }
}

export default TopControls;
