import { PassiveSpell } from '../../../spells/PassiveSpell';
import { VengeanceAuraModifier } from '../../../modifiers';
import { Effect } from '../../../effects';

export class VengeanceAura extends PassiveSpell {
    constructor({ character }) {
        super({ character, id: 'vengefulspirit_command_aura' });
    }

    applyEffect() {
        const modifier = VengeanceAuraModifier.create();

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: 'Base damage increased by 33%'
        }));
    }
}
