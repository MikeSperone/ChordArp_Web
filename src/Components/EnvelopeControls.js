import React from 'react';
import Slider from './atoms/Slider';

class EvelopeControls extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attack: 0.1;
            decay: 0.5;
            sustain: 0.5;
            release: 1;
        };
    }

    render() {
        return (
            <div>
                <Slider/>
            </div>
        );
    }
}
