import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class MagicMissile extends ActiveSpell {
    damage = 100;
    description = 'Enemy silenced for 2 rounds';
    name = 'Magic Missile';

    constructor({ character }) {
        super({
            character,
            manacost: 75,
            cooldown: 4,
            id: 'vengefulspirit_magic_missile'
        });
    }

    invoke(enemyHero) {
        enemyHero.takeMagicalDamage(this.damage);

        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.setSilenced(true),
            remove: (target) => target.setSilenced(false),
            spellId: this.id,
            duration: 2,
            description: 'hero is silenced'
        }));

        super.invoke();
    }
}
