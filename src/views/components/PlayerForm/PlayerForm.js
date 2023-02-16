/* eslint-disable max-len */
import heroAvatarTemplate from './heroAvatarTemplate.html?raw';
import heroStatsTemplate from './heroStatsTemplate.html?raw';
import template from './template.html?raw';
import { ComponentView } from '../ComponentView';
import './styles.scss';
import { heroFactory } from '../../../services';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';

export class PlayerForm extends ComponentView {
    #player;
    #idOfHeroSelected;
    #elementSelectedHero;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#idOfHeroSelected = null;
        this.#player = player;
        this.#elementSelectedHero = null;
        this.el = el;
        this.render();
    }

    getNameValidation() {
        const inputField = this.el.querySelector('[data-player-name]');
        const validationButton = this.el.querySelector('[data-confirm]');

        validationButton.disabled = true;

        inputField.addEventListener('input', () => {
            if (inputField.value !== '') {
                inputField.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
            } else { inputField.style.boxShadow = ''; }

            if ((inputField.value !== '') && this.#idOfHeroSelected !== null) {
                validationButton.disabled = false;
                validationButton.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
            } else {
                validationButton.disabled = true;
                validationButton.style.boxShadow = '';
            }
        });
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
        const confirmationButton = this.el.querySelector('[data-confirm]');
        const nameInput = this.el.querySelector('[data-player-name]');

        heroes.forEach((hero) => {
            const currentHeroAvatarURL = DotaAssetUrlManager.getHeroImageUrl(hero.id);
            const heroAvatarButton = document.createElement('button');

            heroAvatarButton.innerHTML = heroAvatarTemplate;

            const avatarImage = heroAvatarButton.querySelector('[data-hero-avatar]');

            heroAvatarButton.setAttribute('class', 'hero-avatar-button');
            avatarImage.setAttribute('src', currentHeroAvatarURL);

            heroAvatarButton.addEventListener('click', () => {
                this.#idOfHeroSelected = hero.id;
                this.showStats(hero);

                if (this.#elementSelectedHero) {
                    this.#elementSelectedHero.setAttribute('class', 'hero-avatar-button');
                }
                this.#elementSelectedHero = heroAvatarButton;
                this.#elementSelectedHero.setAttribute('class', 'hero-avatar-button-active');

                if (nameInput.value !== '') {
                    confirmationButton.disabled = false;
                    confirmationButton.style.boxShadow = '0 0 5px #00ffeab7, 0 0 25px #00ffeab7, 0 0 50px #00ffeab7, 0 0 200px #00ffeab7';
                }
            });

            heroSelector.appendChild(heroAvatarButton);
        });
    }

    getHeroConfirmation() {
        const confirmButton = this.el.querySelector('[data-confirm]');
        const nameInput = this.el.querySelector('[data-player-name]');

        confirmButton.addEventListener('click', () => {
            if (this.#idOfHeroSelected) {
                const selectedHero = heroFactory.createHero(this.#idOfHeroSelected, this.#player.events);
                confirmButton.disabled = true;
                nameInput.disabled = true;
                this.disableHeroAvatars();
                confirmButton.style.boxShadow = '';
                this.#player.setHero(selectedHero);
                this.emit('selected');
            }
        });
    }

    disableHeroAvatars() {
        const heroSelector = this.el.querySelector('[data-hero-selector]');

        Array.from(heroSelector.children).forEach((node) => {
            const currentElement = node;
            // if (node === this.#elementSelectedHero) { return; }
            currentElement.disabled = true;
        });
    }

    render() {
        this.mountElement(template);

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
