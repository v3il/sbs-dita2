export class EventEmitter {
    /*
        {
            event1: [handler1, handler2, ...],
            event2: [handler1, handler2, ...]
        }
     */
    #storage = {};

    on(event, handler) {}

    off(event, handler) {}

    emit(event, data = {}) {}
}
