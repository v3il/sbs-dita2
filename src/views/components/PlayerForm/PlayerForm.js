import './styles.scss';
import template from './template.html?raw';
import { ComponentView } from '../ComponentView';
import { heroFactory } from '../../../services';
import { HeroStats } from '../HeroStat/HeroStat';
import { HeroSelector } from '../PlayerFormHeroAvatar/HeroSelector';
import { Decorations } from '../../../consts/Derorations';

export class PlayerForm extends ComponentView {
    #player;
    heroStatsContainer;
    heroSelectorContainer;
    inputField;
    validationButton;
    heroStats;

    constructor({ player, parentView, el }) {
        super({ parentView, el });

        this.#player = player;
        this.el = el;

        this.heroAvatar = null;
        this.heroStats = null;
        this.selectedHero = null;
        this.isHeroChosen = false;
        this.isPlayerNameInputed = true;

        this.render();
    }

    render() {
        this.mountElement(template);
        this.initPageElements();
        this.setTitle();
        this.setPlayerFormEvents();
        this.handleInputField();
        this.handleValidationButton();
    }

    initPageElements() {
        this.title = this.el.querySelector('[data-title]');
        this.inputField = this.el.querySelector('[data-player-name]');
        this.heroSelectorContainer = this.el.querySelector('[data-hero-selector]');
        this.heroStatsContainer = this.el.querySelector('[data-hero-stat]');
        this.validationButton = this.el.querySelector('[data-confirm]');

        this.heroSelector = new HeroSelector({
            playerFormContainer: this.el,
            parentView: this,
            el: this.heroSelectorContainer
        });

        this.heroStats = new HeroStats({
            parentView: this,
            el: this.heroStatsContainer
        });
    }

    setTitle() {
        this.title.innerHTML = this.#player.team.toUpperCase();
        if (this.#player.team === 'radiant') {
            this.title.className = 'player-form__title red';
        } else {
            this.title.className = 'player-form__title blue';
        }
    }

    setPlayerFormEvents() {
        this.on('chooseHero', ({ hero }) => {
            this.selectedHero = heroFactory.createHero(hero.id, this.#player.events);

            this.isHeroChosen = true;
            this.heroStats.showStats(hero);

            this.emit('setAvatarButtonState-Passive');
            this.emit(`setAvatarButtonState-Active-${hero.id}`);
            this.emit('checkValidationButtonState');
        });
    }

    handleInputField() {
        if (this.#player.team === 'radiant') {
            this.inputField.value = 'player 1';
        } else {
            this.inputField.value = 'player 2';
        }
        this.inputField.style.boxShadow = Decorations.boxShadowActive;

        this.inputField.addEventListener('input', () => {
            if (this.inputField.value !== '') {
                this.isPlayerNameInputed = true;
                this.inputField.style.boxShadow = Decorations.boxShadowActive;
            } else {
                this.isPlayerNameInputed = false;
                this.inputField.style.boxShadow = '';
            }
            this.emit('checkValidationButtonState');
        });
    }

    handleValidationButton() {
        this.disableElement(this.validationButton);

        this.on('checkValidationButtonState', () => {
            if (this.isHeroChosen && this.isPlayerNameInputed) {
                this.enableElement(this.validationButton);
            } else {
                this.disableElement(this.validationButton);
            }
        });

        this.validationButton.addEventListener('click', () => {
            this.#player.setHero(this.selectedHero);
            this.#player.setName(this.inputField.value);

            this.disableElement(this.validationButton);
            this.disableElement(this.inputField);
            this.emit('disableAllAvatarButtons');
            this.emit('selected');
        });
    }

    enableElement(elem) {
        const element = elem;

        element.disabled = false;
    }

    disableElement(elem) {
        const element = elem;

        element.disabled = true;
    }
}
