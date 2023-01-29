import { EffectTypes } from '../../consts/EffectTypes';
import { EventEmitter } from '../EventEmitter';

export class Effect {
    static createPositive({
        apply, remove, duration, spellId, description
    }) {
        return new Effect({
            apply,
            remove,
            duration,
            spellId,
            description,
            type: EffectTypes.POSITIVE
        });
    }

    static createNegative({
        apply, remove, duration, spellId, description
    }) {
        return new Effect({
            apply,
            remove,
            duration,
            spellId,
            description,
            type: EffectTypes.NEGATIVE
        });
    }

    id;
    apply;
    remove;
    duration;
    spellId;
    type;
    description;
    currentDuration = 0;
    events = new EventEmitter();

    constructor({
        apply, remove, duration, spellId, type, description
    }) {
        this.id = Math.random();
        this.apply = apply;
        this.remove = remove;
        this.duration = duration ?? null;
        this.spellId = spellId;
        this.type = type;
        this.description = description;
    }

    get isPersistent() {
        return this.duration === null;
    }

    get isEnded() {
        return this.currentDuration === 0;
    }

    get isPositive() {
        return this.type === EffectTypes.POSITIVE;
    }

    applyEffect(targetHero) {
        this.apply(targetHero);

        if (!this.isPersistent) {
            this.currentDuration = this.duration;
        }
    }

    removeEffect(targetHero) {
        this.remove(targetHero);
    }

    decreaseDuration() {
        this.currentDuration -= 1;
        this.events.emit('durationChanged');
    }
}
