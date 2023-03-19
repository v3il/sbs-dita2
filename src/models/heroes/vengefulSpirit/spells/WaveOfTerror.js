import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class WaveOfTerror extends ActiveSpell {
    damage = 25;
    description = 'Enemy`s armor reduced by 5 for 3 rounds';
    name = 'Wave Of Terror';

    constructor({ character }) {
        super({
            character, manacost: 40, cooldown: 4, id: 'vengefulspirit_wave_of_terror'
        });
    }

    invoke(enemyHero) {
        enemyHero.takeMagicalDamage(this.damage);

        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.decreaseArmor(5),
            remove: (target) => target.increaseArmor(5),
            spellId: this.id,
            duration: 3,
            description: this.description
        }));

        super.invoke();
    }
}
