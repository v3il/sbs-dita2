import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import { game } from '../../../models';
import heroActionTemplate from './heroActionTemplate.html?raw';

export class HeroAction extends ComponentView {
    constructor({
        player, parentView, el
    }) {
        super({ parentView, el });
        this.player = player;
        this.hero = player.hero;
        this.heroSpells = player.hero.spells;

        this.buttonsContainer = null;
        this.spellButtonList = null;
        this.attackButton = null;
        this.enemyPlayer = null;
        this.areButtonsEnabled = this.player.team !== 'radiant';

        this.render();
        this.initElements();
        this.setButtonElement();
        this.handleButtonsState();
    }

    render() {
        super.render(heroActionTemplate);
    }

    initElements() {
        this.buttonsContainer = this.el;
        this.attackButton = this.buttonsContainer.lastElementChild;
        this.spellButtonList = Array.from(this.buttonsContainer.querySelectorAll('#spell'));
        this.enemyPlayer = this.player.team === 'dire' ? game.radiantPlayer : game.direPlayer;
    }

    setButtonElement() {
        this.spellButtonList.forEach((button, index) => {
            const spell = this.heroSpells[index];

            this.showSpellIcon(button, spell);
            this.showManaCost(button, spell);

            game.events.on('playerChanged', () => {
                this.updateSpellCooldown(button, spell);
            });

            button.addEventListener('click', async () => {
                if (spell.hasEnoughMana || !spell.isActive) {
                    await game.triggerSpell(spell);
                }
            });
        });

        this.attackButton.firstElementChild.src = DotaAssetUrlManager.getAttackIconUrl();
        this.attackButton.addEventListener('click', () => {
            game.triggerAttack();
        });
    }

    updateSpellCooldown(button, spell) {
        const cooldownCounter = button.querySelector('[data-cooldown]');

        if (spell.isActive && spell.isOnCooldown) {
            cooldownCounter.style.zIndex = '2';
            cooldownCounter.textContent = spell.currentCooldown;
        } else {
            cooldownCounter.style.zIndex = '-1';
        }
    }

    showManaCost(button, spell) {
        if (spell.isActive) {
            const manacostIndicator = document.createElement('div');

            manacostIndicator.className = 'manacost-indicator';
            manacostIndicator.innerText = spell.manacost;
            button.append(manacostIndicator);
        }
    }

    showSpellIcon(button, spell) {
        const image = button.firstElementChild;

        image.src = DotaAssetUrlManager.getSpellUrl(spell.id);
        image.title = `${spell.description}`;
    }

    handleButtonsState() {
        this.switchButtonsState();

        game.events.on('playerChanged', () => {
            this.switchButtonsState();
        });

        game.events.on('gameEnded', () => {
            this.areButtonsEnabled = true;
            this.switchButtonsState();
        });
    }

    switchButtonsState() {
        const actionButtons = Array.from(this.buttonsContainer.children);

        actionButtons.forEach((element, index) => {
            const button = element;

            if (this.areButtonsEnabled) {
                button.disabled = true;
            } else {
                const spell = this.hero.spells[index];
                const isAttackButton = button === this.attackButton;
                const spellCanBeActivated = !spell?.isOnCooldown && spell?.isActive
                && !this.hero.isSilenced && spell?.hasEnoughMana;

                if (isAttackButton || spellCanBeActivated) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            }
        });
        this.areButtonsEnabled = this.areButtonsEnabled !== true;
    }
}
