declare class ListenerOpts {
    fn: Function;
    group: String;
}
declare class EventBus {
    listener: Map<String, Array<ListenerOpts>>;
    constructor(entries?: Array<[String, Array<ListenerOpts>]>);
    on(eventName: String, fn: Function, group?: String): void;
    once(eventName: String, fn: Function, group?: String): void;
    /**
     * 渐进式精准取消订阅
     * eventName为空时取消全部订阅；
     * fnOrGroup为空时取消所有eventName订阅；
     * group为空时取消匹配到fnOrGroup的所有eventName订阅。
     * @param eventName
     * @param fnOrGroup
     * @param group
     */
    off(eventName?: String, fnOrGroup?: Function | String, group?: String): void;
    /** 整个分组移除监听 */
    removeGroup(group: String): boolean;
    emit(eventName: String, ...args: any[]): void;
}
declare const _default: EventBus;
export default _default;
