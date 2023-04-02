import { ComponentView } from '../ComponentView';
import heroStatsTemplate from './heroStatsTemplate.html?raw';

export class HeroStats extends ComponentView {
    constructor({ player, parentView, el }) {
        super({ parentView, el });
        this.player = player || null;
        this.el = el;
        this.hero = null;
        this.heroAttributes = null;
        this.heroName = null;
        this.armorAttribute = null;

        this.render();
        this.init();
    }

    init() {
        this.el.style.visibility = 'hidden';
        this.heroName = this.el.querySelector('[data-hero-name]');
        this.heroAttributes = this.el.querySelector('[data-hero-stats]');

        this.player?.events.on('updateStats', () => {
            this.armorAttribute.innerHTML = this.hero.armor;
        });
    }

    showStats(hero) {
        this.hero = hero;
        this.el.style.visibility = '';
        this.heroName.innerHTML = hero.name;

        Array.from(this.heroAttributes.children).forEach((child) => {
            const attributeName = child.getAttribute('stat');
            const attrValueElement = child.querySelector('[data-stat-value]');

            if (attributeName === 'damage') {
                attrValueElement.innerHTML = `${hero.minDamage} - ${hero.maxDamage}`;
            } else {
                attrValueElement.innerHTML = hero[attributeName];
            }

            if (attributeName === 'armor') {
                this.armorAttribute = child;
            }
        });
    }

    render() {
        super.render(heroStatsTemplate);
    }
}
