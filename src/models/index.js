import { EventEmitter } from './EventEmitter';
import { Player } from './Player';
import { TeamNames } from '../consts/TeamNames';
import { Game } from './Game';

const radiantPlayer = new Player({ events: new EventEmitter(), team: TeamNames.RADIANT });
const direPlayer = new Player({ events: new EventEmitter(), team: TeamNames.DIRE });

export const game = new Game({ radiantPlayer, direPlayer, events: new EventEmitter() });
