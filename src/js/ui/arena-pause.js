import { BaseElement } from "./base-element.js";

export class ArenaPause extends BaseElement {
    constructor() {
        super();
    }

    getElementString() {
        return `
        <section class="arena-pause">
            <div class="arena-pause-container">
                <h2 class="arena-pause__title">Players Ready?</h2>
                <div class="arena-pause__buttons">
                        <div class="arena-pause__buttons__player-one">
                            <div id="player-one-ready" class="arena-pause__buttons__player-one__button button">
                                <span class=arena-pause__buttons__player-one__button-text>
                                    Player 1
                                </span>
                            </div>
                            <div class="arena-pause__buttons__player-one__button-ready hidden">Ready</div>
                        </div>
                        <div class="arena-pause__buttons__countdown"></div>
                        <div class="arena-pause__buttons__player-two">
                            <div id="player-two-ready" class="arena-pause__buttons__player-two__button button">
                                <span class=arena-pause__buttons__player-two__button-text>
                                    Player 2
                                </span>
                            </div>
                            <div class="arena-pause__buttons__player-two__button-ready hidden">Ready</div>
                        </div>
                </div>
                
            </div>
        </section>
        `
    }
}