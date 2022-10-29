import Keyframes from '@keyframes/core';

// Pokedex grid animation after "Next" button click

Keyframes.define([{
    name: 'gridJump',
    '0%': { bottom: "-50vh" },
    '50%': { bottom: "-20vh" },
    '100%': { bottom: "-50vh" }
}, {
    name: 'gridJump2', // necessary to correct a possible bug that makes the animation 'gridJump' on the second time only starts on the second try
    '0%': { bottom: "-50vh" },
    '50%': { bottom: "-20vh" },
    '100%': { bottom: "-50vh" }
}, {
    name: 'gridStretch',
    '0%': { backgroundSize: "30px 30px" },
    '50%': { backgroundSize: "30px 170px" },
    '100%': { backgroundSize: "30px 30px" }
}, {
    name: 'gridLoop',
    '0%': { transform: "translateX(-50%) rotateX(-115deg) translateY(-100px)" },
    '100%': { transform: "translateX(-50%) rotateX(-115deg) translateY(-70px)" }
}, {
    name: 'fadeOutAndIn',
    '25%': { opacity: 0 },
    '75%': { opacity: 0 },
    '100%': { opacity: 1 }
}, {
    name: 'fadeOut',
    '25%': { opacity: 0 },
    '100%': { opacity: 0 }
}, {
    name: 'playerTitleSlide',
    '50%': { opacity: 0, transform: "translate(500px)" },
    '55%': { transform: "translate(-300px)" },
    '100%': { transform: "translate(0)" }
}, {
    name: 'playerTitleSlideOut',
    '50%': { opacity: 0, transform: "translate(500px)" },
    '100%': { opacity: 0, transform: "translate(500px)" }
}, {
    name: 'powerLevelCapBlink',
    '0%': { color: "var(--quaternaryLightest)" },
    '20%': { color: "red" },
    '100%': { color: "var(--quaternaryLightest)" }
}, {
    name: 'headerColorChange',
    '0%': { backgroundColor: "var(--playerOne)" },
    '100%': { backgroundColor: "var(--playerTwo)" }

}])


