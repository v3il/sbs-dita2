import { ActiveSpell } from '../../../spells/ActiveSpell';

export class RocketFlare extends ActiveSpell {
    description = 'Deals 40 magical damage';
    name = 'Rocket Flare';

    constructor({ character }) {
        super({
            character,
            manacost: 40,
            cooldown: 2,
            id: 'rattletrap_rocket_flare'
        });
    }

    invoke(enemyHero) {
        enemyHero.takeMagicalDamage(50);

        super.invoke();
    }
}
