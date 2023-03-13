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

    updateStats() {
        this.character.events.emit('update');
        this.enemyHero.events.emit('update');
    }

    async invoke(enemyHero) {
        this.enemyHero = enemyHero;

        const baseDamage = 10;

        enemyHero.takeMagicalDamage(baseDamage + (3 * 0));
        await promisifiedSetTimeout(100);
        this.updateStats();

        enemyHero.takeMagicalDamage(baseDamage + (3 * 1));
        await promisifiedSetTimeout(100);
        this.updateStats();

        enemyHero.takeMagicalDamage(baseDamage + (3 * 2));
        await promisifiedSetTimeout(100);
        this.updateStats();

        enemyHero.takeMagicalDamage(baseDamage + (3 * 3));
        await promisifiedSetTimeout(100);
        this.updateStats();

        enemyHero.takeMagicalDamage(baseDamage + (3 * 4));

        super.invoke();
    }
}
