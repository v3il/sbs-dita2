import { PassiveSpell } from '../../../spells/PassiveSpell';
import { Effect } from '../../../effects';

export class Blur extends PassiveSpell {
    description = 'Evasion increased by 25%';
    name = 'Blur';

    constructor({ character }) {
        super({ character, id: 'phantom_assassin_blur' });
    }

    applyEffect() {
        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.increaseEvasion(0.25),
            remove: (target) => target.decreaseEvasion(0.25),
            spellId: this.id,
            description: this.description
        }));
    }
}
