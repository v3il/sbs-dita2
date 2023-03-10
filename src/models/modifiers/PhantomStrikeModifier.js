import { CoupDeGraceModifier } from './CoupDeGraceModifier';

export class PhantomStrikeModifier extends CoupDeGraceModifier {
    static create() {
        return new PhantomStrikeModifier();
    }

    constructor() {
        super();
        this.damage = 30;
        this.decreaseArmorDelta = 1;
        this.healDelta = 10;
    }

    getAction(enemyHero, currentCharacter) {
        const modifiedDamage = this.applyModifier(this.damage);

        enemyHero.decreaseArmor(this.decreaseArmorDelta);
        enemyHero.takePhysicalDamage(modifiedDamage);
        currentCharacter.increaseHitPoints(this.healDelta);
    }
}
