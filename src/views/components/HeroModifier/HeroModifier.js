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
        this.init();
        this.showHeroModifiers();
    }

    init() {
        this.modifierContainer = this.playerBoardSide.querySelector('[data-hero-modifiers]');

        this.player.events.on('removeEffectIcon', ({ effect }) => {
            this.removeEffectIcon(effect);
        });

        this.player.events.on('addEffectIcon', ({ effect }) => {
            this.addEffectIcon(effect);
        });
    }

    showHeroModifiers() {
        const modifiers = this.player.hero.effects;

        modifiers.forEach((effect) => {
            this.addEffectIcon(effect);
        });
    }

    addEffectIcon(effect) {
        const modifierImage = document.createElement('img');

        modifierImage.src = DotaAssetUrlManager.getSpellUrl(effect.spellId);
        modifierImage.setAttribute('id', `${effect.id}`);

        if (effect.isPositive) {
            modifierImage.classList = 'modifier-positive modifier-icon';
        } else {
            modifierImage.classList = 'modifier-negative modifier-icon';
        }

        modifierImage.title = `${effect.description}`;
        this.modifierContainer.append(modifierImage);
    }

    removeEffectIcon(effect) {
        const effectIcons = Array.from(this.modifierContainer.children);

        effectIcons.forEach((effectIcon) => {
            if (+effectIcon.id === effect.id) {
                effectIcon.remove();
            }
        });
    }

    render() {
        super.render(heroModifierTemplate);
    }
}
