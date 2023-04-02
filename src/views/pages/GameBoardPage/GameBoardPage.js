import { PlayerGameboardSide } from '../../components/PlayerGameboardPart/PlayerGameboardPart';
import { PageView } from '../PageView';
import { game } from '../../../models';
import { Logger } from '../../components/Logger/Logger';
import template from './template.html?raw';
import './style.css';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);
    }

    init() {
        this.radiantGameboardSide = new PlayerGameboardSide({
            player: game.radiantPlayer,
            parentView: this
        });

        this.direGameboardSide = new PlayerGameboardSide({
            player: game.direPlayer,
            parentView: this
        });

        this.logger = new Logger({
            radiantPlayer: game.radiantPlayer,
            direPlayer: game.direPlayer,
            parentView: this,
            el: document.querySelector('[data-logger]')
        });
    }

    render(mountingEl) {
        super.render(mountingEl);
        this.init();
    }
}
