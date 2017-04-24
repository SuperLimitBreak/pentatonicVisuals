# pentatonicVisuals
The web-client visualisation system for pentatonic hero using simple web elements and css matrix3d transforms.

## Dependancies
At current the project listens for keyboard input on keys a-g to represent button presses
To do this the library [keypress](https://github.com/dmauro/Keypress/) is used.

The perspective transform on the fretboard is computationally derived for the browser's screen size. This code is simplified
by using the maths library [numeric](http://numericjs.com/).

Please download these libraries and put them in the lib folder. Details about versions and filenames are included in the
DEPENDANCIES.txt file in the lib/ directory.
