import $ from 'jquery';
import { pokemonData } from "../pokemon-data";
import { Pokemon } from "../classes/pokemon";
import { PokemonCard } from "../ui/pokemon-card";
import Keyframes from '@keyframes/core';
import { Animations } from '../animations/animations';

export class DataService {

    constructor() {
        this.pokedexArray = [];
    }

    getPokedexArray() {
        this.createPokedexArray();
        return this.pokedexArray;
    }

    createPokedexArray() {
        for (let pokemon of pokemonData) {
            pokemon = new Pokemon(pokemon.name, pokemon.id, pokemon.type, pokemon.hp, pokemon.attack, pokemon.defense, pokemon.accuracy, pokemon.speed);
            this.pokedexArray.push(pokemon);
        }

    }


}

