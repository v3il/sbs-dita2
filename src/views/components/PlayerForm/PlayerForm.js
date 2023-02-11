import template from './template.html?raw';
import heroStatsTemplate from './heroStatsTemplate.html?raw';
import { ComponentView } from '../ComponentView';
import './styles.scss';
import { heroFactory } from '../../../services';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';

export class PlayerForm extends ComponentView {
    #player;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#player = player;
        this.el = el;
        this.render();
    }

    showStats(hero) {
        const heroStats = this.el.querySelector('[data-hero-stat]');
        heroStats.innerHTML = heroStatsTemplate;

        const heroName = this.el.querySelector('[data-hero-name]');
        heroName.innerHTML = hero.name;

        const attributes = this.el.querySelector('[data-hero-stats]');

        Array.from(attributes.children).forEach((child) => {
            const attributeName = child.getAttribute('stat');
            const attrValueElement = document.createElement('p');
            attrValueElement.innerHTML = hero[attributeName];
            child.appendChild(attrValueElement);
        });
    }

    renderHeroIcons() {
        const heroSelector = this.el.querySelector('[data-hero-selector]');
        const heroes = heroFactory.availableHeroes;

        heroes.forEach((hero) => {
            const currentHeroAvatarURL = DotaAssetUrlManager.getHeroImageUrl(hero.id);
            const heroAvatarImage = document.createElement('img');

            heroAvatarImage.addEventListener('click', () => {
                this.showStats(hero);
            });
            heroAvatarImage.setAttribute('src', currentHeroAvatarURL);
            heroSelector.appendChild(heroAvatarImage);
        });
    }

    render() {
        this.mountElement(template);

        const title = this.el.querySelector('[data-title]');
        title.innerHTML = this.#player.team.toUpperCase();

        this.renderHeroIcons();
    }
}
