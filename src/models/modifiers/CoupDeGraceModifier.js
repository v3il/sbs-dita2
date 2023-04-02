import { AttackModifier } from './AttackModifier';

export class CoupDeGraceModifier extends AttackModifier {
    static create() {
        return new CoupDeGraceModifier();
    }

    applyModifier(baseDamage) {
        const isCrit = Math.random() < 0.3;

        if (isCrit) {
            return baseDamage * 1.5;
        }
        return baseDamage;
    }
}
