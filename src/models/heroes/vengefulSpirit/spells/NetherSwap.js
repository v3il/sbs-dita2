import { ActiveSpell } from '../../../spells/ActiveSpell';

export class NetherSwap extends ActiveSpell {
    damage = 75;
    description = 'Deals 75 pure damage to enemy';
    name = 'Nether Swap';

    constructor({ character }) {
        super({
            character, manacost: 75, cooldown: 5, id: 'vengefulspirit_nether_swap'
        });
    }

    invoke(target) {
        target.takePureDamage(this.damage);

        super.invoke();
    }
}
