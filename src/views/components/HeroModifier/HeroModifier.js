import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroModifierTemplate from './heroModifierTemplate.html?raw';

export class HeroModifier extends ComponentView {
    constructor({
        player, parentView, el
    }) {
        super({ parentView, el });

        this.player = player;

        this.render();
        this.init();
        this.showHeroModifiers();
    }

    init() {
        this.modifiersContainer = this.el;

        this.player.events.on('effectRemoved', ({ effect }) => {
            this.removeModifierIcon(effect);
        });

        this.player.events.on('effectAdded', ({ effect }) => {
            const effectImageContainer = this.addModifierIcon(effect);

            effect.events.on('durationChanged', () => {
                effectImageContainer.style.setProperty('--duration', JSON.stringify(`${effect.currentDuration}`));
                effectImageContainer.title = `${effect.description},
effect lasts for ${effect.currentDuration} more round(s)`;
            });
        });
    }

    showHeroModifiers() {
        const modifiers = this.player.hero.effects;

        modifiers.forEach((effect) => {
            this.addModifierIcon(effect);
        });
    }

    addModifierIcon(effect) {
        const modifierImage = document.createElement('img');
        const effectImageContainer = document.createElement('div');

        modifierImage.src = DotaAssetUrlManager.getSpellUrl(effect.spellId);
        effectImageContainer.setAttribute('id', `${effect.id}`);
        effectImageContainer.classList = 'modifier-icon';

        if (effect.duration) {
            effectImageContainer.style.setProperty('--duration', JSON.stringify(`${effect.duration}`));
            effectImageContainer.title = `${effect.description},
 effect lasts for ${effect.duration} round(s)`;
        } else {
            effectImageContainer.title = `${effect.description}, effect is permanent`;
        }

        if (effect.isPositive) {
            modifierImage.classList = 'modifier-positive modifier-image';
        } else {
            modifierImage.classList = 'modifier-negative modifier-image';
        }

        effectImageContainer.append(modifierImage);
        this.modifiersContainer.append(effectImageContainer);

        return effectImageContainer;
    }

    removeModifierIcon(effect) {
        const effectIcons = Array.from(this.modifiersContainer.children);

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
