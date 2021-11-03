import { BaseElement } from "./base-element";
import { pokemonImagesArray } from "../images/pokemon-images";
import { statsIcons } from "../images/stats-icons";
import { pokemonTypes } from "../images/pokemon-type";
import { PokemonDataService } from "../services/data-service";
import { Pokemon } from "../classes/pokemon";

export class PokemonCard extends BaseElement {

  constructor(pokemon) {
    super();
    this.pokemon = pokemon;
  }

  getImage() {
    const pokemonImage = pokemonImagesArray.filter(image => image.includes(`pokemon${this.pokemon.id}`));

    this.pokemon.img = pokemonImage[0];

    return pokemonImage;
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

  getElementString() {

    // Get argument from arguments array
    const className = arguments[0][0][1];

    return `
            <li class="${className}__card-container base-card-container">
              <div class="${className}__card base-card">
                <img class="${className}__card__image base-card__image" src="${this.getImage()}"
                  alt="${this.pokemon.name}">
                <p class="${className}__card__name base-card__name">${this.pokemon.name}</p>
                <div class="${className}__card__type base-card__type">
                  ${this.getTypeImg()}
                </div>
                <div class="${className}__card__stats-container base-card__stats-container">
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${statsIcons[2]}">
                    <span class="${className}__card__stats__value base-card__stats__value">5</span> 
                  </div>
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${statsIcons[1]}">
                    <span class="${className}__card__stats__value base-card__stats__value">5</span>
                  </div>
                  <div class="${className}__card__stats base-card__stats">
                    <img class="${className}__card__stats__icon base-card__stats__icon" src="${statsIcons[0]}">
                    <span class="${className}__card__stats__value base-card__stats__value">5</span>
                  </div>
                </div>
              </div>
            </li>
            `
  }
}