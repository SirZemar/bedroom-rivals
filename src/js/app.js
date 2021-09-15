import $ from 'jquery';
import { DataService } from './services/data-service';
import { Pokedex } from './classes/pokedex';
import { pokedexData } from './pokemon-data';
import { Arena } from './classes/arena';


// Gets all data base and creates an array of all pokemon
const dataService = new DataService();

dataService.createPokedexArray();

const pokedexArray = dataService.getPokedexArray();

// Pokedex has all methods related to the pokedex section
const pokedex = new Pokedex();

pokedex.pokedexArrayData = pokedexArray

pokedex.createPokedex();

export function arenaLoad() {

        const playerOneTeam = pokedex.getPlayerOneTeam();
        const playerTwoTeam = pokedex.getPlayerTwoTeam();

        const arena = new Arena(playerOneTeam, playerTwoTeam);


        arena.benchTeamOne();
        arena.benchTeamTwo();

        arena.pokemonActiveOne();
        arena.pokemonActiveTwo();

        arena.itemBag();

}