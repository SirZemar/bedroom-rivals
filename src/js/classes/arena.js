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
        this.captainOneTeam = null;
        this.captainTwoTeam = null;
        this.teamOne = [];
        this.teamTwo = [];
        this.teamOneMaxHp = {};
        this.teamTwoMaxHp = {};

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

                const name = this.captainOneTeam.name

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
                break;

        }
    }

    currentSpeed(player) {

        let currentSpeedMs = null;
        let speedBarAnimation = null;

        switch (currentSpeedMs, player) {
            case 'player-one':

                console.log(this.captainOneTeam.speed)

                currentSpeedMs = (45 - 0.12 * this.captainOneTeam.speed) * 100;
                console.log(currentSpeedMs)

                speedBarAnimation = new Keyframes(document.getElementById('sp-player-one'));

                setInterval(() => {
                    Animations.speedBar(speedBarAnimation, currentSpeedMs);
                }, currentSpeedMs);
                break;
            case 'player-two':

                currentSpeedMs = (45 - 0.12 * this.captainTwoTeam.speed) * 100;
                console.log(currentSpeedMs)

                speedBarAnimation = new Keyframes(document.getElementById('sp-player-two'));

                //BUG!!!!!!!! Try with promises
                setInterval(() => {
                    Animations.speedBar(speedBarAnimation, currentSpeedMs);
                    setInterval(() => {
                        this.currentHealth('player-two', 200);                        
                    }, currentSpeedMs);
                }, currentSpeedMs);

                const promise = doSomething();
                console.group(promise)
                break;
        }
    }



}