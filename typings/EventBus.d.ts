type CustomEmitter = Emitter & {
  once<T = any>(type: EventType, handler: Handler<T>): void;
  once(type: "*", handler: WildcardHandler): void;
};

/**
 * 获取事件车实例
 *
 * @param instanceName
 * @returns
 */
export type getBus = (instanceName: string) => CustomEmitter;

/**
 * 销毁所有的事件车
 */
export type destoryAllBus = () => void;
