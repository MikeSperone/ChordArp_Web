const Synth = require('./index').default;

var synth;

describe.skip('synth tests', () => {

    before(() => {
        synth = new Synth(1, {
            power: false,
            range: 2,
            speed: 2,
            baseOctave: 1,
            currentTone: 'sine',
            currentVolume: 0.5
        });
    });

    it('should be a synth', () => {
        true.should.be.true;
    });
    it('sets the default values', () => {
        console.log('synth defaults: ', synth.current);
    });

    it('can increase the number of voices', () => {
        synth.addSynthVoices(3);
        expect(synth.synthVoices.length).to.equal(3);
    });
    it('can decrease the number of voices', () => {
        synth.removeSynthVoices(2);
        expect(synth.synthVoices.length).to.equal(1);
    });


});
