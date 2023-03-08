import { ActiveSpell } from '../../../spells/ActiveSpell';
import { Effect } from '../../../effects';

export class GuardianSprint extends ActiveSpell {
    description = 'Armor increased by 4 for 3 rounds';
    name = 'Guardian Spirit';
    armorDelta = 4;

    constructor({ character }) {
        super({
            character,
            manacost: 75,
            cooldown: 4,
            id: 'slardar_sprint'
        });
    }

    invoke() {
        this.character.addEffect(Effect.createPositive({
            apply: (target) => target.increaseArmor(this.armorDelta),
            remove: (target) => target.decreaseArmor(this.armorDelta),
            spellId: this.id,
            duration: 3,
            description: this.description
        }));

        super.invoke();
    }
}
