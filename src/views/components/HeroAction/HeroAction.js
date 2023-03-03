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

        this.spellsContainer = null;
        this.spellButtonList = null;
        this.attackButton = null;

        this.render();
        this.initElements();
        this.initSpellsEvents();
        this.setSpellsAction();
        this.showManaCost();
        this.updateSpellCooldown();
    }

    render() {
        super.render(heroActionTemplate);
    }

    initElements() {
        this.spellsContainer = this.playerBoardSide.querySelector('[data-hero-spells-container]');
        this.attackButton = this.spellsContainer.lastElementChild;
        this.spellButtonList = Array.from(this.playerBoardSide.querySelectorAll('#spell'));
    }

    initSpellsEvents() {
        this.spellButtonList.forEach((button, index) => {
            if (this.heroSpells[index].isActive) {
                this.game.events.on('roundChanged', () => {
                    this.heroSpells[index].decreaseCooldown();
                });
            }

            this.game.events.on(`${this.player.team}_${index}_spell_apply`, ({ spell }) => {
                if (spell.hasEnoughMana || !spell.isActive) {
                    this.game.triggerSpell(spell);

                    this.game.events.emit('update_progress_bars');
                }
            });
        });
        this.game.events.on(`${this.player.team}_base_attack`, () => {
            this.game.triggerAttack();
            this.game.events.emit('update_progress_bars');
        });
    }

    setSpellsAction() {
        this.spellButtonList.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.game.events.emit(`${this.player.team}_${index}_spell_apply`, {
                    spell: this.heroSpells[index]
                });
            });
        });
        this.attackButton.addEventListener('click', () => {
            this.game.events.emit(`${this.player.team}_base_attack`);
        });
    }

    showManaCost() {
        this.spellButtonList.forEach((button, index) => {
            if (this.heroSpells[index].isActive) {
                const manacostIndicator = document.createElement('div');

                manacostIndicator.className = 'manacost-indicator';
                manacostIndicator.innerText = this.heroSpells[index].manacost;
                button.append(manacostIndicator);
            }
        });
    }

    updateSpellCooldown() {
        this.game.events.on('trigger', () => {
            this.spellButtonList.forEach((button, index) => {
                const spell = this.heroSpells[index];
                const cooldownCounter = button.querySelector('[data-cooldown]');

                if (spell.isActive && spell.isOnCooldown) {
                    cooldownCounter.style.zIndex = '2';
                    cooldownCounter.textContent = spell.currentCooldown;
                } else {
                    cooldownCounter.style.zIndex = '-1';
                }
            });
        });
    }

    showSpellsIcons() {
        Array.from(this.spellButtonList).forEach((button, index) => {
            const image = button.firstElementChild;
            const spell = this.heroSpells[index];

            image.src = DotaAssetUrlManager.getSpellUrl(spell.id);
            image.setAttribute('title', `${spell.description}`);
        });
        this.attackButton.firstElementChild.src = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_damage.png';
    }
}
