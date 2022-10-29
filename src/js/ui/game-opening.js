import { BaseElement } from "./base-element";
import { logoTitlesImages } from '../images/opening';

export class GameOpening extends BaseElement {
    constructor() {
        super();
    }

    getElementString() {
        const titleImage = logoTitlesImages.filter(img => img.svg?.includes('/title.'));
        const subtitleImage = logoTitlesImages.filter(img => img.png?.includes('/subtitle-glow.'));

        console.log()
        return `
        <section class="opening">
            <div class="opening__logo">
                <img class="opening__logo__title" src="${titleImage[0].svg}"/>
                <img class="opening__logo__subtitle" src="${subtitleImage[0].png}"/>
            </div>
            <section class="button-container">
                <div class="container">
                    <div id="option-1v1" class="button v19">
                        <span class="label">1 vs 1</span>
                        <span class="icon">
                            <span></span>
                        </span>
                        <span class="icon2"></span>
                    </div>
                    <div id="option-2v2" class="button v19">
                        <span class="label">2 vs 2</span>
                        <span class="icon">
                            <span></span>
                        </span>
                        <span class="icon2"></span>
                    </div>
                    <div id="option-pokedex" class="button v19">
                        <span class="label">Pokedex</span>
                        <span class="icon">
                            <span></span>
                        </span>
                        <span class="icon2"></span>
                    </div>
                    <div id="option-exit" class="button v19">
                        <span class="label">Exit</span>
                        <span class="icon">
                            <span></span>
                        </span>
                    <span class="icon2"></span>
                </div>
                </div>
            </section>
        </section>
        `
    }
}