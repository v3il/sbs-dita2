import { ComponentView } from '../ComponentView';
import heroStatsTemplate from './heroStatsTemplate.html?raw';

export class HeroStats extends ComponentView {
    constructor({ parentView, el, game = null }) {
        super({ parentView, el });
        this.game = game;
        this.el = el;
        this.hero = null;
        this.heroAttributes = null;
        this.heroName = null;

        this.render();
        this.initElements();
    }

    initElements() {
        this.el.style.visibility = 'hidden';
        this.heroName = this.el.querySelector('[data-hero-name]');
        this.heroAttributes = this.el.querySelector('[data-hero-stats]');
    }

    updateStats() {
        if (this.game) {
            this.game.events.on('trigger', () => {
                Array.from(this.heroAttributes.children).forEach((child) => {
                    const attributeName = child.getAttribute('stat');
                    const attrValueElement = child.querySelector('[data-stat-value]');
                    if (attributeName === 'damage') {
                        attrValueElement.innerHTML = `${this.hero.minDamage} - ${this.hero.maxDamage}`;
                    } else {
                        attrValueElement.innerHTML = this.hero[attributeName];
                    }
                });
            });
        }
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
        });
        this.updateStats();
    }

    render() {
        super.render(heroStatsTemplate);
    }
}
