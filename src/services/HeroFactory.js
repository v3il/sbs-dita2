import { vengefulSpiritSettings, VengefulSpirit } from '../models/heroes/vengefulSpirit';
import { slardarSettings, Slardar } from '../models/heroes/slardar';
import { clockwerkSettings, Clockwerk } from '../models/heroes/clockwerk';
import { antiMageSettings, AntiMage } from '../models/heroes/antiMage';
import { phantomAssassinSettings, PhantomAssasin } from '../models/heroes/phantomAssasin';
import { HeroIds } from '../consts/HeroIds';

export class HeroFactory {
    get availableHeroes() {
        return [
            vengefulSpiritSettings,
            slardarSettings,
            clockwerkSettings,
            antiMageSettings,
            phantomAssassinSettings
        ];
    }

    createHero(heroId, events) {
        switch (heroId) {
        case HeroIds.VENGEFUL_SPIRIT: return new VengefulSpirit({ events });
        case HeroIds.SLARDAR: return new Slardar({ events });
        case HeroIds.CLOCKWERK: return new Clockwerk({ events });
        case HeroIds.ANTI_MAGE: return new AntiMage({ events });
        case HeroIds.PHANTOM_ASSASIN: return new PhantomAssasin({ events });
        default: console.log('nohero'); return null;
        }
    }
}
