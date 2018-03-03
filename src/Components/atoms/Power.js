import React from 'react';
import styled from 'styled-components';

const Power = styled.button`
    cursor: pointer;
    border-radius: 0px;
    box-shadow: inset 0 0 1px 1px lightgray;
    padding: 1rem;
    height: 90px;
    width: 90px;
    &:active {
        box-shadow: inset 0 0 6px black;
    }
    &:focus {
        outline: black solid 1px;
    }
`;
export default Power;
