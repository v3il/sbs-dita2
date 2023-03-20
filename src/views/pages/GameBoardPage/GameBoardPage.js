import { PageView } from '../PageView';
import { HeroAction } from '../../components/HeroAction/HeroAction';
import { HeroStats } from '../../components/HeroStat/HeroStat';
import { PlayerStatusBar } from '../../components/PlayerStatusBar/PlayerStatusBar';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import template from './template.html?raw';
import { game } from '../../../models';
import { HeroGameboardAvatar } from '../../components/HeroGameboardAvatar/HeroGameboardAvatar';
import { HeroModifier } from '../../components/HeroModifier/HeroModifier';
import { Logger } from '../../components/Logger/Logger';
import './style.css';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);

        this.radiantTeam = {};
        this.direTeam = {};
        this.radiantAvatar = null;
        this.radiantHeroProgressBar = null;
        this.radiantHeroStats = null;
        this.radiantHeroAction = null;
        this.radiantPlayerStatusBar = null;
        this.radiantHeroModifier = null;
        this.direAvatar = null;
        this.direHeroProgressBar = null;
        this.direHeroStats = null;
        this.direHeroAction = null;
        this.direHeroProgressBar = null;
        this.direHeroModifier = null;
        this.logger = null;
    }

    teamsInit() {
        this.radiantTeam = {
            player: game.radiantPlayer,
            view: document.querySelector('[data-radiant-player-view]')
        };

        this.direTeam = {
            player: game.direPlayer,
            view: document.querySelector('[data-dire-player-view]')
        };

        this.radiantHeroAvatar = new HeroGameboardAvatar({
            game,
            player: this.radiantTeam.player,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-radiant-hero-avatar]')
        });

        this.diretHeroAvatar = new HeroGameboardAvatar({
            game,
            player: this.direTeam.player,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-dire-hero-avatar]')
        });

        this.radiantHeroProgressBar = new ProgressBar({
            game,
            player: game.radiantPlayer,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-progress-bar]')
        });

        this.direHeroProgressBar = new ProgressBar({
            game,
            player: game.direPlayer,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-progress-bar]')
        });

        this.radiantHeroStats = new HeroStats({
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-hero-stats]'),
            game
        });

        this.direHeroStats = new HeroStats({
            parentView: this,
            el: this.direTeam.view.querySelector('[data-hero-stats]'),
            game
        });

        this.radiantHeroAction = new HeroAction({
            game,
            gameBoard: this,
            player: game.radiantPlayer,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-hero-spells]')
        });

        this.direHeroAction = new HeroAction({
            game,
            gameBoard: this,
            player: game.direPlayer,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-hero-spells]')
        });

        this.radiantPlayerStatusBar = new PlayerStatusBar({
            game,
            player: this.radiantTeam.player,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-radiant-status-bar]')
        });

        this.direPlayerStatusBar = new PlayerStatusBar({
            game,
            player: this.direTeam.player,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-dire-status-bar]')
        });

        this.radiantHeroModifier = new HeroModifier({
            game,
            player: this.radiantTeam.player,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-hero-modifier]')
        });

        this.direHeroModifier = new HeroModifier({
            game,
            player: this.direTeam.player,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-hero-modifier]')
        });

        this.logger = new Logger({
            game,
            parentView: this,
            el: document.querySelector('[data-logger]')
        });
    }

    render(mountingEl) {
        super.render(mountingEl);
        this.teamsInit();

        this.radiantHeroStats.showStats(this.radiantTeam.player.hero);
        this.direHeroStats.showStats(this.direTeam.player.hero);
    }
}
