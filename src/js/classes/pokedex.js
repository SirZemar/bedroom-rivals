import $, { event } from 'jquery';
import { Pokemon } from './pokemon';
import { pokemonImagesArray } from "../images/pokemon-images";
import { PokemonCard } from "../ui/pokemon-card";
import Keyframes from '@keyframes/core';
import { Anima } from '../animations/animations';
import { Animations } from '../animations/animations-temp';
import { arenaLoad } from '../app';
import { ArenaPokemonCard } from '../ui/arena-pokemon-card';

export class Pokedex {

    constructor() {
        this.pokedexArray = [];
        this.pokemonCardArray = [];
        this.team = [];
        this.playerOneTeam = [];
        this.playerTwoTeam = [];
        this.teamPowerLevel = 0;
        this.teamPowerLevelMax = 1750;
    }

    set setPokedexArrayData(pokedex) {
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
            //images
            pokemon.img = pokemonImagesArray.filter(image => image.includes(`pokemon${pokemon.id}`))[0];

            const pokemonCard = new PokemonCard(pokemon);
            pokemonCard.appendToElement($('.pokedex__list'), 'pokedex__list');

            // Pokemon Card Array shoud have more use !!!!!!!!!!!!!!!
            this.pokemonCardArray.push(pokemonCard);
            // Clicks
            this.pokedexCardOnClick(pokemonCard)

            // Search bar event
            this.searchPokemon(pokemonCard);

            // Power level cap
            this.powerLevelCap();
        }

        const gridAnimation = document.querySelector('.grid');
        const pokedexListAnimation = document.querySelector('.pokedex__list-container');
        const pokedexTeamListAnimation = document.querySelector('.pokedex__team-list-container');
        const pokedexPlayerTitleAnimation = document.querySelector('.pokedex__header__nav__text');
        const pokedexPlayerHeaderAnimation = document.querySelector('.pokedex__header__nav');

        const playerTransitionAnimations = new Animations(gridAnimation, pokedexListAnimation, pokedexTeamListAnimation, pokedexPlayerTitleAnimation, pokedexPlayerHeaderAnimation)
        this.nextButton(playerTransitionAnimations);

        console.log(this.pokemonCardArray)
    }

    searchPokemon(pokemonCard) {
        const searchBar = document.querySelector(".pokedex__list__search > input ");
        searchBar.addEventListener("input", (e) => {
            if (!pokemonCard.pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                pokemonCard.element.addClass("hidden");
            } else {
                pokemonCard.element.removeClass("hidden");
            }
        })
    }

    powerLevelCap() {
        const powerLevelBoard = document.querySelector(".pokedex__team-list__power");
        this.teamPowerLevel = 0;
        this.team.forEach((pokemonCard) => {
            this.teamPowerLevel += pokemonCard.pokemon.powerLevel;
        })
        powerLevelBoard.innerHTML = `Power Level ${this.teamPowerLevel}/${this.teamPowerLevelMax} `;
    }

    powerLevelDisplayVisualHelp() {
        for (let pokemonCard of this.pokemonCardArray) {

            const pokemonCardEl = pokemonCard.element[0];

            if (this.teamPowerLevelMax - this.teamPowerLevel < pokemonCard.pokemon.powerLevel) {
                $(pokemonCardEl).addClass('power-cap-limit');
            } else {
                $(pokemonCardEl).removeClass('power-cap-limit');
            }
        }
    }

    pokedexCardOnClick(pokemonCard) {
        pokemonCard.element[0].addEventListener('click', () => {
            this.pickPokemon(pokemonCard.pokemon, pokemonCard.element[0])
        });
    }

    pickPokemon(pokemon, pokemonCardEl) {

        if (this.team.length < 6 && !$(pokemonCardEl).hasClass('picked-up')) {

            if (pokemon.powerLevel + this.teamPowerLevel < this.teamPowerLevelMax) {
                // Add animation for selected pokemon in pokedex
                $(pokemonCardEl).addClass('picked-up');

                // Create selected pokemon cards
                const selectedPokemonCard = new PokemonCard(pokemon);

                selectedPokemonCard.appendToElement($('.pokedex__team-list'), 'pokedex__team-list');

                //temp
                const arenaPokemon = new Pokemon(pokemon.name, pokemon.id, pokemon.type, 1500 + pokemon.hp * 5, pokemon.attack, pokemon.defense, pokemon.accuracy, pokemon.speed, pokemon.img, pokemon.baseStatHp = pokemon.hp);
                const arenaPokemonCard = new ArenaPokemonCard(arenaPokemon);
                arenaPokemonCard.pokemon.captain = false;
                console.log(arenaPokemon)

                // Append check radio and by default first selected is captain
                const pokemonNameElement = $("p.pokedex__team-list__card__name", selectedPokemonCard.element);

                $(pokemonNameElement).after(`<label class="pokedex__team-list__card__radio"><input class="pokedex__team-list__card__radio__captain" type="radio" name="captain"></input></label>`);

                this.setCaptain('first pick', arenaPokemonCard);

                // Add card element to this.team array
                this.team.push(arenaPokemonCard);

                // Add event clicker to selected card to be removed if wished
                this.selectedCardsEventListeners(selectedPokemonCard, arenaPokemonCard, pokemonCardEl);

                // Update team power level cap
                this.powerLevelCap();

                // Update visual power level help
                this.powerLevelDisplayVisualHelp();

            } else {
                const powerLevelBoard = document.querySelector(".pokedex__team-list__power");
                Animations.powerLevel(powerLevelBoard);
            }
        }
    }

    setCaptain(rule, arenaPokemonCard, selectedPokemonCard = undefined, radioInputTargetEvent = undefined) {

        switch (rule) {
            case 'first pick':
                //First selected pokemon comes selected as captain by default
                if (this.team.length === 0) {
                    $('.pokedex__team-list__card__radio__captain').attr('checked', 'checked');
                    arenaPokemonCard.pokemon.captain = true;
                }
                break;
            case 'onChange':
                // All radio check attr to false
                document.querySelectorAll('.pokedex__team-list__card__radio__captain').forEach(e => e.removeAttribute('checked'));

                // All captain to false
                this.team.forEach((card) => {
                    card.pokemon.captain = false;
                });

                $(radioInputTargetEvent.currentTarget).attr('checked', 'checked');

                // Selected is captain
                arenaPokemonCard.pokemon.captain = true
                break;
            case 'onRemoved':
                let isCaptain = $('.pokedex__team-list__card__radio__captain', selectedPokemonCard.element)[0].checked;

                //Pokemon removed if captain becomes false
                if (isCaptain) {
                    arenaPokemonCard.pokemon.captain = false;
                }
                //Captain switches to first selected pokemon in line if captain is removed
                if (isCaptain && this.team.length > 0) {
                    isCaptain = false;
                    const radioElStr = '.pokedex__team-list li:first-child .pokedex__team-list__card__radio__captain';
                    $(radioElStr).attr('checked', 'checked');
                    $(radioElStr)[0].checked = true;
                    this.team[0].pokemon.captain = true;
                }
                break;
        }
    }

    removeSelectedPokemon(selectedPokemonCard, arenaPokemonCard, pokemonCardEl, event) {
        const radioInputTarget = $(event.target).is(".pokedex__team-list__card__radio__captain");

        if (!radioInputTarget) {

            // Remove from this.team array
            const arrayIndex = this.team.findIndex(card => card === arenaPokemonCard);
            this.team.splice(arrayIndex, 1);

            //Remove "picked-up" class
            $(pokemonCardEl).removeClass('picked-up');

            //Remove from DOM
            $(selectedPokemonCard.element).remove();

            // captain
            this.setCaptain('onRemoved', arenaPokemonCard, selectedPokemonCard)

            // Update team power level cap
            this.powerLevelCap();

            // Update visual power level help
            this.powerLevelDisplayVisualHelp();
        }
    }

    selectedCardsEventListeners(selectedPokemonCard, arenaPokemonCard, pokemonCardEl) {

        $(selectedPokemonCard.element).on("click", (event) => {

            this.removeSelectedPokemon(selectedPokemonCard, arenaPokemonCard, pokemonCardEl, event);

        });

        $(selectedPokemonCard.element[0]).find('.pokedex__team-list__card__radio__captain').on('change', (event) => {

            this.setCaptain('onChange', arenaPokemonCard, undefined, event)

        });

    }

    nextButton(animations) {
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

                setTimeout(() => {
                    // Update power level
                    this.powerLevelCap();
                    // Update visual power level help
                    this.powerLevelDisplayVisualHelp();
                }, 1500);

                if (!(this.playerOneTeam.length === 6 && this.playerTwoTeam.length === 6)) {

                    // Activate animations 
                    animations.playerOneSelectAll();

                } else if (this.playerOneTeam.length === 6 && this.playerTwoTeam.length === 6) {

                    // Activate animations 

                    animations.playerTwoSelectAll();

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