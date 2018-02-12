const chords  = {
    
    pitches: {"c": 0, "c#": 1, "db": 1, "d": 2, "d#": 3, "eb": 3, "e": 4, "f": 5, "f#": 6, "gb": 6, "g": 7, "g#": 8, "ab": 8, "a": 9, "a#": 10, "bb": 10, "b": 11, "cb": 11},

    getChord: function(p, type, interval=7) {
        this.setRoot(p);
        switch (type) {
            case "maj":
                return this.majChord();
            case "min":
                return this.minChord();
            case "dim":
                return this.dimChord();
            case "aug":
                return this.augChord();
            case "maj7":
                return this.maj7Chord();
            case "min7":
                return this.min7Chord();
            case "pow":
                return this.powChord();
            case "int":
                return this.interval(p, interval);
            default:
                return [this.root, this.root, this.root];
        }
    
    },

    root: "C",
    
    setRoot: function(p) {
        this.root = this.pitches[p];
    },

    majChord: function() {
        const r = this.root;
        return [r, r+4, r+ 7];
    },

    minChord: function() {
        const r = this.root;
        return [r, r+3, r+ 7];
    },

    dimChord: function() {
        const r = this.root;
        return [r, r+3, r+6];
    },

    augChord: function() {
        const r = this.root;
        return [r, r+4, r+8];
    },

    maj7Chord: function() {
        const r = this.root;
        return [r, r+4, r+7, r+11];
    },

    min7Chord: function() {
        const r = this.root;
        return [r, r+3, r+7, r+10];
    },

    powChord: function() {
        const r = this.root;
        return [r, r+7];
    },

    interval: function(interval) {
        const r = this.root;
        return [r, r+interval];
    },

}
export default chords;
