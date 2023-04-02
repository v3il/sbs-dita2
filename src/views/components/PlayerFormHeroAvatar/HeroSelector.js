import { ComponentView } from '../ComponentView';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { heroFactory } from '../../../services';
import heroAvatarButtonTemplate from './heroAvatarButtonTemplate.html?raw';
import heroSelectorContainerTemplate from './heroSelectorContainerTemplate.html?raw';

export class HeroSelector extends ComponentView {
    constructor({ playerFormContainer, parentView, el }) {
        super({ parentView, el });

        this.playerForm = parentView;
        this.playerFormContainer = playerFormContainer;
        this.avatarButtonsContainer = null;

        this.render();
        this.init();
        this.renderHeroIcons();
    }

    init() {
        this.avatarButtonsContainer = this.playerFormContainer.querySelector('[data-hero-selector]');
    }

    renderHeroIcons() {
        const heroes = heroFactory.availableHeroes;

        heroes.forEach((hero) => {
            const currentHeroAvatarURL = DotaAssetUrlManager.getHeroImageUrl(hero.id);
            const heroAvatarButton = document.createElement('button');

            heroAvatarButton.innerHTML = heroAvatarButtonTemplate;
            this.setButtonPassive(heroAvatarButton);

            const avatarImage = heroAvatarButton.querySelector('[data-hero-avatar]');

            avatarImage.src = currentHeroAvatarURL;

            heroAvatarButton.addEventListener('click', () => {
                this.playerForm.emit('chooseHero', { hero });
            });

            this.playerForm.on('disableAllAvatarButtons', () => this.disableButton(heroAvatarButton));
            this.playerForm.on('setAvatarButtonState-Passive', () => this.setButtonPassive(heroAvatarButton));
            this.playerForm.on(`setAvatarButtonState-Active-${hero.id}`, () => this.setButtonActive(heroAvatarButton));

            this.avatarButtonsContainer.appendChild(heroAvatarButton);
        });
    }

    setButtonPassive(button) {
        const buttonElem = button;

        buttonElem.className = 'hero-avatar-button';
    }

    setButtonActive(button) {
        const buttonElem = button;

        buttonElem.className = 'hero-avatar-button-active';
    }

    disableButton(button) {
        const buttonElem = button;

        buttonElem.disabled = true;
    }

    render() {
        super.render(heroSelectorContainerTemplate);
    }
}
