const icons = require('../../../img/stats-icons/*.svg');
export const statsIcons = [];

for(let icon in icons) {
    statsIcons.push(icons[icon]);
}
