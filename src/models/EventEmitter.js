export class EventEmitter {
    #storage = {};

    on(event, handler) {
        const hasEvent = this.#storage[event] !== undefined;
        if (hasEvent) {
            this.#storage[event].push(handler);
        }
        this.#storage[event] = [handler];
    }

    off(event, handler) {
        const hasEvent = this.#storage[event] !== undefined;
        if (hasEvent) {
            this.#storage = this.#storage[event].filter((func) => !(func === handler));
        }
    }

    emit(event, data = {}) {
        const hasEvent = this.#storage[event] !== undefined;
        if (hasEvent) {
            this.#storage[event].forEach((handler) => {
                handler.call(null, data);
            });
        }
    }
}
