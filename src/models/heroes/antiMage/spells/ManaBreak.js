import { PassiveSpell } from '../../../spells/PassiveSpell';
import { ManaBreakModifier } from '../../../modifiers';
import { Effect } from '../../../effects';

export class ManaBreak extends PassiveSpell {
    description = 'Each base attack burns 30 enemy`s mana and deals 25 magical damage';
    name = 'Mana Break';

    constructor({ character }) {
        super({ character, id: 'antimage_mana_break' });
    }

    applyEffect() {
        const modifier = ManaBreakModifier.create();

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: 'base attack burns 30 enemy`s mana and deals 25 magical damage'
        }));
    }
}
