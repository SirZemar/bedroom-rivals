const items = require('../../../img/items/images/*.png');
export const itemsImages = [];

for(let item in items) {
    itemsImages.push(items[item]);
}
