import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class CorrosiveHaze extends ActiveSpell {
    description = 'Enemy`s armor decreased by 6 for 4 rounds';
    name = 'Corrosive Haze';
    armorDelta = 6;

    constructor({ character }) {
        super({
            character,
            manacost: 50,
            cooldown: 6,
            id: 'slardar_amplify_damage'
        });
    }

    invoke(enemyHero) {
        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.decreaseArmor(this.armorDelta),
            remove: (target) => target.increaseArmor(this.armorDelta),
            spellId: this.id,
            duration: 4,
            description: 'armor decreased by 6'
        }));

        super.invoke();
    }
}
