import { ActiveSpell } from '../../../spells/ActiveSpell';

export class ManaVoid extends ActiveSpell {
    description = 'Deals damage equal to 80% of the mana used';
    name = 'Mana Void';

    constructor({ character }) {
        super({
            character,
            manacost: 100,
            cooldown: 6,
            id: 'antimage_mana_void'
        });
    }

    invoke(enemyHero) {
        const damage = (enemyHero.maxManaPoints - enemyHero.manaPoints) * 0.8;

        enemyHero.takeMagicalDamage(damage);
        super.invoke();
    }
}
