import $ from 'jquery';
import { DataService } from './services/data-service';
import { Pokedex } from './classes/pokedex';
import { pokedexData } from './pokemon-data';
import { Arena } from './classes/arena';


// Gets all data base and creates an array of all pokemon
const dataService = new DataService();

// dataService.createPokedexArray();

const pokedexArray = dataService.getPokedexArray();

// Pokedex has all methods related to the pokedex section
const pokedex = new Pokedex();

pokedex.setPokedexArrayData = pokedexArray;

pokedex.createPokedex();

export function arenaLoad() {

        const playerOne = 'player-one';
        const playerTwo = 'player-two';

        const playerOneTeam = pokedex.getPlayerOneTeam();
        const playerTwoTeam = pokedex.getPlayerTwoTeam();

        const arena = new Arena(playerOneTeam, playerTwoTeam);

        // arena.setPokemons();

        arena.setActive();
        arena.displayTeams();

        arena.displayPokemonActive(playerOne);
        arena.displayPokemonActive(playerTwo);

        arena.itemBag();

        arena.animationBarSpeed();

        arena.animationSpeedPlay(playerOne);
        arena.animationSpeedPlay(playerTwo);

        arena.animationSpeedOnComplete(playerOne);
        arena.animationSpeedOnComplete(playerTwo);

        arena.timeOutButtonOnClick();
        // arena.timeOutButton();
}