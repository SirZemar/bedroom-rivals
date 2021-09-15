const types = require('../../../img/types/*.svg');
export const pokemonTypes = [];

for(let type in types) {
    pokemonTypes.push(types[type]);
}
