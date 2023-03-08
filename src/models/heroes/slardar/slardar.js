import { BasicHero } from '../BasicHero';
import { slardarSettings } from './slardarSettings';
import {
    BashOfTheDeep, CorrosiveHaze, GuardianSprint, SlitherinCrush
} from './spells';

export class Slardar extends BasicHero {
    constructor({ events }) {
        super(slardarSettings, events);

        this.setSpells([
            BashOfTheDeep.create({ character: this }),
            CorrosiveHaze.create({ character: this }),
            GuardianSprint.create({ character: this }),
            SlitherinCrush.create({ character: this })
        ]);
    }
}
