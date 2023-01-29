import { BasicHero } from '../BasicHero';
import { vengefulSpiritSettings } from './vengefulSpiritSettings';
import {
    MagicMissile, VengeanceAura, NetherSwap, WaveOfTerror
} from './spells';

export class VengefulSpirit extends BasicHero {
    constructor({ events }) {
        super(vengefulSpiritSettings, events);

        this.setSpells([
            MagicMissile.create({ character: this }),
            WaveOfTerror.create({ character: this }),
            VengeanceAura.create({ character: this }),
            NetherSwap.create({ character: this })
        ]);
    }
}
