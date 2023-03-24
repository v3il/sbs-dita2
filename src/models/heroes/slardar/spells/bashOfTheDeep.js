import { PassiveSpell } from '../../../spells/PassiveSpell';
import { BashOfTheDeepModifier } from '../../../modifiers/BashOfTheDeepModifier';
import { Effect } from '../../../effects';

export class BashOfTheDeep extends PassiveSpell {
    description = 'Every 4th hit deals additional 125 damage';
    name = 'Bash of the deep';

    constructor({ character }) {
        super({ character, id: 'slardar_bash' });
    }

    applyEffect() {
        const modifier = BashOfTheDeepModifier.create();

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: 'Every 4th hit deals additional 125 damage'
        }));
    }
}
