import { BasicHero } from '../BasicHero';
import { antiMageSettings } from './antiMageSettings';
import {
    ManaBreak, Blink, Counterspell, ManaVoid
} from './spells';

export class AntiMage extends BasicHero {
    constructor({ events }) {
        super(antiMageSettings, events);

        this.setSpells([
            ManaBreak.create({ character: this }),
            Blink.create({ character: this }),
            Counterspell.create({ character: this }),
            ManaVoid.create({ character: this })
        ]);
    }
}
