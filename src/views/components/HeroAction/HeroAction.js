/* eslint-disable max-len */
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroActionTemplate from './heroActionTemplate.html?raw';

export class HeroAction extends ComponentView {
    constructor({
        game, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });
        this.game = game;
        this.player = player;
        this.playerBoardSide = playerBoardSide;
        this.hero = player.hero;
        this.heroSpells = player.hero.spells;

        this.buttonsContainer = null;
        this.spellButtonList = null;
        this.attackButton = null;
        this.enemyHero = null;
        this.areButtonsEnabled = true;

        this.render();
        this.initElements();
        this.setButtonElement();
        this.handleButtonsState();
    }

    render() {
        super.render(heroActionTemplate);
    }

    initElements() {
        this.buttonsContainer = this.playerBoardSide.querySelector('[data-hero-spells-container]');
        this.attackButton = this.buttonsContainer.lastElementChild;
        this.spellButtonList = Array.from(this.playerBoardSide.querySelectorAll('#spell'));
        this.enemyHero = this.player.team === 'dire' ? this.game.radiantPlayer.hero : this.game.direPlayer.hero;
    }

    setButtonElement() {
        this.spellButtonList.forEach((button, index) => {
            const spell = this.heroSpells[index];

            this.showSpellIcon(button, spell);
            this.showManaCost(button, spell);
            this.addGameEvents(button, spell);

            button.addEventListener('click', async () => {
                await this.triggerSpell(spell, button);
            });
        });

        this.attackButton.firstElementChild.src = DotaAssetUrlManager.getAttackIconUrl();
        this.attackButton.addEventListener('click', () => {
            this.triggerBaseAttack();
        });
    }

    addGameEvents(button, spell) {
        if (spell.isActive) {
            this.game.events.on('roundChanged', () => {
                spell.decreaseCooldown();
            });
        }
        this.game.events.on('playerChanged', () => {
            this.updateSpellCooldown(button, spell);
        });
    }

    triggerBaseAttack() {
        const enemyCurrentHP = this.enemyHero.hitPoints;

        this.game.triggerAttack();

        this.game.events.emit('baseAttack', {
            player: this.player,
            damage: enemyCurrentHP - this.enemyHero.hitPoints
        });

        this.game.moveToNextRound();
        this.game.events.emit('update_progress_bars');
    }

    async triggerSpell(spell, button) {
        if (spell.hasEnoughMana || !spell.isActive) {
            const enemyCurrentHP = this.enemyHero.hitPoints;

            await this.game.triggerSpell(spell);

            this.game.events.emit('spell', {
                player: this.player,
                spell,
                damage: enemyCurrentHP - this.enemyHero.hitPoints
            });

            this.game.moveToNextRound();
            this.updateSpellCooldown(button, spell);
            this.game.events.emit('update_progress_bars');
        }
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
        image.setAttribute('title', `${spell.description}`);
    }

    handleButtonsState() {
        if (this.player.team === 'dire') {
            this.switchButtonsState();
        }

        this.game.events.on('playerChanged', () => {
            this.switchButtonsState();
        });

        this.game.events.on('gameEnded', () => {
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
                const spellCanBeActivated = !spell?.isOnCooldown && spell?.isActive && !this.hero.isSilenced && spell?.hasEnoughMana;

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
