import { ComponentView } from '../ComponentView';
import heroStatsTemplate from './heroStatsTemplate.html?raw';

export class HeroStats extends ComponentView {
    heroAttributes;
    heroName;

    constructor({ parentView, el }) {
        super({ parentView, el });
        this.el = el;
        this.render();
        this.initElements();
    }

    initElements() {
        this.el.style.visibility = 'hidden';
        this.heroName = this.el.querySelector('[data-hero-name]');
        this.heroAttributes = this.el.querySelector('[data-hero-stats]');
    }

    showStats(hero) {
        this.el.style.visibility = '';

        this.heroName.innerHTML = hero.name;

        Array.from(this.heroAttributes.children).forEach((child) => {
            const attributeName = child.getAttribute('stat');
            const attrValueElement = child.querySelector('[data-stat-value]');

            attrValueElement.innerHTML = hero[attributeName];
        });
    }

    render() {
        super.render(heroStatsTemplate);
    }
}
