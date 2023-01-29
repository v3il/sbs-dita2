import { TeamNames } from '../consts/TeamNames';

export class Player {
    name;
    hero;
    events;
    team;

    constructor({ events, team }) {
        this.events = events;
        this.team = team;
    }

    setName(name) {
        this.name = name;
    }

    get isHeroSelected() {
        return !!this.hero;
    }

    get isRadiant() {
        return this.team === TeamNames.RADIANT;
    }

    setHero(hero) {
        this.hero = hero;
        this.events.emit('heroSelected');
    }

    async useSpell(spell, target) {
        await this.hero.useSpell(spell, target);
    }

    attack(target) {
        this.hero.attack(target);
    }

    updateState() {
        this.hero.updateState();
    }
}
