
var chords = require('./chords').default;

describe('chords', () => {

    before(() => {
        chords.setRoot('eb');
    });

    it('gets pitch number from note name', () => {
        expect(chords.root).to.equal(3);
    });

    describe('builds the correct correct chords', () => {
        it('maj', () => {
            expect(chords.getChord("d", "maj"))
                .to.eql([2, 6, 9]);
        });
        it('min', () => {
            expect(chords.getChord("eb", "min"))
                .to.eql([3, 6, 10]);
        });
        it('dim', () => {
            expect(chords.getChord("f", "dim"))
                .to.eql([5, 8, 11]);
        });
        it('aug', () => {
            expect(chords.getChord("f#", "aug"))
                .to.eql([6, 10, 14]);
        });
        it('maj7', () => {
            expect(chords.getChord("bb", "maj7"))
                .to.eql([10, 14, 17, 21]);
        });
        it('min7', () => {
            expect(chords.getChord("a", "min7"))
                .to.eql([9, 12, 16, 19]);
        });
        it('pow', () => {
            expect(chords.getChord("b", "pow"))
                .to.eql([11, 18]);
        });
        it('int', () => {
            expect(chords.getChord("c", "int", 6))
                .to.eql([0, 6]);
        });
    });

});
