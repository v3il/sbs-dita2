import { BasicHero } from '../BasicHero';
import { clockwerkSettings } from './clockwerkSettings';
import {
    BatteryAssault, PowerCogs, RocketFlare, HookShot
} from './spells';

export class Clockwerk extends BasicHero {
    constructor({ events }) {
        super(clockwerkSettings, events);

        this.setSpells([
            BatteryAssault.create({ character: this }),
            PowerCogs.create({ character: this }),
            RocketFlare.create({ character: this }),
            HookShot.create({ character: this })
        ]);
    }
}
