import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: gray;
    width: calc(100% / 6);
    height: 100%;
`;

class ChordButton extends React.Component {

    constructor(props) {
        super();
        this.chordName = props.chordName;
        this.chordFullName = props.chordName;
        this.chordShortName = this.getShortName(props.chordName);
    }

    getShortName(fullName) {
        let nameSplit = fullName.split("-");
        let letterName = nameSplit[0];
        let chordType = nameSplit[1];
        var type;
        switch (chordType) {
            case "min":
                type = "m";
                break;
            case "maj":
                type = "M";
                break;
            case "aug":
                type = "A";
                break;
            case "dim":
                type = "d";
                break;
            default:
                type = "chord";
        };
        return letterName + type;
    }
        
    render() {
        return <Button id={this.chordName}>{this.chordName}</Button>;
    }

}

export default ChordButton;
