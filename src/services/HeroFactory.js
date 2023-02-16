import { vengefulSpiritSettings, VengefulSpirit } from '../models/heroes/vengefulSpirit';
import { slardarSettings } from '../models/heroes/slardar';
import { clockwerkSettings } from '../models/heroes/clockwerk';
import { antiMageSettings } from '../models/heroes/antiMage';
import { phantomAssassinSettings } from '../models/heroes/phantomAssasin';

export class HeroFactory {
    //                                          //todo
    get availableHeroes() {
        return [
            vengefulSpiritSettings,
            slardarSettings,
            clockwerkSettings,
            antiMageSettings,
            phantomAssassinSettings
        ];
    }

    //                                          //todo
    createHero(heroId, events) {
        switch (heroId) {
        case 'vengefulspirit': return new VengefulSpirit(events);
        // case 'slardar': return new Slardar();
        // case 'clockwerk': return new Clockwerk();
        // case 'antimage': return new AntiMage();
        // case 'phantomasassin': return new PhantomAssasin();
        default: return null;
        }
    }
}
