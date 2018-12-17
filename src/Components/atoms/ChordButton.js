import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: gray;
    width: calc(100% / 6);
    height: 100%;
    border-radius: 4px;
`;

class ChordButton extends React.Component {

    constructor(props) {
        super();
        this.id = props.chordName;
        this.chordName = this.getDisplayName(props.chordName);
        this.chordFullName = props.chordName;
        this.chordShortName = this.getShortName(props.chordName);
    }

    getDisplayName(fullName) {
        var name = fullName.replace('-', ' ');
        const match = name.match('-');
        if (match !== null && match.index) {
            name = name.slice(0, match.index);
        }
        return name;
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
        return <Button id={this.id}>{this.chordName}</Button>;
    }

}

export default ChordButton;
