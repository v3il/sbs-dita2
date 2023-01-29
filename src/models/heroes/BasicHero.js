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

    // todo
    // Потрібно засетити відповідні параметри в поля класу
    // Наступні поля вираховуються по-особливому:
    // - hitPoints, maxHitPoints = strength * 20 + BASE_HP
    // - manaPoints, maxManaPoints = intelligence * 13 + BASE_MP
    constructor(attrs, events) {
        console.log(attrs, events);
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

    // todo
    // Дозволяє "вдарити з руки" target
    // Має шанс промаху, який залежить від параметру evasion у target'а: 0,01 evasion = 1% шансу промаху
    // За основу береться базовий дамаг героя (getInitialDamage), потім пропускається через всі модифікатори атаки,
    // (attackModifiers) щоб отримати фінальний дамаг
    // Тип дамагу - фізичний
    attack(target) {}

    async useSpell(spell, target) {
        await spell.invoke(target);
    }

    // todo
    // Метод, який дозволяє оновити стан героя на початку його ходу
    // - Потрібно оновити кулдаун активних спелів, які зараз на кд
    // - Потрібно оновити тривалість активних ефектів і видалити ті, що закінчились
    // Використовуй відповідні поля/методи класів ActiveSpell/Effect
    updateState() {}

    // todo
    // Метод, який дозволяє обрахувати і нанести фіз. дамаг цьому герою
    // Фізичний дамаг, ріжеться параметром armor
    // 1 armor === -5% дамага
    takePhysicalDamage(damage) {}

    // todo
    // Метод, який дозволяє обрахувати і нанести маг. дамаг цьому герою
    // Магічний дамаг, ріжеться параметром magicResistance
    // 0,01MR === -1% дамага
    takeMagicalDamage(damage) {}

    // todo
    // Метод, який дозволяє обрахувати і нанести чистий дамаг цьому герою
    // Чистий дамаг, не ріжеться нічим
    takePureDamage(damage) {}

    get isLeftAvatarDirection() {
        return this.#avatarDirection === 'left';
    }

    // todo
    // Потрібно зробити перевірку, чи живий герой чи ні
    get isDead() {
        return false;
    }

    // todo
    // Треба зробити обрахунок базового дамагу з руки (число в діапазоні [minDamage, maxDamage])
    getInitialDamage() {
        return 0;
    }

    setSpells(spells) {
        this.#spells = spells;
    }

    // todo
    increaseHitPoints(delta) {}

    // todo
    decreaseHitPoints(delta) {}

    // todo
    increaseEvasion(delta) {}

    // todo
    decreaseEvasion(delta) {}

    // todo
    increaseArmor(delta) {}

    // todo
    decreaseArmor(delta) {}

    // todo
    decreaseMana(delta) {}

    // todo
    setSilenced(value) {}

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
