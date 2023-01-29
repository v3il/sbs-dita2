import { EventEmitter } from '../models/EventEmitter';

export class View extends EventEmitter {
    #el;
    #parentView;
    #childViews = [];

    constructor({ parentView } = {}) {
        super();

        this.#parentView = parentView;

        if (parentView) {
            parentView.addChildView(this);
        }
    }

    get el() {
        return this.#el;
    }

    get childViews() {
        return this.#childViews;
    }

    get parentView() {
        return this.#parentView;
    }

    addChildView(childView) {
        this.childViews.push(childView);
    }

    render() {}

    destroy() {
        this.childViews.forEach((childView) => childView.destroy());
    }
}
