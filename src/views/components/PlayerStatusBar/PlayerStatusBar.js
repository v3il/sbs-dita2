import { ComponentView } from '../ComponentView';
import playerStatusBarTemplate from './playerStatusBarTemplate.html?raw';
import { game } from '../../../models';

export class PlayerStatusBar extends ComponentView {
    constructor({
        player, parentView, el
    }) {
        super({ parentView, el });
        this.render();

        this.player = player;
        this.statusBarContainer = this.el;
        this.playerNameContainer = this.statusBarContainer.firstElementChild;
        this.playerStatusIndicator = this.playerNameContainer.nextElementSibling;

        this.showName();
        this.showStatus();
        this.handleStatusIndicator();
    }

    handleStatusIndicator() {
        game.events.on('gameEnded', ({ winner }) => {
            if (winner === this.player) {
                this.playerStatusIndicator.innerHTML = 'You won!';
                this.playerStatusIndicator.style.visibility = 'visible';
            } else {
                this.playerStatusIndicator.style.visibility = 'hidden';
            }
        });

        game.events.on('playerChanged', () => {
            if (this.playerStatusIndicator.style.visibility === 'hidden') {
                this.playerStatusIndicator.style.visibility = 'visible';
            } else {
                this.playerStatusIndicator.style.visibility = 'hidden';
            }
        });
    }

    showName() {
        const content = this.player.team === 'radiant'
            ? `${this.player.team.toUpperCase()} - ${this.player.name.toUpperCase()}`
            : `${this.player.name.toUpperCase()} - ${this.player.team.toUpperCase()}`;
        this.playerNameContainer.innerHTML = `<p>${content}</p>`;
        this.playerNameContainer.className = `player-name-${this.player.team}`;
    }

    showStatus() {
        this.playerStatusIndicator.innerHTML = 'Your turn';

        if (this.player.team === 'dire') {
            this.statusBarContainer.style.flexFlow = 'row-reverse';
            this.playerStatusIndicator.style.visibility = 'hidden';
        }
    }

    render() {
        super.render(playerStatusBarTemplate);
    }
}
