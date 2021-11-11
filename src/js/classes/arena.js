import $ from 'jquery';
import Keyframes from '@keyframes/core';
import { Anima } from '../animations/animations';
import { Animations } from '../animations/animations-temp';
import { Pokedex } from './pokedex';
import { PokemonCard } from '../ui/pokemon-card';
import { Pokemon } from './pokemon';
import { itemsImages } from '../images/items';
import { Anime } from '../animations/animejs';

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

        this.timeOutOne = false;
        this.timeOutTwo = false;

        /*   this.dateOne = null;
          this.dateTwo = null; */

        this.speedBarOne = null;
        this.speedBarOne = null;

        this.speedPausedOne = null;
        this.speedPausedTwo = null;
    }

    setPokemons() {
        this.playerOneArray.forEach((pokemonCard) => {
            this.teamOne.push(pokemonCard.pokemon);
        });

        this.playerTwoArray.forEach((pokemonCard) => {
            this.teamTwo.push(pokemonCard.pokemon);
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

    displayTeams() {
        this.playerOneArray.forEach((pokemonCard) => {
            if (!pokemonCard.pokemon.captain === true) {
                pokemonCard.appendToElement($('#bench-player-one'), 'arena__main__bench-list');
            }
        });

        this.playerTwoArray.forEach((pokemonCard) => {
            if (!pokemonCard.pokemon.captain === true) {
                pokemonCard.appendToElement($('#bench-player-two'), 'arena__main__bench-list');
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

    timeOutButton() {

        $('#time-out-one').on('click', (event) => {

            if (!this.timeOutOne) {

                this.timeOutOne = true;

                // css style
                $(event.target).addClass('selected');


            } else {

                this.timeOutOne = false;

                // css style
                $(event.target).removeClass('selected');

                // Enales other player time-out button
                $('#time-out-two').css({ 'pointer-events': '', 'opacity': '1' });

                // Restarts
                if (this.speedPausedOne) {
                    this.animationSpeedPlay('player-one');
                    this.animationSpeedPlay('player-two');
                    this.speedPausedOne = false;
                }

            }
        })

        $('#time-out-two').on('click', (event) => {

            if (!this.timeOutTwo) {

                this.timeOutTwo = true;

                // css style
                $(event.target).addClass('selected');


            } else {

                this.timeOutTwo = false;

                // css style
                $(event.target).removeClass('selected');

                // Enales other player time-out button
                $('#time-out-one').css({ 'pointer-events': '', 'opacity': '1' });

                // Restarts
                if (this.speedPausedTwo) {
                    this.animationSpeedPlay('player-two');
                    this.animationSpeedPlay('player-one');
                    this.speedPausedTwo = false;
                }
            }
        })
    }

    currentSpeed(player) {

        let currentSpeedMs = null;

        switch (currentSpeedMs, player) {
            case 'player-one':

                currentSpeedMs = (45 - 0.12 * this.captainOneTeam.speed) * 100;

                return currentSpeedMs;
            case 'player-two':

                currentSpeedMs = (45 - 0.12 * this.captainTwoTeam.speed) * 100;

                return currentSpeedMs;
        }
    }

    animationBarSpeed() {
        this.speedBarOne = Anime.animationSpeed('player-one', this.currentSpeed('player-one'));
        this.speedBarTwo = Anime.animationSpeed('player-two', this.currentSpeed('player-two'));
    }

    animationSpeedPlay(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.play();
                break;
            case 'player-two':
                this.speedBarTwo.play();
                break;
        }
    }

    animationSpeedPause(player) {

        switch (player) {
            case 'player-one':
                this.speedBarOne.loopComplete = () => {

                    this.speedBarOne.pause();
                    this.speedBarTwo.pause();

                    // Unables time-out button
                    $('#time-out-two').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                    $('#time-out-one:not(.selected)').on('click', console.log('asd'));
                }
                break;
            case 'player-two':
                this.speedBarTwo.loopComplete = () => {
                    this.speedBarTwo.pause();
                    this.speedBarOne.pause();

                    // Unables time-out button
                    $('#time-out-one').css({ 'pointer-events': 'none', 'opacity': '0.5' });
                }
                break;
        }
    }

    animationSpeedOnComplete(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.loopComplete = () => {

                    if (this.timeOutOne) {
                        this.speedBarOne.pause();
                        this.speedBarTwo.pause();

                        // Unables time-out button
                        $('#time-out-two').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                        this.speedPausedOne = true;
                        return
                    } else {
                        //attack
                        this.currentHealth(player, this.captainOneTeam.attack);
                    }

                }
                break;
            case 'player-two':
                this.speedBarTwo.loopComplete = () => {
                    if (this.timeOutTwo) {

                        this.speedBarTwo.pause();
                        this.speedBarOne.pause();

                        // Unables time-out button
                        $('#time-out-one').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                        this.speedPausedTwo = true;
                    } else {
                        //attack
                        this.currentHealth(player, this.captainTwoTeam.attack);
                    }
                }
                break;
        }
    }

    animationSpeedReset(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.restart();
                break;
            case 'player-two':
                this.speedBarTwo.restart();
                break;
        }
    }

}