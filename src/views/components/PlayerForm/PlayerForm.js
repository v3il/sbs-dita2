/* eslint-disable max-len */
import heroAvatarTemplate from './heroAvatarTemplate.html?raw';
// import heroStatsTemplate from './heroStatsTemplate.html?raw';
import template from './template.html?raw';
import { HeroStats } from '../HeroStat/HeroStat';
import { ComponentView } from '../ComponentView';
import './styles.scss';
import { heroFactory } from '../../../services';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';

export class PlayerForm extends ComponentView {
    #player;
    #idOfHeroSelected;
    #elementSelectedHero;
    heroStatsContainer;
    heroSelectorContainer;
    inputField;
    validationButton;
    heroStats;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#idOfHeroSelected = null;
        this.#player = player;
        this.#elementSelectedHero = null;
        this.el = el;
        this.render();
    }

    initPageElements() {
        this.heroStatsContainer = this.el.querySelector('[data-hero-stat]');
        this.heroSelectorContainer = this.el.querySelector('[data-hero-selector]');
        this.inputField = this.el.querySelector('[data-player-name]');
        this.validationButton = this.el.querySelector('[data-confirm]');
        this.heroStats = new HeroStats({
            parentView: this,
            el: this.heroStatsContainer
        });
    }

    getNameValidation() {
        this.validationButton.disabled = true;

        this.inputField.addEventListener('input', () => {
            if (this.inputField.value !== '') {
                this.inputField.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
            } else { this.inputField.style.boxShadow = ''; }

            if ((this.inputField.value !== '') && this.#idOfHeroSelected !== null) {
                this.validationButton.disabled = false;
                this.validationButton.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
            } else {
                this.validationButton.disabled = true;
                this.validationButton.style.boxShadow = '';
            }
        });
    }

    renderHeroIcons() {
        const heroes = heroFactory.availableHeroes;

        heroes.forEach((hero) => {
            const currentHeroAvatarURL = DotaAssetUrlManager.getHeroImageUrl(hero.id);
            const heroAvatarButton = document.createElement('button');

            heroAvatarButton.innerHTML = heroAvatarTemplate;

            const avatarImage = heroAvatarButton.querySelector('[data-hero-avatar]');

            heroAvatarButton.setAttribute('class', 'hero-avatar-button');
            avatarImage.src = currentHeroAvatarURL;

            heroAvatarButton.addEventListener('click', () => {
                this.heroStats.render(hero);
                this.#idOfHeroSelected = hero.id;

                if (this.#elementSelectedHero) {
                    this.#elementSelectedHero.setAttribute('class', 'hero-avatar-button');
                }
                this.#elementSelectedHero = heroAvatarButton;
                this.#elementSelectedHero.setAttribute('class', 'hero-avatar-button-active');

                if (this.inputField.value !== '') {
                    this.confirmationButton.disabled = false;
                    this.validationButton.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
                }
            });

            this.heroSelectorContainer.appendChild(heroAvatarButton);
        });
    }

    getHeroConfirmation() {
        this.validationButton.addEventListener('click', () => {
            if (this.#idOfHeroSelected) {
                const selectedHero = heroFactory.createHero(this.#idOfHeroSelected, this.#player.events);

                this.validationButton.disabled = true;
                this.inputField.disabled = true;
                this.validationButton.style.boxShadow = '';
                this.disableHeroAvatars();
                this.#player.setName(this.inputField.value);
                this.#player.setHero(selectedHero);
                this.emit('selected');
            }
        });
    }

    disableHeroAvatars() {
        Array.from(this.heroSelectorContainer.children).forEach((node) => {
            const currentElement = node;

            currentElement.disabled = true;
        });
    }

    render() {
        this.mountElement(template);
        this.initPageElements();

        const title = this.el.querySelector('[data-title]');

        title.innerHTML = this.#player.team.toUpperCase();
        switch (this.#player.team) {
        case 'dire': title.setAttribute('class', 'player-form__title red');
            break;
        default: title.setAttribute('class', 'player-form__title blue');
            break;
        }

        this.renderHeroIcons();
        this.getHeroConfirmation();
        this.getNameValidation();
    }
}
