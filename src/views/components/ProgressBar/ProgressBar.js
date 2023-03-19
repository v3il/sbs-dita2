import progressBarTempalate from './progressBarTempalate.html?raw';
import { ComponentView } from '../ComponentView';

export class ProgressBar extends ComponentView {
    constructor({
        game, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });

        this.playerBoardSide = playerBoardSide;
        this.player = player;
        this.game = game;

        this.manaBar = null;
        this.hpBar = null;
        this.manaValue = null;
        this.hpValue = null;
        this.render();
    }

    updateProgressBars() {
        const maxHP = this.player.hero.maxHitPoints;
        const currHP = this.player.hero.hitPoints;
        const maxMP = this.player.hero.maxManaPoints;
        const currMP = this.player.hero.manaPoints;
        const relativeMP = Math.round((currMP / maxMP) * 100);
        const relativeHP = Math.round((currHP / maxHP) * 100);

        this.manaBar.style.setProperty('--width', `${relativeMP}%`);
        this.hpBar.style.setProperty('--width', `${relativeHP}%`);

        this.manaValue.textContent = `${currMP}/${maxMP}`;
        this.hpValue.textContent = `${currHP}/${maxHP}`;
    }

    init() {
        this.manaBar = this.playerBoardSide.querySelector('[data-mana-bar]');
        this.manaValue = this.manaBar.firstChild;
        this.manaBar.className = `${this.player.team}ManaPointsContainer progressBar`;

        this.hpBar = this.playerBoardSide.querySelector('[data-hp-bar]');
        this.hpValue = this.hpBar.firstChild;
        this.hpBar.className = `${this.player.team}HitPointsContainer progressBar`;

        this.game.events.on('playerChanged', () => {
            this.updateProgressBars();
        });
        this.player.events.on('update', () => {
            this.updateProgressBars();
        });
    }

    render() {
        super.render(progressBarTempalate);
        this.init();
        this.updateProgressBars();
    }
}
