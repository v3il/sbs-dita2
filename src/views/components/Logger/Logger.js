import { ComponentView } from '../ComponentView';
import loggerTemplate from './loggerTemplate.html?raw';

export class Logger extends ComponentView {
    constructor({ game, parentView, el }) {
        super({ parentView, el });

        this.render();
        this.game = game;
        this.loggerContainer = null;
        this.loggerMessagesContainer = null;
        this.initElements();
        this.initEvents();
    }

    initElements() {
        this.loggerContainer = document.querySelector('[data-logger]');
        this.loggerMessagesContainer = document.querySelector('[data-log-messages-container]');
    }

    gameStartMessage() {
        this.createMessage('Game started, round 1', 'round');
        this.createMessage(`    ${this.game.radiantPlayer.name}'s turn.`, 'caption');
    }

    initEvents() {
        this.gameStartMessage();

        this.game.events.on('roundChanged', () => {
            this.createMessage(`${this.game.round} round`, 'round');
        });

        this.game.events.on('spell', ({
            currentPlayer,
            enemyPlayer,
            spell,
            damage,
            effectsBeforeSpell
        }) => {
            const enemyHasNewEffect = effectsBeforeSpell.enemy !== enemyPlayer.hero.effects.length;
            const currentHeroHasNewEffect = effectsBeforeSpell.currentHero !== currentPlayer.hero.effects.length;
            let messageContent = `    ${currentPlayer.name} casted ${spell.name}`;

            if (damage !== 0) {
                messageContent += `, and dealed ${damage} damage `;
            }

            if (enemyHasNewEffect) {
                const effect = enemyPlayer.hero.effects.at(-1);
                messageContent += `\n${enemyPlayer.name} gets new negative effect for ${effect.duration} rounds`;
                messageContent += `, ${effect.description.toLowerCase()}`;
            }

            if (currentHeroHasNewEffect) {
                const effect = currentPlayer.hero.effects.at(-1);
                messageContent += `\n${currentPlayer.name} gets new positive effect for ${effect.duration} rounds`;
                messageContent += `, ${effect.description.toLowerCase()}`;
            }

            this.createMessage(messageContent);
        });

        this.game.events.on('baseAttack', ({ player, damage }) => {
            const messageContent = `    ${player.name} used base attack, and dealed ${damage} damage `;
            this.createMessage(messageContent);
        });

        this.game.events.on('gameEnded', ({ winner }) => {
            const messageContent = `Game ended, the winner is ${winner.name}.`;
            this.createMessage(messageContent, 'round');
        });

        this.game.events.on('playerChanged', ({ currentPlayer }) => {
            const messageContent = `  ${currentPlayer.name}'s turn.`;
            this.createMessage(messageContent, 'caption');
        });
    }

    createMessage(text, type = null) {
        const message = document.createElement('p');
        message.textContent = text;
        switch (type) {
        case 'caption': message.className = 'logger-message-caption';
            break;
        case 'round': message.className = 'logger-message-round';
            break;
        default: message.classList = 'logger-message';
            break;
        }

        this.loggerMessagesContainer.append(message);
        message.scrollIntoView();
    }

    render() {
        super.render(loggerTemplate);
    }
}
