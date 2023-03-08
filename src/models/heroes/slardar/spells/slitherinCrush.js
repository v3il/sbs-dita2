import { ActiveSpell } from '../../../spells/ActiveSpell';

export class SlitherinCrush extends ActiveSpell {
    damage = 100;
    description = 'Deals 100 physical damage to the enemy';
    name = 'Slitherin Crush';

    constructor({ character }) {
        super({
            character,
            manacost: 70,
            cooldown: 3,
            id: 'slardar_slithereen_crush'
        });
    }

    invoke(enemyHero) {
        enemyHero.takePhysicalDamage(this.damage);

        super.invoke();
    }
}
