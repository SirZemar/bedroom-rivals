import $ from 'jquery';
import Keyframes from '@keyframes/core';
import { Anima } from '../animations/animations';
import { Animations } from '../animations/animations-temp';
import { Pokedex } from './pokedex';
import { PokemonCard } from '../ui/pokemon-card';
import { Pokemon } from './pokemon';
import { itemsImages } from '../images/items';

export class Arena {

    constructor(playerOneArray, playerTwoArray) {
        this.playerOneArray = playerOneArray;
        this.playerTwoArray = playerTwoArray;

        // variables declared 
        this.captainOneTeam = null;
        this.captainTwoTeam = null;
        this.teamOne = [];
        this.teamTwo = [];
        this.teamOneMaxHp = {};
        this.teamTwoMaxHp = {};

        this.speedBarAnimationOne = new Keyframes(document.getElementById('sp-player-one'));
        this.speedBarAnimationTwo = new Keyframes(document.getElementById('sp-player-two'));

        this.timeOutOne = false;
        this.timeOutTwo = false;
        this.dateOne = null;
        this.dateTwo = null;

    }


    /*   set timeOutOne(bolean) {
          this._timeOutOne = bolean;
      }
  
      get timeOutButton() {
          return this._timeOutOne
      } */

    get date() {
        return this._date
    }

    setPokemons() {
        this.playerOneArray.forEach((pokemon) => {
            this.teamOne.push(pokemon.pokemon);
        });

        this.playerTwoArray.forEach((pokemon) => {
            this.teamTwo.push(pokemon.pokemon);
        });

    }

    maxHealth() {
        this.teamOne.forEach((pokemon) => {
            const name = pokemon.name;
            this.teamOneMaxHp[name] = pokemon.hp;

        })

        this.teamTwo.forEach((pokemon) => {
            const name = pokemon.name;
            this.teamTwoMaxHp[name] = pokemon.hp;
        })

    }

    benchTeamOne() {
        this.playerOneArray.forEach((pokemonArr) => {
            if (!pokemonArr.pokemon.captain === true) {
                pokemonArr.appendToElement($('#bench-player-one'), 'arena__main__bench-list');
            }
        });

    }

    benchTeamTwo() {
        this.playerTwoArray.forEach((pokemonArr) => {
            if (!pokemonArr.pokemon.captain === true) {
                pokemonArr.appendToElement($('#bench-player-two'), 'arena__main__bench-list');
            }
        });
    }

    setActive() {
        this.teamOne.forEach((pokemon) => {
            if (pokemon.captain === true) {
                this.captainOneTeam = pokemon;
            }
        })

        this.teamTwo.forEach((pokemon) => {
            if (pokemon.captain === true) {
                this.captainTwoTeam = pokemon;
            }
        })
    }

    pokemonActiveOne() {
        // Image
        const imageStr = this.captainOneTeam.img;

        $('#captain-image-one').attr('src', imageStr);

        // Name
        $('#captain-name-one').html(this.captainOneTeam.name);
    }

    pokemonActiveTwo() {
        // Image
        const imageStr = this.captainTwoTeam.img;

        $('#captain-image-two').attr('src', imageStr);

        // Name
        $('#captain-name-two').html(this.captainTwoTeam.name);
    }

    itemBag() {
        const imageSrc = itemsImages.filter((item) => {
            return item.includes('backpack');
        })

        const imageEl = `<li class="arena__main__bench-list__card-container base-card-container">
                        <div class="arena__main__bench-list__card__backpack">
                        <img src="${imageSrc}" class="arena__main__bench-list__card__backpack-image"/>
                        </div>
                    </li>`

        $('#bench-player-one').append(imageEl);
        $('#bench-player-two').append(imageEl);
    }

    entryStatus(player) {

        let currentHealth = null;
        let maxHealth = null;

        // Set up stats at start
        switch (currentHealth, maxHealth, player) {
            case 'player-one':
                // Set up health
                currentHealth = Math.ceil(this.captainOneTeam.hp);
                maxHealth = Math.ceil(this.teamOneMaxHp[this.captainOneTeam.name]);

                $('#hp-player-one').html(`${currentHealth}/${maxHealth}`);

                // Set up speed
                $('#sp-player-one').css('width', 0);

                break;
            case 'player-two':
                // Set up health
                currentHealth = Math.ceil(this.captainTwoTeam.hp);
                maxHealth = Math.ceil(this.teamTwoMaxHp[this.captainTwoTeam.name]);

                $('#hp-player-two').html(`${currentHealth}/${maxHealth}`);

                // Set up speed
                $('#sp-player-two').css('width', 0);
                break;
        }
    }


    currentHealth(attackant, damage) {

        switch (attackant) {
            case 'player-two':

                // If attacked current health change
                if (damage) {

                    const currentHealth = (this.captainOneTeam.hp) - damage;
                    this.captainOneTeam.hp = currentHealth

                    const maxHealth = Math.ceil(this.teamOneMaxHp[this.captainOneTeam.name]);

                    const percentage = (currentHealth * 100) / maxHealth;

                    $('#hp-player-one').css('width', `${percentage}%`);

                    $('#hp-player-one').html(`${currentHealth}/${maxHealth}`);
                }
                break;
            case 'player-one':

                if (damage) {

                    const currentHealth = (this.captainTwoTeam.hp) - damage;
                    this.captainTwoTeam.hp = currentHealth

                    const maxHealth = Math.ceil(this.teamTwoMaxHp[this.captainTwoTeam.name]);

                    const percentage = (currentHealth * 100) / maxHealth;

                    $('#hp-player-two').css('width', `${percentage}%`);

                    $('#hp-player-two').html(`${currentHealth}/${maxHealth}`);
                }
                break;

        }
    }

    timeOutButton() { //needs refactor

        $('#time-out-one').on('click', (event) => {

            if (!this.timeOutOne) {

                this.timeOutOne = true;

                // css style
                $(event.target).addClass('selected');

                this.speedBarAnimationOne.queue({}, {
                    onEnd: () => {
                        this.dateOne = Date.now();
                        this.speedBarAnimationTwo.pause();

                        // Unables other player time-out button
                        $('#time-out-two').css({ 'pointer-events': 'none', 'opacity': '0.5' });
                    }
                });
            } else {

                this.timeOutOne = false;

                // css style
                $(event.target).removeClass('selected');

                // Enales other player time-out button
                $('#time-out-two').css({ 'pointer-events': '', 'opacity': '1' });

                this.speedBarAnimationOne.reset()
                this.currentSpeed('player-one');

                this.speedBarAnimationTwo.resume();

                // attack if nothing change (temp)
                this.currentHealth('player-one', 200);

            }
        })

        $('#time-out-two').on('click', (event) => {

            if (!this.timeOutTwo) {

                this.timeOutTwo = true;

                // css style
                $(event.target).addClass('selected');

                this.speedBarAnimationTwo.queue({}, {
                    onEnd: () => {
                        this.dateTwo = Date.now();
                        this.speedBarAnimationOne.pause();

                        // Unables other player time-out button
                        $('#time-out-one').css({ 'pointer-events': 'none', 'opacity': '0.5' });
                    }
                });
            } else {

                this.timeOutTwo = false;

                // css style
                $(event.target).removeClass('selected');

                // Enales other player time-out button
                $('#time-out-one').css({ 'pointer-events': '', 'opacity': '1' });

                this.speedBarAnimationTwo.reset()
                this.currentSpeed('player-two');

                this.speedBarAnimationOne.resume();

                // attack if nothing change (temp)
                this.currentHealth('player-two', 200);
            }
        })
    }

    simultaneousAtkCheck() {

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.dateOne - this.dateTwo);
            }, 10)
        });

    }

    currentSpeed(player) {

        let currentSpeedMs = null;

        switch (currentSpeedMs, player) {
            case 'player-one':

                currentSpeedMs = (45 - 0.12 * this.captainOneTeam.speed) * 100;

                // Speed bar animation with call of function to change current health after attack

                // this.speedBarAnimationOne = new Keyframes(document.getElementById('sp-player-one'));

                this.speedBarAnimationOne.loop({
                    name: 'speedTransition',
                    duration: `${currentSpeedMs}ms`,
                    timingFunction: 'linear'
                }, {
                    onEnd: () => {

                        // Exception to a simultaneous turn, time-out activated
                        if (this.timeOutOne || this.timeOutTwo) {

                            this.dateOne = Date.now();
                            console.log(Date.now() + ' antes')
                            this.simultaneousAtkCheck().then((value) => {
                                console.log(Date.now() + ' depois')

                                if (value < 5 && value > -5) { // Less than 5ms

                                    this.speedBarAnimationOne.reset();
                                    this.speedBarAnimationOne.play({
                                        name: 'speedTransition',
                                        duration: `${currentSpeedMs}ms`,
                                        timingFunction: 'linear'
                                    });
                                    this.speedBarAnimationOne.pause();

                                }
                            })
                        };

                        return this.currentHealth(player, 200);
                    }
                })
                break;
            case 'player-two':

                currentSpeedMs = (45 - 0.12 * this.captainTwoTeam.speed) * 100;

                // Speed bar animation with call of function to change current health after attack

                // this.speedBarAnimationTwo = new Keyframes(document.getElementById('sp-player-two'));

                this.speedBarAnimationTwo.loop({
                    name: 'speedTransition',
                    duration: `${currentSpeedMs}ms`,
                    timingFunction: 'linear'
                }, {
                    onEnd: () => {

                        // Exception to a simultaneous turn, time-out activated
                        if (this.timeOutOne || this.timeOutTwo) {

                            this.dateTwo = Date.now();

                            this.simultaneousAtkCheck().then((value) => {
                                console.log(value)
                                if (value < 5 && value > -5) {
                                    this.speedBarAnimationTwo.reset();
                                    this.speedBarAnimationTwo.play({
                                        name: 'speedTransition',
                                        duration: `${currentSpeedMs}ms`,
                                        timingFunction: 'linear'
                                    });
                                    this.speedBarAnimationTwo.pause();
                                };
                            })  // Less than 5ms
                        }

                        return this.currentHealth(player, 200);
                    }
                })
                break;
        }
    }

}