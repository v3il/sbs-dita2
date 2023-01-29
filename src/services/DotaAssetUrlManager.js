export class DotaAssetUrlManager {
    static getHeroAvatarUrl(heroId) {
        return `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroId}.png`;
    }

    static getHeroImageUrl(heroId) {
        return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroId}.png`;
    }

    static getSpellUrl(spellId) {
        return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${spellId}.png`;
    }
}
