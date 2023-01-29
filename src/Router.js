export class Router {
    #routes;
    #currentRouteId;
    #mountingEl;
    #currentPageInstance;

    constructor(routes, mountingEl) {
        this.#routes = routes;
        this.#mountingEl = mountingEl;
    }

    redirect(routeId) {
        const route = this.#routes.find(({ id }) => id === routeId);

        if (!route || routeId === this.#currentRouteId) {
            return;
        }

        this.#currentPageInstance?.destroy();

        const { page: PageComponent } = route;
        const pageInstance = new PageComponent(this);

        pageInstance.render(this.#mountingEl);

        this.#currentRouteId = routeId;
        this.#currentPageInstance = pageInstance;
    }
}
