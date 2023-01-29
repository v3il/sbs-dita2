import { PageView } from '../PageView';
import template from './template.html?raw';
import './style.css';
import { PlayerForm } from '../../components/PlayerForm/PlayerForm';
import { game } from '../../../models';
import { RouteIds } from '../../../consts/RouteIds';

export class PlayerFormPage extends PageView {
    constructor(router) {
        super(template, router);
    }

    render(mountingEl) {
        super.render(mountingEl);

        const radiantPlayerForm = new PlayerForm({
            player: game.radiantPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-radiant-player-form]')
        });

        const direPlayerForm = new PlayerForm({
            player: game.direPlayer,
            parentView: this,
            el: mountingEl.querySelector('[data-dire-player-form]')
        });

        radiantPlayerForm.on('selected', () => this.#checkPlayersReady());
        direPlayerForm.on('selected', () => this.#checkPlayersReady());
    }

    #checkPlayersReady() {
        const isAllPlayersReady = [game.radiantPlayer, game.direPlayer].every((player) => player.isHeroSelected);

        if (isAllPlayersReady) {
            this.router.redirect(RouteIds.GAME_BOARD);
        }
    }
}
