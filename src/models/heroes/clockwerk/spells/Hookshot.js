import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class HookShot extends ActiveSpell {
    description = 'Deals 100 pure damage, enemy set silenced for 2 rounds';
    name = 'Hookshot';

    constructor({ character }) {
        super({
            character,
            manacost: 100,
            cooldown: 5,
            id: 'rattletrap_hookshot'
        });
    }

    invoke(enemyHero) {
        enemyHero.takePureDamage(100);
        enemyHero.addEffect(Effect.createNegative({
            apply: (target) => target.setSilenced(true),
            remove: (target) => target.setSilenced(false),
            duration: 2,
            spellId: this.id,
            description: 'silence'
        }));

        super.invoke();
    }
}
