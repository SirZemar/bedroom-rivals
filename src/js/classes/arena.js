import $ from 'jquery';
import { keyframes } from '@keyframes/core';
import { Animations } from '../animations/animations';
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

    currentHealthOne(damage) {
        const name = this.captainOneTeam.name

        // Set up health at start
        $('#hp-player-one').html(`${this.captainOneTeam.hp}/${this.teamOneMaxHp[name]}`);

        // If attacked current health change
        if (damage) {
            this.captainOneTeam.hp = this.captainOneTeam.hp - damage;
            
            const percentage = (this.captainOneTeam.hp * 100) / this.teamOneMaxHp[name];
            
            $('#hp-player-one').css('width', `${percentage}%`);

            $('#hp-player-one').html(`${this.captainOneTeam.hp}/${this.teamOneMaxHp[name]}`);

        }
    }



}