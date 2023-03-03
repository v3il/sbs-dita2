import { ComponentView } from '../ComponentView';
import playerStatusBarTemplate from './playerStatusBarTemplate.html?raw';

export class PlayerStatusBar extends ComponentView {
    constructor({
        game, player, playerBoardSide, parentView, el
    }) {
        super({ parentView, el });
        this.render();

        this.game = game;
        this.player = player;
        this.playerBoardSide = playerBoardSide;
        this.statusBarContainer = playerBoardSide.querySelector('[data-status-bar]');
        this.playerNameContainer = this.statusBarContainer.firstElementChild;
        this.playerStatusIndicator = null;

        this.showName();
        this.showStatus();
        this.handleStatusIndicator();
    }

    handleStatusIndicator() {
        this.game.events.on('gameEnded', ({ winner }) => {
            if (winner === this.player) {
                this.playerStatusIndicator.innerHTML = 'You won!';
                this.playerStatusIndicator.style.visibility = 'visible';
            } else {
                this.playerStatusIndicator.style.visibility = 'hidden';
            }
        });

        this.game.events.on('playerChanged', () => {
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
        this.playerStatusIndicator = document.createElement('div');

        this.playerStatusIndicator.innerHTML = 'Your turn';
        this.playerStatusIndicator.className = 'player-status-indicator';

        if (this.player.team === 'dire') {
            this.playerNameContainer.before(this.playerStatusIndicator);
            this.playerStatusIndicator.style.visibility = 'hidden';
        } else {
            this.playerNameContainer.after(this.playerStatusIndicator);
        }
    }

    render() {
        super.render(playerStatusBarTemplate);
    }
}
