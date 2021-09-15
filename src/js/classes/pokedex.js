import $ from 'jquery';
import { Pokemon } from './pokemon';
import { PokemonCard } from "../ui/pokemon-card";
import Keyframes from '@keyframes/core';
import { Anima } from '../animations/animations';
import { arenaLoad } from '../app';
import { Animations } from '../animations/animations-temp';

export class Pokedex {

    constructor() {
        this.pokedexArray = [];
        this.team = [];
        this.playerOneTeam = [];
        this.playerTwoTeam = [];
    }

    set pokedexArrayData(pokedex) {
        this.pokedexArray = pokedex;
    }

    getPlayerOneTeam() {
        return this.playerOneTeam
    }

    getPlayerTwoTeam() {
        return this.playerTwoTeam
    }

    createPokedex() {

        // Create pokedex DOM
        for (let pokemon of this.pokedexArray) {
            const pokemonCard = new PokemonCard(pokemon);
            pokemonCard.appendToElement($('.pokedex__list'), 'pokedex__list');
        }

        // Makes all cards clickable
        document.querySelectorAll('.pokedex__list__card-container').forEach(pokedexCard => {
            pokedexCard.addEventListener("click", () => {
                this.pickPokemon(pokedexCard);

            });
        })


        this.nextButton();

    }


    pickPokemon(pokedexCard) {

        if (this.team.length < 6 && !$(pokedexCard).hasClass('picked-up')) {

            //Find pokemon selected and create new card for selected pokemon
            const pokemonName = pokedexCard.querySelector('.pokedex__list__card__name').innerHTML;
            const selectedPokemon = this.pokedexArray.filter(pokemon => pokemon.name === pokemonName)[0];

            const pokemonCard = new PokemonCard(new Pokemon(selectedPokemon.name, selectedPokemon.id, selectedPokemon.type, selectedPokemon.power, selectedPokemon.accuracy, selectedPokemon.hp));

            pokemonCard.appendToElement($('.pokedex__team-list'), 'pokedex__team-list');

            // Append check radio and by default first selected is captain
            const selectedPokemonNameElement = $("p.pokedex__team-list__card__name", pokemonCard.element);

            $(selectedPokemonNameElement).after(`<label class="pokedex__team-list__card__radio"><input class="pokedex__team-list__card__radio__captain" type="radio" name="captain"></input></label>`);

            if (this.team.length === 0) {
                $('.pokedex__team-list__card__radio__captain').attr('checked', 'checked');
                pokemonCard.pokemon.captain = true;
            }

            // Add animation for selected pokemon in pokedex
            $(pokedexCard).addClass('picked-up');

            // Add card element to this.team array
            this.team.push(pokemonCard);

            // Add event clicker to selected card to be removed if wished
            this.eventListeners(pokemonCard, pokedexCard);

        }
    }

    eventListeners(cardSelected, pokedexCard) {

        $(cardSelected.element).on("click", (event) => {

            if (!$(event.target).is(".pokedex__team-list__card__radio__captain")) {

                //Remove from DOM
                $(cardSelected.element).remove();

                // Remove from this.team array
                const arrayIndex = this.team.findIndex(element => element.element[0] === cardSelected);
                this.team.splice(arrayIndex, 1);

                //Remove "picked-up" class
                $(pokedexCard).removeClass('picked-up');

            }

        });

        $(cardSelected.element[0]).find('.pokedex__team-list__card__radio__captain').on('change',  (event) => {

            // All captain to false
            this.team.forEach((card) => {
                card.pokemon.captain = false;
            })

            // Selected is captain
            if($(event.target).is(':checked')) {

                cardSelected.pokemon.captain = true
            }

        });

    }

    nextButton() {
        $("#next-bt").on('click', () => {
            if (this.team.length === 6) {

                // Remove everthing from this.team array to this.player(One/Two)Team
                if (this.playerOneTeam.length === 0) {
                    this.playerOneTeam = this.team.slice(0);
                    this.team.splice(0);
                } else if (this.playerTwoTeam.length === 0) {
                    this.playerTwoTeam = this.team.slice(0);
                    this.team.splice(0);
                } else {
                    this.team.splice(0);
                }

                // Remove DOM of all player activity
                $('.pokedex__team-list__card-container').remove();
                $('.pokedex__list__card-container').removeClass('picked-up');

                const gridAnimation = new Keyframes(document.querySelector('.grid'));
                const pokedexListAnimation = new Keyframes(document.querySelector('.pokedex__list-container'));
                const pokedexTeamListAnimation = new Keyframes(document.querySelector('.pokedex__team-list-container'));
                const pokedexPlayerTitleAnimation = new Keyframes(document.querySelector('.pokedex__header__nav__text'));


                if (!(this.playerOneTeam.length === 6 && this.playerTwoTeam.length === 6)) {

                    // Activate animations 
                    Animations.playerOneSelectAll(gridAnimation, pokedexListAnimation, pokedexTeamListAnimation, pokedexPlayerTitleAnimation);

                } else if (this.playerOneTeam.length === 6 && this.playerTwoTeam.length === 6) {

                    // Activate animations 
                    Animations.playerTwoSelectAll(gridAnimation, pokedexListAnimation, pokedexTeamListAnimation, pokedexPlayerTitleAnimation);

                    this.done();
                }
            } else {
                alert('Please select 6 pokemon do advance');
            }


        })

    }

    done() {
        // Calls function to start the 'Arena' class
        arenaLoad()
    }

}