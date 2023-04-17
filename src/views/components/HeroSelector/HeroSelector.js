import { ComponentView } from '../ComponentView';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { heroFactory } from '../../../services';
import heroAvatarButtonTemplate from './heroAvatarButtonTemplate.html?raw';
import heroSelectorContainerTemplate from './heroSelectorContainerTemplate.html?raw';

export class HeroSelector extends ComponentView {
    constructor({ parentView, el }) {
        super({ parentView, el });

        this.playerForm = parentView;

        this.render();
        this.renderHeroIcons();
        this.handleHeroChoose();
        this.handleButtonsState();
    }

    render() {
        super.render(heroSelectorContainerTemplate);
    }

    renderHeroIcons() {
        const heroes = heroFactory.availableHeroes;

        heroes.forEach((hero) => {
            const avatarElement = this.createAvatar(hero);

            this.el.appendChild(avatarElement);
        });
    }

    createAvatar(hero) {
        const currentHeroAvatarURL = DotaAssetUrlManager.getHeroImageUrl(hero.id);
        const heroAvatarButton = document.createElement('button');

        heroAvatarButton.innerHTML = heroAvatarButtonTemplate;

        const avatarImage = heroAvatarButton.firstElementChild;

        avatarImage.dataset.heroId = hero.id;
        avatarImage.src = currentHeroAvatarURL;

        return heroAvatarButton;
    }

    handleHeroChoose() {
        this.el.addEventListener('click', (event) => {
            if (event.target.nodeName !== 'IMG') return;

            this.playerForm.emit('chooseHero', { heroId: event.target.dataset.heroId });
        });
    }

    handleButtonsState() {
        this.playerForm.on('handleButtonsState', ({ state, heroId = null }) => {
            if (state === 'active') {
                const avatarToSelect = this.el.querySelector(`[data-hero-id=${heroId}]`);
                const selectedAvatar = this.el.querySelector('.hero-avatar-button-active');

                if (selectedAvatar) this.setPassive(selectedAvatar);
                this.setActive(avatarToSelect);
            }

            if (state === 'disable') {
                this.el.querySelectorAll('button').forEach((button) => this.disable(button));
            }
        });
    }

    setPassive(button) {
        button.classList.remove('hero-avatar-button-active');
    }

    setActive(button) {
        button.classList.add('hero-avatar-button-active');
    }

    disable(button) {
        const buttonElem = button;

        buttonElem.disabled = true;
    }
}
