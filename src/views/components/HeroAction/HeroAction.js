/* eslint-disable max-len */
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroActionTemplate from './heroActionTemplate.html?raw';

export class HeroAction extends ComponentView {
    constructor({
        game, gameBoard, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });
        this.game = game;
        this.gameBoard = gameBoard;
        this.player = player;
        this.playerBoardSide = playerBoardSide;
        this.hero = player.hero;
        this.heroSpells = player.hero.spells;

        this.spellsContainer = null;
        this.spellButtonList = null;
        this.attackButton = null;
        this.activeElements = null;

        this.render();
        this.initElements();
        this.initSpellsEvents();
        this.setSpellsAction();
    }

    initSpellsEvents() {
        Array.from(this.spellButtonList).forEach((button, index) => {
            this.game.events.on(`${this.player.team}_${index}_spell_apply`, ({ target, spell }) => {
                if (Object.getPrototypeOf(Object.getPrototypeOf(spell)).constructor.name === 'ActiveSpell') {
                    spell.invoke(target);
                    this.gameBoard.radiantHeroProgressBar.updateProgressBars();
                    this.gameBoard.direHeroProgressBar.updateProgressBars();
                } else {
                    spell.applyEffect();
                    this.gameBoard.radiantHeroProgressBar.updateProgressBars();
                    this.gameBoard.direHeroProgressBar.updateProgressBars();
                }
            });
        });
        this.game.events.on(`${this.player.team}_base_attack`, ({ hero, target }) => {
            hero.attack(target);
            this.gameBoard.radiantHeroProgressBar.updateProgressBars();
            this.gameBoard.direHeroProgressBar.updateProgressBars();
        });
    }

    setSpellsAction() {
        Array.from(this.spellButtonList).forEach((button, index) => {
            button.addEventListener('click', () => {
                this.game.events.emit(`${this.player.team}_${index}_spell_apply`, {
                    // hero: this.hero,
                    target: this.game.enemyHero,
                    spell: this.heroSpells[index]
                });
            });
        });
        this.attackButton.addEventListener('click', () => {
            this.game.events.emit(`${this.player.team}_base_attack`, { hero: this.hero, target: this.game.enemyHero });
        });
    }

    initElements() {
        this.spellsContainer = this.playerBoardSide.querySelector('[data-hero-spells-container]');
        this.spellButtonList = this.playerBoardSide.querySelectorAll('#spell');
        this.attackButton = this.spellsContainer.lastElementChild;
    }

    showSpellSIcons() {
        Array.from(this.spellButtonList).forEach((button, index) => {
            const image = button.firstElementChild;
            image.src = DotaAssetUrlManager.getSpellUrl(this.heroSpells[index].id);
        });
        this.attackButton.firstElementChild.src = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_damage.png';
    }

    render() {
        super.render(heroActionTemplate);
    }
}
