import { ActiveSpell } from '../../../spells/ActiveSpell';
import { CoupDeGraceModifier } from '../../../modifiers';

export class StiflingDagger extends ActiveSpell {
    damage = 30;
    description = 'Deals physical 30 physical damage, has 30% chance of 150% damage crit';
    name = 'Stifling Dagger';

    constructor({ character }) {
        super({
            character,
            manacost: 40,
            cooldown: 3,
            id: 'phantom_assassin_stifling_dagger'
        });
    }

    invoke(enemyHero) {
        const modifier = CoupDeGraceModifier.create();
        const modifiedDamage = modifier.applyModifier(this.damage);

        enemyHero.takePhysicalDamage(modifiedDamage);

        super.invoke();
    }
}
