
var Chords = require('./chords');

it ('gets pitch number from note name', () => {
    let chord = new Chords();
    expect(chord.root("eb")).toEqual(3);
});
