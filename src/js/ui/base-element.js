export class BaseElement {

    constructor() {
        this.element = null;
    }

    appendToElement(el) {
        this.createElement(arguments);
        el.append(this.element);
    }

    createElement() {
        let s = this.getElementString(arguments);
        this.element = $(s);
    }


}