import { AttackModifier } from './AttackModifier';

export class BashOfTheDeepModifier extends AttackModifier {
    counter = 0;

    static create() {
        return new BashOfTheDeepModifier();
    }

    applyModifier(baseDamage) {
        this.counter++;

        if ((this.counter % 4) === 0) {
            return baseDamage + 125;
        }
        return baseDamage;
    }
}
