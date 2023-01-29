import { View } from '../View';

export class ComponentView extends View {
    #el;
    #classes;

    constructor({ parentView, el, classes = [] }) {
        super({ parentView });

        this.#el = el;
        this.#classes = classes;
    }

    get el() {
        return this.#el;
    }

    set el(el) {
        this.#el = el;
    }

    render(template) {
        this.mountElement(template);
        this.#classes.forEach((cls) => this.el.classList.add(cls));
    }

    mountElement(template) {
        const el = document.createElement('div');
        el.innerHTML = template;

        const firstChild = el.firstElementChild;

        this.#el?.replaceWith(firstChild);
        this.#el = firstChild;
    }
}
