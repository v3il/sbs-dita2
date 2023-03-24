import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class Blink extends ActiveSpell {
    description = 'Armor increased by 2, evasion by 20%';
    name = 'Blink';
    armorDelta = 2;
    evasionDelta = 0.2;

    constructor({ character }) {
        super({
            character,
            manacost: 50,
            cooldown: 4,
            id: 'antimage_blink'
        });
    }

    invoke() {
        this.character.addEffect(Effect.createPositive({
            apply: (target) => {
                target.increaseArmor(this.armorDelta);
                target.increaseEvasion(this.evasionDelta);
            },
            remove: (target) => {
                target.decreaseArmor(this.armorDelta);
                target.decreaseHitPoints(this.evasionDelta);
            },
            spellId: this.id,
            duration: 3,
            description: 'armor increased by 2, evasion by 20%'
        }));

        super.invoke();
    }
}
