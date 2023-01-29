import { PageView } from '../PageView';
import template from './template.html?raw';
import './style.css';

export class GameBoardPage extends PageView {
    constructor() {
        super(template);
    }

    render(mountingEl) {
        super.render(mountingEl);

        // Render other components, listen DOM events, etc.
    }
}
