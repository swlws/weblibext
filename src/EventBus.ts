// 全局事件车

import mitt, { Handler, EventType, Emitter, WildcardHandler } from "mitt";

const ENVENT_BUS_INSTANCES = new Map();

type CustomEmitter = Emitter & {
  once<T = any>(type: EventType, handler: Handler<T>): void;
  once(type: "*", handler: WildcardHandler): void;
};

/**
 * 生成事件车
 *
 * @returns
 */
function makeOneBus() {
  const bus: CustomEmitter = mitt() as CustomEmitter;

  // 仅触发一次的事件
  bus.once = (eventType: EventType, handler: Handler) => {
    const listener = function (...args: unknown[]) {
      if (handler) {
        handler.apply(this, args as any);
      }
      bus.off(eventType, listener);
    };
    bus.on(eventType, listener);
  };

  return bus;
}

/**
 * 获取事件车实例
 *
 * @param instanceName
 * @returns
 */
export function getBus(instanceName: string): CustomEmitter {
  if (!instanceName) {
    throw new Error(`Event Bus Require One Instance Name`);
  }

  let ins = ENVENT_BUS_INSTANCES.get(instanceName);
  if (ins) {
    return ins;
  }

  ins = makeOneBus();
  ENVENT_BUS_INSTANCES.set(instanceName, ins);

  return ins;
}

/**
 * 销毁所有的事件车
 */
export function destoryAllBus() {
  ENVENT_BUS_INSTANCES.clear();
}
