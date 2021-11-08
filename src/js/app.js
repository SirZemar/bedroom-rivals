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

pokedex.setPokedexArrayData = pokedexArray

pokedex.createPokedex();

export function arenaLoad() {

        const playerOneTeam = pokedex.getPlayerOneTeam();
        const playerTwoTeam = pokedex.getPlayerTwoTeam();

        const arena = new Arena(playerOneTeam, playerTwoTeam);


        arena.setPokemons();
        arena.maxHealth();

        arena.displayTeams();

        arena.setActive();
        arena.pokemonActiveOne();
        arena.pokemonActiveTwo();

        arena.itemBag();

        const playerOne = 'player-one';
        const playerTwo = 'player-two';

        arena.entryStatus(playerOne);
        arena.entryStatus(playerTwo);

        arena.animationBarSpeed();

        arena.animationSpeedPlay(playerOne);
        arena.animationSpeedPlay(playerTwo);

        arena.animationSpeedOnComplete(playerOne);
        arena.animationSpeedOnComplete(playerTwo);

        arena.timeOutButton();

        //attack simulation (temp)
        // setTimeout(() => {arena.currentHealth('player-two',1000)}, 5000)
}