
var chords = require('./chords').default;

it ('gets pitch number from note name', () => {
    expect(chords.getRoot("eb")).to.equal(3);
});
