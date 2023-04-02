import { HeroAction } from '../HeroAction/HeroAction';
import { HeroStats } from '../HeroStat/HeroStat';
import { PlayerStatusBar } from '../PlayerStatusBar/PlayerStatusBar';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { game } from '../../../models';
import { HeroGameboardAvatar } from '../HeroGameboardAvatar/HeroGameboardAvatar';
import { HeroModifier } from '../HeroModifier/HeroModifier';

export class PlayerGameboardSide {
    constructor({ player, parentView }) {
        this.player = player;
        this.parentView = parentView;

        this.teamName = this.player.team;
        this.playerGameboardView = document.querySelector(`[data-${this.teamName}-player-view]`);
        this.hero = this.player.hero;

        this.initTeam();
        this.heroStats.showStats(this.hero);
    }

    initTeam() {
        this.playerStatusBar = new PlayerStatusBar({
            player: this.player,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-status-bar]')
        });

        this.heroAvatar = new HeroGameboardAvatar({
            player: this.player,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-hero-avatar]')
        });

        this.heroModifier = new HeroModifier({
            player: this.player,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-hero-modifier]')
        });

        this.hpProgressBar = new ProgressBar({
            hero: this.hero,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-HP-bar]'),
            classes: [`${this.teamName}HitPointsContainer`, 'progressBar']
        });

        this.manaProgressBar = new ProgressBar({
            hero: this.hero,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-mana-bar]'),
            classes: [`${this.teamName}ManaPointsContainer`, 'progressBar']
        });

        this.heroAction = new HeroAction({
            player: this.player,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-hero-spells]')
        });

        this.heroStats = new HeroStats({
            player: this.player,
            parentView: this.parentView,
            el: this.playerGameboardView.querySelector('[data-hero-stats]')
        });
    }
}
