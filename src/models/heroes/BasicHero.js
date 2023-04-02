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

    #events;

    constructor(attrs, events) {
        this.#events = events;
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

        this.events.emit('effectAdded', ({ effect }));
    }

    removeEffect(effect) {
        this.#effects = this.#effects.filter((e) => e !== effect);
        effect.removeEffect(this);

        this.events.emit('effectRemoved', ({ effect }));
    }

    addAttackModifier(modifier) {
        this.#attackModifiers.push(modifier);
    }

    removeAttackModifier(modifier) {
        this.#attackModifiers = this.#attackModifiers.filter((mod) => mod !== modifier);
    }

    attack(target) {
        if (Math.random() < target.#evasion) { return 0; }

        const targetInitialHP = target.hitPoints;
        let damage = this.getInitialDamage();

        this.#attackModifiers.forEach((modifier) => {
            damage = modifier.applyModifier(damage, target);
        });

        target.takePhysicalDamage(damage);
        this.events.emit('baseAttack', { damage: targetInitialHP - target.hitPoints });

        return damage;
    }

    async useSpell(spell, target) {
        const targetInitialHP = target.hitPoints;

        await spell.invoke(target);

        this.events.emit('spell', { spell, damage: targetInitialHP - target.hitPoints });
    }

    updateState() {
        this.#spells.forEach((spell) => {
            if (spell.isOnCooldown) {
                spell.decreaseCooldown();
            }
        });

        this.#effects.forEach((effect) => {
            effect.decreaseDuration();
            if (effect.isEnded) {
                this.removeEffect(effect);
            }
        });
    }

    takePhysicalDamage(damage) {
        this.decreaseHitPoints(damage * (1 - this.#armor * 0.05));
    }

    takeMagicalDamage(damage) {
        this.decreaseHitPoints(damage * (1 - this.#magicResistance));
    }

    takePureDamage(damage) {
        this.decreaseHitPoints(damage);
    }

    getInitialDamage() {
        return Math.random() * (this.#maxDamage - this.#minDamage) + this.#minDamage;
    }

    setSpells(spells) {
        this.#spells = spells;
    }

    increaseHitPoints(delta) {
        const hitPoints = Math.round(this.#hitPoints + delta);
        if (hitPoints > this.#maxHitPoints) {
            this.#hitPoints = this.#maxHitPoints;
        } else {
            this.#hitPoints = hitPoints;
        }

        this.events.emit('updateHPBar', { currentHP: this.#hitPoints });
    }

    decreaseHitPoints(delta) {
        const hitPoints = Math.round(this.#hitPoints - delta);
        if (hitPoints > 0) {
            this.#hitPoints = hitPoints;
        } else {
            this.#hitPoints = 0;
        }

        this.events.emit('updateHPBar', { currentHP: this.#hitPoints });
    }

    increaseEvasion(delta) {
        this.#evasion = +(this.#evasion + delta).toFixed(1);
    }

    decreaseEvasion(delta) {
        this.#evasion = +(this.#evasion - delta).toFixed(1);
    }
    increaseArmor(delta) {
        this.#armor = +(this.#armor + delta).toFixed(1);
        this.events.emit('updateStats');
    }

    decreaseArmor(delta) {
        this.#armor = +(this.#armor - delta).toFixed(1);
        this.events.emit('updateStats');
    }

    decreaseMana(delta) {
        const manaPoints = Math.round((this.#manaPoints - delta) * 10) / 10;
        if (manaPoints > 0) {
            this.#manaPoints = manaPoints;
        } else {
            this.#manaPoints = 0;
        }

        this.events.emit('updateManaBar', { currentMana: this.#manaPoints });
    }

    increaseMagicResist(delta) {
        this.#magicResistance += delta;
    }

    decraseMagicResist(delta) {
        this.#magicResistance -= delta;
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

    get isLeftAvatarDirection() {
        return this.#avatarDirection === 'left';
    }

    get isDead() {
        return this.#hitPoints <= 0;
    }

    get armor() {
        return this.#armor;
    }

    get hitPoints() {
        return Math.round(this.#hitPoints);
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
        return Math.round(this.#manaPoints);
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
