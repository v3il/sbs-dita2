import { BasicSpell } from './BasicSpell';

export class PassiveSpell extends BasicSpell {
    constructor({ character, id }) {
        super({ character, id });
        this.applyEffect();
    }

    applyEffect() {}
}
