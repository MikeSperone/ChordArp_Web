
import Chords from '../Components/chords';

it ('gets pitch number from note name', () => {
    let chord = new Chords();
    expect(chord.root("eb")).toEqual(3);
});
