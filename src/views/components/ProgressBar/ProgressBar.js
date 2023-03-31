import progressBarTempalate from './progressBarTempalate.html?raw';
import { ComponentView } from '../ComponentView';

export class ProgressBar extends ComponentView {
    constructor({
        hero, type, parentView, el, classes
    }) {
        super({ parentView, el, classes });

        this.hero = hero;
        this.type = type;

        this.maxValue = null;
        this.textValueContainer = null;
        this.render();
        this.init();
    }

    init() {
        this.textValueContainer = this.el.firstElementChild;

        this.el.style.setProperty('--width', '100%');
        this.textValueContainer.textContent = `${this.maxValue}/${this.maxValue}`;

        if (this.type === 'mana') {
            this.maxValue = this.hero.maxManaPoints;

            this.hero.events.on('updateManaBar', ({ currentMana }) => {
                const relativeMP = Math.round((currentMana / this.maxValue) * 100);

                this.el.style.setProperty('--width', `${relativeMP}%`);
                this.textValueContainer.textContent = `${currentMana}/${this.maxValue}`;
            });
        } else {
            this.maxValue = this.hero.maxHitPoints;

            this.hero.events.on('updateHPBar', ({ currentHP }) => {
                const relativeHP = Math.round((currentHP / this.maxValue) * 100);

                this.el.style.setProperty('--width', `${relativeHP}%`);
                this.textValueContainer.textContent = `${currentHP}/${this.maxValue}`;
            });
        }
    }

    render() {
        super.render(progressBarTempalate);
    }
}
