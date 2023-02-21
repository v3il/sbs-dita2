import { PageView } from '../PageView';
import { HeroAction } from '../../components/HeroAction/HeroAction';
import { HeroStats } from '../../components/HeroStat/HeroStat';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import template from './template.html?raw';
import { game } from '../../../models';
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import './style.css';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);

        this.radiantTeam = {};
        this.direTeam = {};
        this.radiantHeroProgressBar = null;
        this.direHeroProgressBar = null;
        this.radiantHeroStats = null;
        this.direHeroStats = null;
        this.radiantHeroAction = null;
        this.direHeroAction = null;
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

        this.radiantHeroProgressBar = new ProgressBar({
            player: game.radiantPlayer,
            playerBoardSide: this.radiantTeam.view,
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-progress-bar]')
        });

        this.direHeroProgressBar = new ProgressBar({
            player: game.direPlayer,
            playerBoardSide: this.direTeam.view,
            parentView: this,
            el: this.direTeam.view.querySelector('[data-progress-bar]')
        });

        this.radiantHeroStats = new HeroStats({
            parentView: this,
            el: this.radiantTeam.view.querySelector('[data-hero-stats]')
        });

        this.direHeroStats = new HeroStats({
            parentView: this,
            el: this.direTeam.view.querySelector('[data-hero-stats]')
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
    }

    mountPlayerStatusBar(teams) {
        teams.forEach(({ player, view }) => {
            const statusBarContainer = view.querySelector(`[data-${player.team}-status-bar]`);
            const nameElement = document.createElement('div');
            nameElement.classList = `data-name-${player.team}`;
            nameElement.innerHTML = `${player.name} - team ${player.team}`.toUpperCase();
            view.replaceChild(nameElement, statusBarContainer);
        });
    }

    mountPlayerHeroAvatar(teams) {
        teams.forEach(({ player, view }) => {
            const avatarContainer = view.querySelector(`[data-${player.team}-hero-avatar]`);
            const avatarURL = DotaAssetUrlManager.getHeroAvatarUrl(player.hero.id);
            const heroAvatarElement = document.createElement('div');
            const avatarPicture = document.createElement('img');

            avatarPicture.src = avatarURL;
            avatarPicture.classList = `${player.team}-avatar hero-game-page-avatar`;
            heroAvatarElement.className = `data-hero-avatar-${player.team} hero-game-page-avatar-elem`;

            if (player.hero.isLeftAvatarDirection && player.isRadiant) {
                avatarPicture.style.transform = 'scale(-1, 1)';
            }

            if (!player.hero.isLeftAvatarDirection && !player.isRadiant) {
                avatarPicture.style.transform = 'scale(-1, 1)';
            }

            heroAvatarElement.append(avatarPicture);
            view.replaceChild(heroAvatarElement, avatarContainer);
        });
    }

    render(mountingEl) {
        super.render(mountingEl);
        this.teamsInit();

        this.mountPlayerStatusBar([this.direTeam, this.radiantTeam]);
        this.mountPlayerHeroAvatar([this.direTeam, this.radiantTeam]);
        this.radiantHeroProgressBar.render();
        this.direHeroProgressBar.render();
        this.radiantHeroStats.showStats(this.radiantTeam.player.hero);
        this.direHeroStats.showStats(this.direTeam.player.hero);
        this.radiantHeroAction.showSpellSIcons();
        this.direHeroAction.showSpellSIcons();
    }
}
