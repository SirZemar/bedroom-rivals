import { Anima } from '../animations/animations.js';
import { Animations } from '../animations/animations-temp.js';
import { Pokedex } from './pokedex.js';
import { PokemonCard } from '../ui/pokemon-card.js';
import { Pokemon } from './pokemon.js';
import { itemsImages } from '../images/items.js';
import { Anime } from '../animations/animejs.js';

export class Arena {

    constructor(playerOneArray, playerTwoArray) {
        this.playerOneArray = playerOneArray;
        this.playerTwoArray = playerTwoArray;

        // variables declared 
        this.captainOneCard = null;
        this.captainOneTeam = null;
        this.CaptainTwoCard = null;
        this.captainTwoTeam = null;
        this.teamOne = [];
        this.teamTwo = [];

        this.timeOutOne = false;
        this.timeOutTwo = false;

        /*         this.speedBarOne = null;
                this.speedBarTwo = null;
         */
        this.speedPausedOne = null;
        this.speedPausedTwo = null;

        this.playerOneStr = 'player-one';
        this.playerTwoStr = 'player-two';
        this.playerOneReady = false;
        this.playerTwoReady = false;
    }

    setPlayerReadyButtonEvent(player) {
        const playerReady = () => {
            $(`.arena-pause__buttons__${player}__button-ready`).removeClass('hidden');
            $(`.arena-pause__buttons__${player}__button-ready`).addClass('ready');
            $(`.arena-pause__buttons__${player}`).addClass('ready');

            switch (player) {
                case 'player-one':
                    this.playerOneReady = true;
                    break;
                case 'player-two':
                    this.playerTwoReady = true;
                    break;
            }
            if (this.playerOneReady && this.playerTwoReady) {
                const countdownEL = document.querySelector('.arena-pause__buttons__countdown');
                let count = 3;
                countdownEL.innerHTML = count;
                const countdown = setInterval(() => {
                    count -= 1;
                    countdownEL.innerHTML = count;
                    if (count == 0) {
                        this.animationSpeedPlay(this.playerOneStr);
                        this.animationSpeedPlay(this.playerTwoStr);
                        clearInterval(countdown);
                        $('.arena-pause').css('display', 'none');
                    }
                }, 1000)
            }
            document.querySelector(`.arena-pause__buttons__${player}`).removeEventListener('click', playerReady)
        }
        document.querySelector(`.arena-pause__buttons__${player}`).addEventListener('click', playerReady);
    }

    pokemonTeamCardOnClick(player, pokemonCard, i, dead = false) {
        if (!dead) {
            pokemonCard.element[0].addEventListener('click', () => this.swapPokemon(player, pokemonCard, i));
        }
    }
    swapPokemon(player, pokemonCard, i) {
        let pokemonReplacedCard = undefined;
        switch (player) {
            case 'player-one':
                if (this.speedPausedOne) {
                    // UI replace cards
                    $(pokemonCard.element).remove();
                    pokemonReplacedCard = this.captainOneCard;
                    pokemonReplacedCard.appendToElement($('#bench-player-one'), 'arena__main__bench-list', i);
                    // Set up new click
                    this.pokemonTeamCardOnClick(player, pokemonReplacedCard, i, pokemonReplacedCard.pokemon.dead);

                    //Set up new active
                    pokemonReplacedCard.pokemon.captain = false;
                    pokemonCard.pokemon.captain = true;
                    this.setActive();
                    this.displayPokemonActive('player-one');

                    //Set animation duration
                    this.animationSetSpeed('player-one');

                    //Reset speed bar
                    this.animationSpeedReset('player-one');

                    this.animationSpeedPlay('player-two');
                    this.speedPausedOne = false;

                    //temp 
                    this.timeOutOne = true;
                    this.timeOut('time-out-one');

                    console.log(this.currentSpeed('player-one'), 'player-one')
                    console.log(this.currentSpeed('player-two'), 'player-two')
                }
                break;
            case 'player-two':
                if (this.speedPausedTwo) {
                    // UI replace cards
                    $(pokemonCard.element).remove();
                    pokemonReplacedCard = this.captainTwoCard;
                    pokemonReplacedCard.appendToElement($('#bench-player-two'), 'arena__main__bench-list', i);

                    // Set up new click
                    this.pokemonTeamCardOnClick(player, pokemonReplacedCard, i, pokemonReplacedCard.pokemon.dead);

                    //Set up new active
                    pokemonReplacedCard.pokemon.captain = false;
                    pokemonCard.pokemon.captain = true;
                    this.setActive();
                    this.displayPokemonActive('player-two');

                    //Set animation duration
                    this.animationSetSpeed('player-two');

                    //Reset speed bar
                    this.animationSpeedReset('player-two');

                    // Resume player one animation
                    this.animationSpeedPlay('player-one');
                    this.speedPausedTwo = false;

                    //temp 
                    this.timeOutTwo = true;
                    this.timeOut('time-out-two');

                    console.log(this.currentSpeed('player-one'), 'player-one')
                    console.log(this.currentSpeed('player-two'), 'player-two')


                }
                break;
        }
    }
    displayTeams() {
        this.playerOneArray.forEach((pokemonCard, i) => {
            if (!pokemonCard.pokemon.captain === true) {
                pokemonCard.appendToElement($('#bench-player-one'), 'arena__main__bench-list', i);
                this.pokemonTeamCardOnClick('player-one', pokemonCard, i);
            }
        });

        this.playerTwoArray.forEach((pokemonCard, i) => {
            if (!pokemonCard.pokemon.captain === true) {
                pokemonCard.appendToElement($('#bench-player-two'), 'arena__main__bench-list', i);
                this.pokemonTeamCardOnClick('player-two', pokemonCard, i);
            }
        });
    }

    itemBag() {
        const imageSrc = itemsImages.filter((item) => {
            return item.includes('backpack');
        })

        const imageEl = `<li class="arena__main__bench-list__card-container base-card-container" style="order: 6;">
                        <div class="arena__main__bench-list__card__backpack">
                        <img src="${imageSrc}" class="arena__main__bench-list__card__backpack-image"/>
                        </div>
                    </li>`

        $('#bench-player-one').append(imageEl);
        $('#bench-player-two').append(imageEl);
    }

    setActive() {
        this.playerOneArray.forEach((pokemonCard) => {
            if (pokemonCard.pokemon.captain === true) {
                this.captainOneCard = pokemonCard;
                this.captainOneTeam = pokemonCard.pokemon;
            }
        })

        this.playerTwoArray.forEach((pokemonCard) => {
            if (pokemonCard.pokemon.captain === true) {
                this.captainTwoCard = pokemonCard;
                this.captainTwoTeam = pokemonCard.pokemon;
            }
        })
    }

    displayActiveImage(player) {
        let imageStr = null;
        switch (player) {
            case 'player-one':
                imageStr = this.captainOneTeam.img;
                $('#captain-image-one').attr('src', imageStr);
                break;
            case 'player-two':
                imageStr = this.captainTwoTeam.img;
                $('#captain-image-two').attr('src', imageStr);
                break;
        }
    }

    displayActiveHp(player) {
        let currentHealth = undefined;
        let maxHealth = undefined;
        let hpPercentage = undefined;
        switch (player) {
            case 'player-one':
                currentHealth = this.captainOneTeam.hp;
                maxHealth = this.captainOneTeam.maxHP;

                hpPercentage = (currentHealth / maxHealth) * 100;

                $('#hp-player-one').html(`${currentHealth}/${maxHealth}`);

                $('#hp-player-one').css('width', `${hpPercentage}%`);
                break;
            case 'player-two':
                currentHealth = Math.ceil(this.captainTwoTeam.hp);
                maxHealth = Math.ceil(this.captainTwoTeam.maxHP);

                hpPercentage = (currentHealth / maxHealth) * 100;

                $('#hp-player-two').html(`${currentHealth}/${maxHealth}`);

                $('#hp-player-two').css('width', `${hpPercentage}%`);
                break;
        }
    }

    displayActiveName(player) {
        switch (player) {
            case 'player-one':
                $('#captain-name-one').html(this.captainOneTeam.name);
                break;
            case 'player-two':
                $('#captain-name-two').html(this.captainTwoTeam.name);
                break;
        }
    }
    displayPokemonActive(player) {
        this.displayActiveImage(player);
        this.displayActiveHp(player);
        this.displayActiveName(player);
    }



    autoAttack(attackant, damage) {
        switch (attackant) {
            case 'player-two':
                if (damage) {
                    this.captainOneTeam.hp = Math.round(this.captainOneTeam.hp - damage);
                    this.displayActiveHp('player-one');
                    //dead
                    if (this.captainOneTeam.hp <= 0) {
                        console.log('dead');
                        this.captainOneTeam.dead = true;
                        this.speedBarOne.pause();
                        this.speedBarTwo.restart();
                        this.speedBarTwo.pause();
                        this.speedPausedOne = true;
                    }
                }
                break;
            case 'player-one':
                if (damage) {
                    this.captainTwoTeam.hp = Math.round(this.captainTwoTeam.hp - damage);
                    this.displayActiveHp('player-two');
                    //dead
                    if (this.captainTwoTeam.hp <= 0) {
                        console.log('dead');
                        this.captainTwoTeam.dead = true;
                        this.speedBarTwo.pause();
                        this.speedBarOne.restart();
                        this.speedBarOne.pause();
                        this.speedPausedTwo = true;
                    }
                }
                break;
        }
    }

    timeOutButtonOnClick() {
        $('.arena__combat__time-button').on('click', (event) => {
            const timeOutId = $(event.target).attr('id');
            this.timeOut(timeOutId);
        });
    }

    timeOut(timeOutId) {
        switch (timeOutId) {
            case 'time-out-one':
                if (!this.timeOutOne) {
                    this.timeOutOne = true;

                    // css style
                    $(`#${timeOutId}`).addClass('selected');

                } else {
                    this.timeOutOne = false;

                    // css style
                    $(`#${timeOutId}`).removeClass('selected');

                    // Enales other player time-out button
                    $('#time-out-two').css({ 'pointer-events': '', 'opacity': '1' });

                    // Restarts
                    if (this.speedPausedOne) {
                        this.animationSpeedPlay('player-one');
                        this.animationSpeedPlay('player-two');
                        this.speedPausedOne = false;
                    }
                }
                break;
            case 'time-out-two':
                if (!this.timeOutTwo) {
                    this.timeOutTwo = true;

                    // css style
                    $(`#${timeOutId}`).addClass('selected');

                } else {
                    this.timeOutTwo = false;

                    // css style
                    $(`#${timeOutId}`).removeClass('selected');

                    // Enales other player time-out button
                    $('#time-out-one').css({ 'pointer-events': '', 'opacity': '1' });

                    // Restarts
                    if (this.speedPausedTwo) {
                        this.animationSpeedPlay('player-two');
                        this.animationSpeedPlay('player-one');
                        this.speedPausedTwo = false;
                    }
                }
                break;
        }
    }

    currentSpeed(player) {

        let currentSpeedMs = null;

        switch (currentSpeedMs, player) {
            case 'player-one':

                currentSpeedMs = Math.round((45 - 0.12 * this.captainOneTeam.speed) * 100);

                return currentSpeedMs;
            case 'player-two':

                currentSpeedMs = Math.round((45 - 0.12 * this.captainTwoTeam.speed) * 100);

                return currentSpeedMs;
        }
    }

    animationBarSpeed() {
        this.speedBarOne = Anime.animationSpeed('player-one', this.currentSpeed('player-one'));
        this.speedBarTwo = Anime.animationSpeed('player-two', this.currentSpeed('player-two'));
    }

    animationSpeedPlay(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.play();
                break;
            case 'player-two':
                this.speedBarTwo.play();
                break;
        }
    }

    animationSetSpeed(player, newTime = this.currentSpeed(player)) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.animations[0].tweens[0].duration = newTime;
                this.speedBarOne.animations[0].tweens[0].end = newTime;
                this.speedBarOne.animations[0].duration = newTime;
                this.speedBarOne.duration = newTime;
                break;
            case 'player-two':
                this.speedBarTwo.animations[0].tweens[0].duration = newTime;
                this.speedBarTwo.animations[0].tweens[0].end = newTime;
                this.speedBarTwo.animations[0].duration = newTime;
                this.speedBarTwo.duration = newTime;
                break;
        }

    }
    animationSpeedPause(player) {

        switch (player) {
            case 'player-one':
                this.speedBarOne.loopComplete = () => {

                    this.speedBarOne.pause();
                    this.speedBarTwo.pause();

                    // Unables time-out button
                    $('#time-out-two').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                    // $('#time-out-one:not(.selected)').on('click', () => console.log('asd'));
                }
                break;
            case 'player-two':
                this.speedBarTwo.loopComplete = () => {
                    this.speedBarTwo.pause();
                    this.speedBarOne.pause();

                    // Unables time-out button
                    $('#time-out-one').css({ 'pointer-events': 'none', 'opacity': '0.5' });
                }
                break;
        }
    }

    animationSpeedOnComplete(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.loopComplete = () => {

                    if (this.timeOutOne) {
                        this.speedBarOne.pause();
                        this.speedBarTwo.pause();

                        // Unables time-out button
                        $('#time-out-two').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                        this.speedPausedOne = true;
                        return
                    } else {
                        //attack temp
                        const damageUm = Math.round((this.captainOneTeam.attack) * ((2 + this.captainOneTeam.attack / (this.captainTwoTeam.defense * 500)) ** (1 / 3)));
                        this.autoAttack(player, damageUm);
                        console.log(this.speedBarOne.currentTime, player)
                        console.log(damageUm, player)
                    }

                }
                break;
            case 'player-two':
                this.speedBarTwo.loopComplete = () => {
                    if (this.timeOutTwo) {

                        this.speedBarTwo.pause();
                        this.speedBarOne.pause();

                        // Unables time-out button
                        $('#time-out-one').css({ 'pointer-events': 'none', 'opacity': '0.5' });

                        this.speedPausedTwo = true;
                    } else {
                        //attack temp
                        const damageDois = Math.round((this.captainTwoTeam.attack) * ((2 + this.captainTwoTeam.attack / (this.captainOneTeam.defense * 500)) ** (1 / 3)))
                        this.autoAttack(player, damageDois);
                        console.log(this.speedBarTwo.currentTime, player)
                        console.log(damageDois, player)

                    }
                }
                break;
        }
    }

    animationSpeedReset(player) {
        switch (player) {
            case 'player-one':
                this.speedBarOne.restart();
                break;
            case 'player-two':
                this.speedBarTwo.restart();
                break;
        }
    }

}