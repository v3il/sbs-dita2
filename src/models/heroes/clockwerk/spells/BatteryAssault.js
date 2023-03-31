import { ActiveSpell } from '../../../spells/ActiveSpell';
import { promisifiedSetTimeout } from '../../../../utils/promisifiedSetTimeout';

export class BatteryAssault extends ActiveSpell {
    description = 'Deals magical damage with 5 hits. Base damage = 10, it increases by 3 evety hit';
    name = 'Battery Assault';
    enemyHero = null;

    constructor({ character }) {
        super({
            character,
            manacost: 60,
            cooldown: 4,
            id: 'rattletrap_battery_assault'
        });
    }

    async invoke(enemyHero) {
        this.enemyHero = enemyHero;
        const baseDamage = 10;

        for (let index = 0; index < 5; index++) {
            enemyHero.takeMagicalDamage(baseDamage + (3 * index));
            await promisifiedSetTimeout(100);
        }
        super.invoke();
    }
}
