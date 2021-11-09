import anime from 'animejs/lib/anime.es.js';
import { Arena } from '../classes/arena';

export class Anime {
    constructor() {
    }
    static animationSpeed(player, currentSpeedMs) {

        switch (player) {
            case 'player-one':
                const targetOne = document.getElementById('sp-player-one');
                const speedBarOne = anime({
                    targets: targetOne,
                    width: ['0%', '100%'],
                    easing: 'linear',
                    duration: currentSpeedMs,
                    loop: true,
                    autoplay: false
                });

                return speedBarOne;
            case 'player-two':
                const targetTwo = document.getElementById('sp-player-two');
                const speedBarTwo = anime({
                    targets: targetTwo,
                    width: ['0%', '100%'],
                    easing: 'linear',
                    duration: currentSpeedMs,
                    loop: true,
                    autoplay: false
                });
                return speedBarTwo;
        }
    }

}