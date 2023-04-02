import { PassiveSpell } from '../../../spells/PassiveSpell';
import { Effect } from '../../../effects';

export class Counterspell extends PassiveSpell {
    description = 'Magical resist increased by 35%';
    name = 'Counter Spell';

    constructor({ character }) {
        super({ character, id: 'antimage_counterspell' });
    }

    applyEffect() {
        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.increaseMagicResist(0.35),
            remove: (target) => target.decraseMagicResist(0.35),
            spellId: this.id,
            description: 'magical resist increased by 35%'
        }));
    }
}
