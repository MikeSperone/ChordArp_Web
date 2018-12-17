import React from 'react';
import styled from 'styled-components';

const PowerWrapper = styled.div`
    width: 4rem;
    display: inline-block;
`;

const PowerSwitch = styled.input`
    display: block;
    opacity: 0;
`;
const PowerLabel = styled.label`
    width: 4rem;
    height: 1.75rem;
    border-radius: 1.75rem;
    cursor: pointer;
    display: inline-block;
    position: relative;
    background: lightslategray;
    box-shadow: inset 0 0 1px 1px gray;
    &:active {
        box-shadow: inset 0 0 6px black;
    }
    &:focus {
        outline: black solid 1px;
    }

    transition: background-color 0.4s;
    -moz-transition: background-color 0.4s;
    -webkit-transition: background-color 0.4s;
    &:after {
        left: 0;
        width: 1.25rem;
        height: 1.25rem;
        margin: .25rem;
        content: '';
        position: absolute;
        background: #FFF;
        border-radius: 10px;
    }
    ${PowerSwitch}:checked + & {
        background: indianRed;
    }
    ${PowerSwitch}:checked + &:after {
        transition: 0.4s;
        -moz-transition: 0.4s;
        -webkit-transition: 0.4s;
        left: auto;
        right: 0;
    }
`;
const Label = styled.div`
    text-align: center;
`;

const Power = props => (
    <PowerWrapper>
        <PowerSwitch
            id="power"
            type="checkbox"
            onChange={props.handleChange}
        />
        <PowerLabel htmlFor="power"></PowerLabel>
        <Label>Power</Label>
    </PowerWrapper>
);
export default Power;
