import $ from 'jquery';
import { DataService } from './services/data-service';
import { Pokedex } from './classes/pokedex';
import { pokedexData } from './pokemon-data';
import { Arena } from './classes/arena';
import { GameOpening } from './ui/game-opening';
import { ArenaPause } from './ui/arena-pause';
import { Animations } from './animations/animations-temp';

const gameOpening = new GameOpening;

gameOpening.appendToElement($('.game'));

// temporary only 1 v 1 option
const option1v1 = document.getElementById('option-1v1');

// option1v1.addEventListener('click', () => $(".opening").addClass("hidden"));
option1v1.addEventListener('click', () => {
        Animations.openingSlideOff(gameOpening.element[0])
        console.log(gameOpening.element[0])
});

// Gets all data base and creates an array of all pokemon
const dataService = new DataService();

// dataService.createPokedexArray();

const pokedexArray = dataService.getPokedexArray();

// Pokedex has all methods related to the pokedex section
const pokedex = new Pokedex();

pokedex.setPokedexArrayData = pokedexArray;

pokedex.createPokedex();

export function arenaLoad() {

        // Arena pause player buttons ready
        const arenaPause = new ArenaPause();
        arenaPause.appendToElement($('.game'));


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
        // Ready players start speed bar
        arena.setPlayerReadyButtonEvent(playerOne);
        arena.setPlayerReadyButtonEvent(playerTwo);

        arena.animationSpeedOnComplete(playerOne);
        arena.animationSpeedOnComplete(playerTwo);

        arena.timeOutButtonOnClick();
        // arena.timeOutButton();
}