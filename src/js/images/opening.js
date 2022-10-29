const logoTitles = require('../../../img/opening/*.(png|svg)');
export const logoTitlesImages = [];

for (let title in logoTitles) {
    logoTitlesImages.push(logoTitles[title]);
}
