import { PlayerFormPage, GameBoardPage } from './views/pages';
import { RouteIds } from './consts/RouteIds';

export const routes = [
    { id: RouteIds.PLAYER_FORM, page: PlayerFormPage },
    { id: RouteIds.GAME_BOARD, page: GameBoardPage }
];
