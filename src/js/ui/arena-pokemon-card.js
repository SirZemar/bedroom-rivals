import { BaseElement } from "./base-element.js";
import { pokemonTypes } from "../images/pokemon-type.js";
import { Arena } from "../classes/arena.js";


export class ArenaPokemonCard extends BaseElement {
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

  getHpNumbers() {
    let hpNumbers = this.pokemon.hp / this.pokemon.maxHP;

    if (this.pokemon.hp < 0) {
      return `0 / ${this.pokemon.maxHP}`;
    }

    return `${this.pokemon.hp} / ${this.pokemon.maxHP}`;
  }

  getElementString() {

    // Get argument from arguments array
    const className = arguments[0][0][1];
    const index = arguments[0][0][2];
    const hpPercent = (this.pokemon.hp / this.pokemon.maxHP) * 100


    return `
            <li class="${className}__card-container base-card-container" style="order: ${index};">
              <div class="${className}__card base-card">
                <img class="${className}__card__image base-card__image" src="${this.pokemon.img}"
                  alt="${this.pokemon.name}">
                <p class="${className}__card__name base-card__name">${this.pokemon.name}</p>
                <div class="${className}__card__type base-card__type">
                  ${this.getTypeImg()}
                </div>
                <div class="${className}__hp progress hp">
                  <div class="teste-lay">${this.getHpNumbers()}</div>
                  <div class="hp-bar progress-bar bg-success" role="progressbar" style="width: ${hpPercent}%"
                    aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  </div>
                </div>
                <div class="${className}__special arena__combat__special-bar">
                    <div class=" arena__combat__special-bar__progress progress">
                      <div class="arena__combat__special-bar__progress__one progress-bar" role="progressbar"
                        style="width: 33.3%" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="33.3"></div>
                      <div class="arena__combat__special-bar__progress__two progress-bar" role="progressbar"
                        style="width: 33.3%" aria-valuenow="33.3" aria-valuemin="0" aria-valuemax="33.3"></div>
                      <div class="arena__combat__special-bar__progress__three progress-bar" role="progressbar"
                        style="width: 20%" aria-valuenow="20" aria-valuemin="0" aria-valuemax="33.3"></div>
                    </div>
                </div>
              </div>
            </li>
            `
  }

}