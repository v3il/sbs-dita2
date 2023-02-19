import { ComponentView } from '../ComponentView';
import heroStatsTemplate from './heroStatsTemplate.html?raw';

export class HeroStats extends ComponentView {
    constructor({ parentView, el }) {
        super({ parentView, el });
        this.el = el;
    }

    showStats(hero) {
        const heroName = this.el.querySelector('[data-hero-name]');
        heroName.innerHTML = hero.name;

        const attributes = this.el.querySelector('[data-hero-stats]');

        Array.from(attributes.children).forEach((child) => {
            const attributeName = child.getAttribute('stat');
            const attrValueElement = child.querySelector('[data-stat-value]');

            attrValueElement.innerHTML = hero[attributeName];
        });
    }

    render(hero) {
        super.render(heroStatsTemplate);
        this.showStats(hero);
    }
}
