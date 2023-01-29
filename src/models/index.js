import { EventEmitter } from './EventEmitter';
import { Player } from './Player';
import { TeamNames } from '../consts/TeamNames';
import { Game } from './Game';

const events = new EventEmitter();

const radiantPlayer = new Player({ events, team: TeamNames.RADIANT });
const direPlayer = new Player({ events, team: TeamNames.DIRE });

export const game = new Game({ radiantPlayer, direPlayer, events });
