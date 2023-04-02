/* eslint-disable no-param-reassign */
import { ComponentView } from '../ComponentView';
import loggerTemplate from './loggerTemplate.html?raw';
import { game } from '../../../models';

export class Logger extends ComponentView {
    constructor({
        radiantPlayer,
        direPlayer,
        parentView,
        el
    }) {
        super({ parentView, el });
        this.radiantPlayer = radiantPlayer;
        this.direPlayer = direPlayer;

        this.render();

        this.loggerContainer = this.el;
        this.loggerMessagesContainer = this.el.querySelector('[data-log-messages-container]');

        this.radiant = {
            player: this.radiantPlayer,
            hasNewEffect: false,
            effect: null
        };
        this.dire = {
            player: this.direPlayer,
            hasNewEffect: false,
            effect: null
        };

        this.initEvents();
    }

    gameStartMessage() {
        this.createMessage('Game started, round 1', 'newRound');
        this.createMessage(`  ${game.radiantPlayer.name}'s turn.`, 'caption');
    }

    initEvents() {
        this.gameStartMessage();

        this.radiantPlayer.events.on('effectAdded', ({ effect }) => {
            this.radiant.hasNewEffect = true;
            this.radiant.effect = effect;
        });

        this.direPlayer.events.on('effectAdded', ({ effect }) => {
            this.dire.hasNewEffect = true;
            this.dire.effect = effect;
        });

        game.events.on('roundChanged', () => {
            this.createMessage(`${game.round} round`, 'newRound');
        });

        this.radiantPlayer.events.on('spell', ({ spell, damage }) => {
            const messageContent = this.createSpellLogContent(this.dire, this.radiant, spell, damage);

            this.createMessage(messageContent);
        });

        this.direPlayer.events.on('spell', ({ spell, damage }) => {
            const messageContent = this.createSpellLogContent(this.radiant, this.dire, spell, damage);

            this.createMessage(messageContent);
        });

        this.radiantPlayer.events.on('baseAttack', ({ damage }) => {
            const messageContent = `    ${this.radiantPlayer.name} used base attack, and dealed ${damage} damage `;
            this.createMessage(messageContent);
        });

        this.direPlayer.events.on('baseAttack', ({ damage }) => {
            const messageContent = `    ${this.direPlayer.name} used base attack, and dealed ${damage} damage `;
            this.createMessage(messageContent);
        });

        game.events.on('gameEnded', ({ winner }) => {
            const messageContent = `Game ended, the winner is ${winner.name}.`;
            this.createMessage(messageContent, 'newRound');
        });

        game.events.on('playerChanged', ({ currentPlayer }) => {
            const messageContent = `  ${currentPlayer.name}'s turn.`;
            this.createMessage(messageContent, 'caption');
        });
    }

    createSpellLogContent(target, attaker, spell, damage) {
        let messageContent = `    ${attaker.player.name} casted ${spell.name}`;

        if (damage !== 0) {
            messageContent += `, and dealed ${damage} damage `;
        }

        if (target.hasNewEffect) {
            messageContent += `\n${target.player.name} gets new negative effect for ${target.effect.duration} rounds`;
            messageContent += `, ${target.effect.description.toLowerCase()}`;
            target.hasNewEffect = false;
        }

        if (attaker.hasNewEffect) {
            messageContent += `\n${attaker.player.name} gets new positive effect for ${attaker.effect.duration} rounds`;
            messageContent += `, ${attaker.effect.description.toLowerCase()}`;
            attaker.hasNewEffect = false;
        }

        return messageContent;
    }

    createMessage(text, type = null) {
        const message = document.createElement('p');
        message.textContent = text;
        switch (type) {
        case 'caption': message.className = 'logger-message-caption';
            break;
        case 'newRound': message.className = 'logger-message-round';
            break;
        default: message.classList = 'logger-message';
            break;
        }

        this.loggerMessagesContainer.append(message);
        message.scrollIntoView();
    }

    render() {
        super.render(loggerTemplate); //    test
    }
}
