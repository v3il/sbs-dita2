import { BasicSpell } from './BasicSpell';

export class ActiveSpell extends BasicSpell {
    manacost = 0;
    cooldown = 0;
    damageType = null;

    constructor({
        character, manacost, cooldown, damageType, id
    }) {
        super({ character, id });

        this.manacost = manacost;
        this.currentCooldown = 0;
        this.cooldown = cooldown;
        this.damageType = damageType;
    }

    get isActive() {
        return true;
    }

    get hasEnoughMana() {
        return this.character.manaPoints >= this.manacost;
    }

    get isOnCooldown() {
        return this.currentCooldown > 0;
    }

    invoke() {
        this.character.decreaseMana(this.manacost);
        this.currentCooldown = this.cooldown;
    }

    decreaseCooldown() {
        this.currentCooldown -= 1;
    }
}
