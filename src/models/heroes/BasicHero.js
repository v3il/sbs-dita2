const BASE_HIT_POINTS = 150;
const BASE_MANA_POINTS = 100;
const BASE_EVASION = 0;
const BASE_MAGIC_RESISTANCE = 0.25;

export class BasicHero {
    #id = '';
    #name = '';
    #avatarDirection = 'left';

    #spells = [];
    #effects = [];
    #attackModifiers = [];

    #strength = 0;
    #agility = 0;
    #intelligence = 0;
    #evasion = BASE_EVASION;
    #magicResistance = BASE_MAGIC_RESISTANCE;
    #armor = 0;
    #minDamage = 0;
    #maxDamage = 0;
    #hitPoints = 0;
    #maxHitPoints = 0;
    #manaPoints = 0;
    #maxManaPoints = 0;

    #isSilenced = false;

    #events; // ?

    constructor(attrs, events) {
        this.#events = events; // ?
        this.#id = attrs.id;
        this.#name = attrs.name;
        this.#avatarDirection = attrs.avatarDirection;
        this.#strength = attrs.strength;
        this.#agility = attrs.agility;
        this.#intelligence = attrs.intelligence;
        this.#minDamage = attrs.minDamage;
        this.#maxDamage = attrs.maxDamage;
        this.#armor = attrs.armor;
        this.#hitPoints = attrs.strength * 20 + BASE_HIT_POINTS;
        this.#maxHitPoints = attrs.strength * 20 + BASE_HIT_POINTS;
        this.#manaPoints = attrs.intelligence * 13 + BASE_MANA_POINTS;
        this.#maxManaPoints = attrs.intelligence * 13 + BASE_MANA_POINTS;
    }

    addEffect(effect) {
        this.#effects.push(effect);
        effect.applyEffect(this);
    }

    removeEffect(effect) {
        this.#effects = this.#effects.filter((e) => e !== effect);
        effect.removeEffect(this);
    }

    addAttackModifier(modifier) {
        this.#attackModifiers.push(modifier);
    }

    removeAttackModifier(modifier) {
        this.#attackModifiers = this.#attackModifiers.filter((mod) => mod !== modifier);
    }

    attack(target) {
        if (Math.random() < this.#evasion) { return 0; }

        let damage = this.getInitialDamage();

        this.#attackModifiers.forEach((modifier) => {
            damage = modifier.applyModifier(damage);
        });

        return target.takePhysicalDamage(damage);
    }

    async useSpell(spell, target) {
        await spell.invoke(target);
    }

    updateState() {
        this.#spells.forEach((spell) => {
            if (spell.isOnCoolDown()) { spell.decreaseCoolDown(); }
        });

        this.#effects.forEach((effect) => {
            effect.decreaseDuration();
            if (effect.isEnded()) { effect.removeEffect(this); }
        });
    }

    takePhysicalDamage(damage) {
        this.#hitPoints -= damage * (1 - this.#armor * 0.05);
    }

    takeMagicalDamage(damage) {
        this.#hitPoints -= damage * (1 - this.#magicResistance);
    }

    takePureDamage(damage) {
        this.#hitPoints -= damage;
    }

    get isLeftAvatarDirection() {
        return this.#avatarDirection === 'left';
    }

    get isDead() {
        return !this.#hitPoints > 0;
    }

    getInitialDamage() {
        return Math.random() * (this.#maxDamage - this.#minDamage) + this.#minDamage;
    }

    setSpells(spells) {
        this.#spells = spells;
    }

    increaseHitPoints(delta) {
        this.#hitPoints += delta;
    }

    decreaseHitPoints(delta) {
        this.#hitPoints -= delta;
    }

    increaseEvasion(delta) {
        this.#evasion += delta;
    }

    decreaseEvasion(delta) {
        this.#evasion -= delta;
    }
    increaseArmor(delta) {
        this.#armor += delta;
    }

    decreaseArmor(delta) {
        this.#armor -= delta;
    }

    decreaseMana(delta) {
        this.#manaPoints += delta;
    }

    setSilenced(value) {
        this.#isSilenced = value;
    }

    get events() {
        return this.#events;
    }

    get spells() {
        return this.#spells;
    }

    get isSilenced() {
        return this.#isSilenced;
    }

    get name() {
        return this.#name;
    }

    get strength() {
        return this.#strength;
    }

    get agility() {
        return this.#agility;
    }

    get intelligence() {
        return this.#intelligence;
    }

    get armor() {
        return this.#armor;
    }

    get hitPoints() {
        return this.#hitPoints;
    }

    get minDamage() {
        return this.#minDamage;
    }

    get maxDamage() {
        return this.#maxDamage;
    }

    get maxHitPoints() {
        return this.#maxHitPoints;
    }

    get manaPoints() {
        return this.#manaPoints;
    }

    get maxManaPoints() {
        return this.#maxManaPoints;
    }

    get evasion() {
        return this.#evasion;
    }

    get effects() {
        return this.#effects;
    }

    get id() {
        return this.#id;
    }
}
