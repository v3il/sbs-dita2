import { ActiveSpell } from '../../../spells/ActiveSpell';
import { PhantomStrikeModifier } from '../../../modifiers/PhantomStrikeModifier';
import { promisifiedSetTimeout } from '../../../../utils/promisifiedSetTimeout';

export class PhantomStrike extends ActiveSpell {
    description = 'phantom Strike';
    name = 'Phantom Strike';
    enemyHero = null;

    constructor({ character }) {
        super({
            character,
            manacost: 60,
            cooldown: 4,
            id: 'phantom_assassin_phantom_strike'
        });
    }

    updateStats() {
        this.character.events.emit('update');
        this.enemyHero.events.emit('update');
    }

    async invoke(enemyHero) {
        this.enemyHero = enemyHero;

        const spellAction = PhantomStrikeModifier.create();

        spellAction.getAction(enemyHero, this.character);
        this.updateStats();

        await promisifiedSetTimeout(500);
        spellAction.getAction(enemyHero, this.character);
        this.updateStats();

        await promisifiedSetTimeout(500);
        spellAction.getAction(enemyHero, this.character);

        enemyHero.increaseArmor(3);
        this.updateStats();

        super.invoke();
    }
}
