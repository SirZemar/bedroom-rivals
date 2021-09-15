import $ from 'jquery';
import keyframes from '@keyframes/core';
import { Anima } from './animations';

export class Animations {
    constructor(){
       
    }

    static playerOneSelectAll(grid, pokedexList, pokedexTeamList, pokedexPlayerTitle) {


        grid.play('gridJump 3s');

        pokedexList.play({
            name: 'fadeOutAndIn',
            duration: '3s',
            timingFunction: 'ease'
        });


        pokedexTeamList.play({
            name: 'fadeOutAndIn',
            duration: '3s',
            timingFunction: 'ease'
        }, {
            onStart: () => {
                setTimeout(() => {
                    $('.pokedex__team-list-container').css('order', '-1');
                }, 1500);
            }
        });


        pokedexPlayerTitle.play({
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

    static playerTwoSelectAll(grid, pokedexList, pokedexTeamList, pokedexPlayerTitle) {
        
        grid.play( ['gridLoop 1s linear 2s','gridJump2 3s'], {
            onStart: () => {
                setTimeout(() => {
                    $('.pokedex').css('display', 'none');
                    $('.arena').css('display', 'block');
                    grid.reset().then(grid.play('gridLoop 1s linear infinite'));
                }, 3000);
            }
        });

        pokedexList.play({
            name: 'fadeOutAndIn',
            duration: '6s',
            timingFunction: 'ease'
        });

        pokedexTeamList.play({
            name: 'fadeOutAndIn',
            duration: '6s',
            timingFunction: 'ease'
        });

        pokedexPlayerTitle.play({
            name: 'playerTitleSlide',
            duration: '6s',
            timingFunction: 'ease'
        });


    }

    
}