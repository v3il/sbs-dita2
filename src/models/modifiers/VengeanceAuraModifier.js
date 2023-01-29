import { AttackModifier } from './AttackModifier';

export class VengeanceAuraModifier extends AttackModifier {
    static create() {
        return new VengeanceAuraModifier();
    }

    applyModifier(baseDamage) {
        return baseDamage + baseDamage * 0.33;
    }
}
