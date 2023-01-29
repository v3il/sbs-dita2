import { View } from '../View';

export class PageView extends View {
    #template;
    #router;

    constructor(template, router) {
        super();
        this.#template = template;
        this.#router = router;
    }

    get router() {
        return this.#router;
    }

    render(mountingEl) {
        // eslint-disable-next-line no-param-reassign
        mountingEl.innerHTML = this.#template;
    }
}
