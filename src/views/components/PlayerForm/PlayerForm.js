import template from './template.html?raw';
import { ComponentView } from '../ComponentView';
import './styles.scss';

export class PlayerForm extends ComponentView {
    #player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#player = player;

        this.render();
    }

    render() {
        this.mountElement(template);

        // Render other components, listen DOM events, etc.
    }
}
