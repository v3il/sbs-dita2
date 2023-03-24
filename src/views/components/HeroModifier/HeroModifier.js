/* eslint-disable max-len */
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroModifierTemplate from './heroModifierTemplate.html?raw';

export class HeroModifier extends ComponentView {
    constructor({
        game, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });
        this.game = game;
        this.player = player;
        this.playerBoardSide = playerBoardSide;

        this.render();

        this.modifierContainer = this.playerBoardSide.querySelector('[data-hero-modifiers]');

        this.showHeroModifiers();
        this.updateHeroModifiers();
    }

    showHeroModifiers() {
        const modifiers = this.player.hero.effects;
        this.modifierContainer.innerHTML = '';

        modifiers.forEach((modifier) => {
            const modifierImage = document.createElement('img');
            modifierImage.src = DotaAssetUrlManager.getSpellUrl(modifier.spellId);

            if (modifier.isPositive) {
                modifierImage.classList = 'modifier-positive modifier-icon';
            } else {
                modifierImage.classList = 'modifier-negative modifier-icon';
            }

            modifierImage.title = `${modifier.description}`;
            this.modifierContainer.append(modifierImage);
        });
    }

    updateHeroModifiers() {
        this.game.events.on('playerChanged', () => {
            const modifiers = this.player.hero.effects;
            this.modifierContainer.innerHTML = '';

            modifiers.forEach((modifier) => {
                const modifierImage = document.createElement('img');
                modifierImage.src = DotaAssetUrlManager.getSpellUrl(modifier.spellId);

                if (modifier.isPositive) {
                    modifierImage.classList = 'modifier-positive modifier-icon';
                } else {
                    modifierImage.classList = 'modifier-negative modifier-icon';
                }

                modifierImage.title = `${modifier.description}`;
                this.modifierContainer.append(modifierImage);
            });
        });
    }

    render() {
        super.render(heroModifierTemplate);
    }
}
