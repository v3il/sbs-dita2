import { ActiveSpell } from '../../../spells/ActiveSpell';

export class PowerCogs extends ActiveSpell {
    description = 'Deals 50 magical damage, and burns 50 enemys manapoints';
    name = 'Rocket Flare';

    constructor({ character }) {
        super({
            character,
            manacost: 50,
            cooldown: 3,
            id: 'rattletrap_power_cogs'
        });
    }

    invoke(enemyHero) {
        enemyHero.takeMagicalDamage(50);
        enemyHero.decreaseMana(50);

        super.invoke();
    }
}
