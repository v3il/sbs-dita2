import { AttackModifier } from './AttackModifier';

export class ManaBreakModifier extends AttackModifier {
    static create() {
        return new ManaBreakModifier();
    }

    applyModifier(baseDamage, target) {
        target.decreaseMana(30);
        target.takeMagicalDamage(25);
        return baseDamage;
    }
}
