import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    width: calc((100% / 6) - 0.5rem);
    height: calc(100% - 0.5rem);
    border-radius: 4px;
    background-image: -webkit-gradient(linear, left top, left bottom, from(#f7f7f7), to(#e7e7e7));
    background-image: -webkit-linear-gradient(top, #f7f7f7, #e7e7e7); 
    background-image: -moz-linear-gradient(top, #f7f7f7, #e7e7e7); 
    background-image: -ms-linear-gradient(top, #f7f7f7, #e7e7e7); 
    background-image: -o-linear-gradient(top, #f7f7f7, #e7e7e7); 
    color: #a7a7a7;
    margin: 0.25rem;
    position: relative;
    text-align: center;
    line-height: 144px;
    box-shadow: 0px 3px 8px #aaa, inset 0px 2px 3px #fff;
    &:hover {
        text-decoration: none;
        color: #555;
        background: #f5f5f5;
    }
    &:before {
        content: "";
        display: block;
        background: #fff;
        border-top: 2px solid #ddd;
        position: absolute;
        top: -8px;
        left: -8px;
        bottom: -8px;
        right: -8px;
        z-index: -1;
        border-radius: 4px;
        box-shadow: inset 0px 8px 48px #ddd;
    }
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
