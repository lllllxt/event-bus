declare class ListenerOpts {
    fn: Function;
    group: String;
}
declare class EventBus {
    listener: Map<String, Array<ListenerOpts>>;
    constructor(entries?: Array<[String, Array<ListenerOpts>]>);
    on(eventName: String, fn: Function, group?: String): void;
    once(eventName: String, fn: Function, group?: String): void;
    off(eventName?: String, fnOrGroup?: Function | String, group?: String): void;
    emit(eventName: String, ...args: any[]): void;
}
declare const _default: EventBus;
export default _default;
