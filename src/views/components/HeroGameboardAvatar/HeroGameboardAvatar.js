/* eslint-disable max-len */
import { DotaAssetUrlManager } from '../../../services/DotaAssetUrlManager';
import { ComponentView } from '../ComponentView';
import heroGameboardAvatarTemplate from './heroGameboardAvatarTemplate.html?raw';

export class HeroGameboardAvatar extends ComponentView {
    constructor({
        player, parentView, el
    }) {
        super({ parentView, el });
        this.player = player;

        this.render();
        this.mountPlayerHeroAvatar();
    }

    mountPlayerHeroAvatar() {
        const avatarContainer = this.el;
        const avatarImage = avatarContainer.firstElementChild;
        const avatarURL = DotaAssetUrlManager.getHeroAvatarUrl(this.player.hero.id);
        const { isLeftAvatarDirection } = this.player.hero;
        const { isRadiant } = this.player;

        avatarImage.src = avatarURL;
        avatarImage.classList = `${this.player.team}-avatar hero-game-page-avatar`;
        avatarContainer.classList = `data-hero-avatar-${this.player.team} hero-game-page-avatar-elem`;

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
