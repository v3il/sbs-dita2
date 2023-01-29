export class BasicSpell {
    static create({ character, id }) {
        return new this({ character, id });
    }

    character = null;
    id = null;

    constructor({ character, id }) {
        this.character = character;
        this.id = id;
    }

    get isActive() {
        return false;
    }
}
