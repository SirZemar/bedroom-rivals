const images = require('../../../img/pokemons/*.png');
export const pokemonImagesArray = [];

for(let image in images) {
    pokemonImagesArray.push(images[image]);
}
