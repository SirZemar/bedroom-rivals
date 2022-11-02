import { BaseElement } from "./base-element.js";
import { statsIcons } from "../images/stats-icons.js";
import { pokemonTypes } from "../images/pokemon-type.js";

export class PokemonCard extends BaseElement {

  constructor(pokemon) {
    super();
    this.pokemon = pokemon;
  }


  getTypeImg() {
    // If there is more than one type
    if (this.pokemon.type instanceof Array) {

      const pokemonType1 = pokemonTypes.filter(type => type.includes(this.pokemon.type[0]))
      const pokemonType2 = pokemonTypes.filter(type => type.includes(this.pokemon.type[1]))

      return `<div class="pokemon-icon ${this.pokemon.type[0]}" title="${this.pokemon.type[0].charAt(0).toUpperCase() + this.pokemon.type[0].slice(1)}">
                    <img src="${pokemonType1}" alt="${this.pokemon.type[0]}">
                  </div>
                  <div class="pokemon-icon ${this.pokemon.type[1]}" title="${this.pokemon.type[1].charAt(0).toUpperCase() + this.pokemon.type[1].slice(1)}">
                    <img src="${pokemonType2}" alt="${this.pokemon.type[1]}">
                  </div>`
    } else {

      // Single type
      const pokemonType = pokemonTypes.filter(type => type.includes(this.pokemon.type))

      return `<div class="pokemon-icon ${this.pokemon.type}" title="${this.pokemon.type.charAt(0).toUpperCase() + this.pokemon.type.slice(1)}">
                    <img src="${pokemonType}" alt="${this.pokemon.type}">
                  </div>`
    }
  }

  getStats(stat) {
    switch (stat) {
      case 'attack':
        const attack = this.pokemon.attack;
        const attackLevel = Math.round((attack * 10) / 132);
        return attackLevel;
      case 'endurance':
        const defense = this.pokemon.defense;
        const hp = this.pokemon.hp;
        let enduranceLevel = Math.round((((defense + hp) / 2) * 10) / 124);
        return enduranceLevel;
      case 'speed':
        const speed = this.pokemon.speed;
        const speedLevel = Math.round((speed * 10) / 150);
        return speedLevel;
    }
  }

  getElementString() {

    // Get argument from arguments array
    const className = arguments[0][0][1];

    const swordImg = statsIcons.filter((img) => img.includes('attack'));
    const heartImg = statsIcons.filter((img) => img.includes('endurance'));
    const timeImg = statsIcons.filter((img) => img.includes('speed'));

    let statOverTopStyle = '';
    if (this.getStats('endurance') == 10 && this.getStats('endurance') !== 10) {
      statOverTopStyle = `style="color: red;"`;
    }

    return `
            <li class="${className}__card-container base-card-container">
              <div class="${className}__card base-card">
                <img class="${className}__card__image base-card__image" src="${this.pokemon.img}"
                  alt="${this.pokemon.name}">
                <p class="${className}__card__name base-card__name">${this.pokemon.name}</p>
                <p class="${className}__card__name base-card__power">(Power lvl ${this.pokemon.powerLevel})</p>
                <div class="${className}__card__type base-card__type">
                  ${this.getTypeImg()}
                </div>
                <div class="${className}__card__stats-container base-card__stats-container">
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${swordImg}">
                    <span class="${className}__card__stats__value base-card__stats__value">${this.getStats('attack')}</span> 
                  </div>
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${heartImg}">
                    <span class="${className}__card__stats__value base-card__stats__value" ${statOverTopStyle} >${this.getStats('endurance')}</span>
                  </div>
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${timeImg}">
                    <span class="${className}__card__stats__value base-card__stats__value">${this.getStats('speed')}</span>
                  </div>
                </div>
              </div>
            </li>
            `
  }
}