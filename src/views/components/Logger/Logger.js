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
        const message = this.createMessage('Game started, round 1', 'caption');
        this.loggerMessagesContainer.append(message);
    }

    initEvents() {
        this.gameStartMessage();

        this.game.events.on('roundChanged', () => {
            const message = this.createMessage(`Moving to ${this.game.round} round`, 'caption');

            this.loggerMessagesContainer.append(message);
        });

        this.game.events.on('spell', ({ player, spell, damage }) => {
            const messageContent = `${player.name} casted ${spell.name}, and dealed ${damage} damage `;
            const message = this.createMessage(messageContent);

            this.loggerMessagesContainer.append(message);
        });

        this.game.events.on('baseAttack', ({ player, damage }) => {
            const messageContent = `${player.name} used base attack, and dealed ${damage} damage `;
            const message = this.createMessage(messageContent);

            this.loggerMessagesContainer.append(message);
        });

        this.game.events.on('gameEnded', ({ winner }) => {
            const messageContent = `Game ended, the winner is ${winner.name}.`;
            const message = this.createMessage(messageContent, 'caption');

            this.loggerMessagesContainer.append(message);
        });
    }

    createMessage(text, type = null) {
        const message = document.createElement('span');
        message.textContent = text;
        if (type === 'caption') {
            message.className = 'logger-message-caption';
        } else {
            message.classList = 'logger-message';
        }
        return message;
    }

    render() {
        super.render(loggerTemplate);
    }
}
