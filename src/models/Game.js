export class Game {
    radiantPlayer;
    direPlayer;
    events;
    round = 1;
    currentPlayer;
    gameEnded = false;

    constructor({ radiantPlayer, direPlayer, events }) {
        this.radiantPlayer = radiantPlayer;
        this.direPlayer = direPlayer;
        this.events = events;
        this.currentPlayer = radiantPlayer;
    }

    get enemyPlayer() {
        return this.currentPlayer === this.radiantPlayer ? this.direPlayer : this.radiantPlayer;
    }

    get enemyHero() {
        return this.enemyPlayer.hero;
    }

    get winner() {
        if (this.radiantPlayer.hero.isDead) {
            return this.direPlayer;
        }
        if (this.direPlayer.hero.isDead) {
            return this.radiantPlayer;
        }
        return null;
    }

    isCurrentHero(hero) {
        return this.currentPlayer.hero === hero;
    }

    isCurrentPlayer(player) {
        return this.currentPlayer === player;
    }

    moveToNextRound() {
        const isNextRound = this.currentPlayer === this.direPlayer;

        this.gameEnded = this.winner !== null;
        this.currentPlayer = this.enemyPlayer;

        if (isNextRound) {
            this.radiantPlayer.updateState();
            this.direPlayer.updateState();
            this.round += 1;
            this.events.emit('roundChanged', { currentPlayer: this.currentPlayer });
        }

        this.events.emit('playerChanged', { currentPlayer: this.currentPlayer });
        // тріггер треба для перерахунку доступності кнопок(кд, сайленс), потом подумаю про назву
        this.events.emit('trigger');

        if (this.gameEnded) {
            this.events.emit('gameEnded', { winner: this.winner });
        }
    }

    async triggerSpell(spell) {
        if (spell.isActive) {
            await this.currentPlayer.useSpell(spell, this.enemyHero);
        } else {
            spell.applyEffect();
        }
    }

    triggerAttack() {
        this.currentPlayer.attack(this.enemyHero);
    }
}
