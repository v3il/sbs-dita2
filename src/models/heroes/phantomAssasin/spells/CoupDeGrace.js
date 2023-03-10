import { PassiveSpell } from '../../../spells/PassiveSpell';
import { CoupDeGraceModifier } from '../../../modifiers';
import { Effect } from '../../../effects';

export class CoupDeGrace extends PassiveSpell {
    description = '30% chance of 150% crit';
    name = 'Coup De Grace';

    constructor({ character }) {
        super({ character, id: 'phantom_assassin_coup_de_grace' });
    }

    applyEffect() {
        const modifier = CoupDeGraceModifier.create();

        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.addAttackModifier(modifier),
            remove: (target) => target.removeAttackModifier(modifier),
            spellId: this.id,
            description: this.description
        }));
    }
}
