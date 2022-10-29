import $, { speed } from 'jquery';
import Keyframes from '@keyframes/core';
import { Anima } from './animations';
import { Arena } from '../classes/arena';

export class Animations {
    constructor(gridEl, pokedexListEl, pokedexTeamListEl, pokedexPlayerTitleEl, pokedexPlayerHeaderAnimation) {
        this.grid = new Keyframes(gridEl);
        this.pokedexList = new Keyframes(pokedexListEl);
        this.pokedexTeamList = new Keyframes(pokedexTeamListEl);
        this.pokedexPlayerTitle = new Keyframes(pokedexPlayerTitleEl);
        this.pokedexPlayerHeaderAnimation = new Keyframes(pokedexPlayerHeaderAnimation);
    }

    playerOneSelectAll() {
        this.grid.play('gridJump 3s');

        this.pokedexList.play({
            name: 'fadeOutAndIn',
            duration: '3s',
            timingFunction: 'ease'
        });

        this.pokedexTeamList.play({
            name: 'fadeOutAndIn',
            duration: '3s',
            timingFunction: 'ease'
        }, {
            onStart: () => {
                setTimeout(() => {
                    $('.pokedex__team-list-container').css('order', '1');
                    document.querySelector('.pokedex__list li:first-child').scrollIntoView();
                    this.pokedexPlayerHeaderAnimation.play({
                        name: 'headerColorChange',
                        duration: '3s',
                        timingFunction: 'ease'
                    })

                }, 1500);
            }
        });


        this.pokedexPlayerTitle.play({
            name: 'playerTitleSlide',
            duration: '3s',
            timingFunction: 'ease'
        }, {
            onStart: () => {
                setTimeout(() => {
                    document.querySelector('.pokedex__header__nav__text').innerHTML = "Player 2"
                }, 2000);
            }
        });

    }

    playerTwoSelectAll() {
        this.grid.play(['gridLoop 1s linear 2s', 'gridJump2 3s'], {
            onStart: () => {
                setTimeout(() => {
                    $('.pokedex').css('display', 'none');
                    $('.arena').css('display', 'block');
                    grid.reset().then(grid.play('gridLoop 1s linear infinite'));
                }, 3000);
            }
        });

        this.pokedexList.play({
            name: 'fadeOut',
            duration: '3s',
            timingFunction: 'ease'
        });

        this.pokedexTeamList.play({
            name: 'fadeOut',
            duration: '3s',
            timingFunction: 'ease'
        });

        this.pokedexPlayerTitle.play({
            name: 'playerTitleSlideOut',
            duration: '3s',
            timingFunction: 'ease'
        });

    }

    static powerLevel(powerLevelCapEl) {
        const powerLevelCap = new Keyframes(powerLevelCapEl);
        powerLevelCap.play({
            name: 'powerLevelCapBlink',
            duration: '1s',
            timingFunction: 'ease'
        })
    }

}