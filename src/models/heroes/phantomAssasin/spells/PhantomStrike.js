import { ActiveSpell } from '../../../spells/ActiveSpell';
import { promisifiedSetTimeout } from '../../../../utils/promisifiedSetTimeout';

export class PhantomStrike extends ActiveSpell {
    description = 'phantom Strike';
    name = 'Phantom Strike';

    constructor({ character }) {
        super({
            character,
            manacost: 60,
            cooldown: 4,
            id: 'phantom_assassin_phantom_strike'
        });
    }

    getModifiedBaseDamage() {
        const isCrit = Math.random() < 0.3;

        if (isCrit) {
            return this.character.getInitialDamage() * 1.5;
        }
        return this.character.getInitialDamage();
    }

    async invoke(enemyHero) {
        for (let index = 0; index < 3; index++) {
            await promisifiedSetTimeout(500);

            enemyHero.decreaseArmor(1);
            enemyHero.takePhysicalDamage(this.getModifiedBaseDamage());
            this.character.increaseHitPoints(10);
        }

        enemyHero.increaseArmor(3);

        super.invoke();
    }
}
