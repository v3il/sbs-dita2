import './assets/style.css';
import { Router } from './Router';
import { routes } from './routes';
import { RouteIds } from './consts/RouteIds';

const mountingEl = document.querySelector('#app');
export const router = new Router(routes, mountingEl);

router.redirect(RouteIds.PLAYER_FORM);
