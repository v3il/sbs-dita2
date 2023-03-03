export class ActivePlayerControl {
    constructor({
        game, radiantView, direView
    }) {
        this.game = game;
        this.radiantView = radiantView;
        this.direView = direView;
        this.radiantHeroSpellsContainer = radiantView.querySelector('[data-hero-spells-container]');
        this.direHeroSpellsContainer = direView.querySelector('[data-hero-spells-container]');
        this.init();
    }

    init() {
        this.switchButtonsState(this.radiantHeroSpellsContainer, this.game.radiantPlayer, 1);
        this.switchButtonsState(this.direHeroSpellsContainer, this.game.direPlayer, 0);

        this.game.events.on('trigger', () => {
            if (this.game.enemyPlayer.team === 'dire') {
                this.switchButtonsState(this.radiantHeroSpellsContainer, this.game.radiantPlayer, 1);
                this.switchButtonsState(this.direHeroSpellsContainer, this.game.direPlayer, 0);
            } else {
                this.switchButtonsState(this.radiantHeroSpellsContainer, this.game.radiantPlayer, 0);
                this.switchButtonsState(this.direHeroSpellsContainer, this.game.direPlayer, 1);
            }
        });

        this.game.events.on('gameEnded', () => {
            this.switchButtonsState(this.radiantHeroSpellsContainer, this.game.radiantPlayer, 0);
            this.switchButtonsState(this.direHeroSpellsContainer, this.game.direPlayer, 0);
        });
    }

    switchButtonsState(container, player, state) {
        const spellButtons = Array.from(container.children);

        if (state) {
            spellButtons.forEach((element, index) => {
                const button = element;
                const spell = player.hero.spells[index];
                const isAttackButton = index === spellButtons.length - 1;

                if (isAttackButton || (!spell.isOnCooldown && spell.isActive && !player.hero.isSilenced)) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                }
            });
        } else {
            spellButtons.forEach((element) => {
                const button = element;

                button.disabled = true;
            });
        }
    }
}
