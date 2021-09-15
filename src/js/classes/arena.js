import $ from 'jquery';
import { keyframes } from '@keyframes/core';
import { Animations } from '../animations/animations';
import { Pokedex } from './pokedex';
import { PokemonCard } from '../ui/pokemon-card';
import { Pokemon } from './pokemon';
import { itemsImages } from '../images/items';

export class Arena {

    constructor(playerOneTeam, playerTwoTeam) {
        this.playerOneTeam = playerOneTeam;
        this.playerTwoTeam = playerTwoTeam;

    }

    benchTeamOne() {

        this.playerOneTeam.forEach((pokemon) => {
            if (!pokemon.pokemon.captain === true) {
                pokemon.appendToElement($('#bench-player-one'), 'arena__main__bench-list');
            }
        });

    }

    benchTeamTwo() {
        this.playerTwoTeam.forEach((pokemon) => {
            if (!pokemon.pokemon.captain === true) {
                pokemon.appendToElement($('#bench-player-two'), 'arena__main__bench-list');
            }
        });
    }

    pokemonActiveOne() {
        this.playerOneTeam.forEach((pokemon) => {
            if (pokemon.pokemon.captain === true) {

                // Image
                const imageStr = pokemon.pokemon.img;

                $('#captain-image-one').attr('src', imageStr);

                // Name 
                $('#captain-name-one').html(pokemon.pokemon.name);
            }
        })
    }

    pokemonActiveTwo() {
        this.playerTwoTeam.forEach((pokemon) => {
            if (pokemon.pokemon.captain === true) {

                // Image
                const imageStr = pokemon.pokemon.img;

                $('#captain-image-two').attr('src', imageStr);

                // Name 
                $('#captain-name-two').html(pokemon.pokemon.name);
            }
        })
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

    

}