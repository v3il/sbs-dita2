/* eslint-disable max-len */
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroGameboardAvatarTemplate from './heroGameboardAvatarTemplate.html?raw';

export class HeroGameboardAvatar extends ComponentView {
    constructor({
        game, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });
        this.game = game;
        this.player = player;
        this.playerBoardSide = playerBoardSide;

        this.render();
        this.mountPlayerHeroAvatar();
    }

    mountPlayerHeroAvatar() {
        const avatarContainer = this.playerBoardSide.querySelector('[data-hero-avatar]');
        const avatarURL = DotaAssetUrlManager.getHeroAvatarUrl(this.player.hero.id);
        const avatarImage = avatarContainer.firstElementChild;

        avatarImage.src = avatarURL;
        avatarImage.classList = `${this.player.team}-avatar hero-game-page-avatar`;
        avatarContainer.className = `data-hero-avatar-${this.player.team} hero-game-page-avatar-elem`;

        const { isLeftAvatarDirection } = this.player.hero;
        const { isRadiant } = this.player;

        if (isLeftAvatarDirection && isRadiant) {
            avatarImage.style.transform = 'scale(-1, 1)';
        }

        if (!isLeftAvatarDirection && !isRadiant) {
            avatarImage.style.transform = 'scale(-1, 1)';
        }
    }
    render() {
        super.render(heroGameboardAvatarTemplate);
    }
}
