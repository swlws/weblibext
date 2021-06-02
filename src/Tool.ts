import { PlainObject } from "@type/index";

export const isObject = (val: any) => getObjectType(val);

/**
 * 获取数据类型
 *
 * @param obj
 * @returns
 */
export function getObjectType(obj: any) {
  return obj === null
    ? "null"
    : obj instanceof Array
    ? "array"
    : typeof obj !== "object"
    ? typeof obj
    : "object";
}

/**
 * 深拷贝
 *
 * @param obj
 * @returns
 */
export function deepClone(obj: any) {
  const type = getObjectType(obj);
  if (type === "object") {
    const res: PlainObject = {};
    Object.keys(obj).forEach((key) => {
      res[key] = deepClone(obj[key]);
    });
    return res;
  }

  if (type === "array") {
    const res: any[] = [];
    obj.forEach((item: any) => {
      res.push(deepClone(item));
    });
    return res;
  }
  return obj;
}

/**
 * 读cookie
 * @param key
 * @returns
 */
export function getCookie(key: string) {
  const name = key + "=";
  const ca = document.cookie.split(";");
  for (let i = 0, len = ca.length; i < len; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) !== -1) {
      return c.substring(name.length, c.length);
    }
  }

  return "";
}

/**
 * 函数节流，一个周期内仅执行一次
 *
 * @param fn
 * @param wait
 */
export function throttle(fn: any, wait = 300, that?: any) {
  let timer: any = null;

  return function (...rest: any[]) {
    if (typeof fn !== "function") return;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        fn.call(that, ...rest);
      }, wait);
    }
  };
}

/**
 * 函数防抖
 * 连续触发N次，仅在最后一次执行
 *
 * @param fn
 * @param wait
 */
export function debounce(fn: any, wait = 300, that?: any) {
  let timer: any = null;

  return function (...rest: any[]) {
    if (typeof fn !== "function") return;

    clearTimeout(timer);
    timer = setTimeout(fn.bind(that, ...rest), wait);
  };
}

/**
 * 获取数组、集合、Map的最后一项
 * @param list
 */
export function lastItem(list: any[] | Set<any> | Map<any, any>) {
  if (Array.isArray(list)) {
    return list.slice(-1)[0];
  }

  if (list instanceof Set) {
    return Array.from(list).slice(-1)[0];
  }

  if (list instanceof Map) {
    return Array.from(list.values()).slice(-1)[0];
  }
}

/**
 * 序列化，可以处理Set、Map、Function
 */
export const stringify = (() => {
  const replacer = (key: any, val: any) => {
    if (typeof val === "symbol") {
      return val.toString();
    }
    if (val instanceof Set) {
      return Array.from(val);
    }
    if (val instanceof Map) {
      return Array.from(val.entries());
    }
    if (typeof val === "function") {
      return val.toString();
    }
    return val;
  };

  return (obj: any, spaces = 0) => JSON.stringify(obj, replacer, spaces);
})();

/**
 * 顺序执行Promise队列
 */
export const asyncSequentializer = (() => {
  const toPromise = (x: any) => {
    if (x instanceof Promise) {
      return x;
    }

    if (typeof x === "function") {
      // if function is not async this will turn its result into a promise
      // if it is async this will await for the result
      return (async () => await x())();
    }

    return Promise.resolve(x);
  };

  return (list: any[]) => {
    const results: any[] = [];

    return (
      list
        .reduce((lastPromise, currentPromise) => {
          return lastPromise.then((res: any) => {
            results.push(res); // collect the results
            return toPromise(currentPromise);
          });
        }, toPromise(list.shift()))
        // collect the final result and return the array of results as resolved promise
        .then((res: any) => Promise.resolve([...results, res]))
    );
  };
})();

/**
 * 轮询，直到返回为true
 *
 * @param fn
 * @param validate
 * @param interval
 */
export async function poll(fn: Function, validate: Function, interval = 2500) {
  const resolver = async (resolve: any, reject: any) => {
    try {
      const result = await fn();
      const valid = validate(result);
      if (valid === true) {
        resolve(result);
      } else if (valid === false) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
        // settimeout可以接受多个参数，多余的参数会传递到回掉函数中
        setTimeout(resolver, interval, resolve, reject);
      }
    } catch (e) {
      reject(e);
    }
  };
  return new Promise(resolver);
}

/**
 * 找到树的第一个叶子节点
 */
export function findFirstLeafNode(arr: any[], childKey = "child") {
  if (!Array.isArray(arr) || arr.length === 0) return undefined;

  let child = [...arr];
  let obj = child.shift();
  while (Array.isArray(obj[childKey]) && obj[childKey].length > 0) {
    child = [...obj[childKey]];
    obj = child.shift();
  }

  return obj;
}

/**
 * 生成一颗树
 *
 * @param data
 * @param config
 * @returns
 */
export function makeTree(
  data: PlainObject[],
  config = { id: "id", pid: "pid" }
) {
  if (!Array.isArray(data)) {
    return [];
  }

  const { id: _id, pid: _pid } = config;
  const map = data.reduce((_map, item) => {
    item.__id__ = item[_id];
    item.__pid__ = item[_pid];
    item.child = [];
    _map[item.__id__] = item;
    return _map;
  }, {});

  const set = new Set(Object.keys(map));
  Object.keys(map).forEach((key) => {
    const item = map[key];
    const pid = item.__pid__;
    const pItem = map[pid];
    if (!pItem) return;
    pItem.child.push(item);
    set.delete(item.__id__);
    Reflect.deleteProperty(item, "__id__");
    Reflect.deleteProperty(item, "__pid__");
  });

  return Array.from(set.values()).map((id) => {
    const item = { ...map[id] };
    item[_id] = item.__id__;
    item[_pid] = item.__pid__;
    Reflect.deleteProperty(item, "__id__");
    Reflect.deleteProperty(item, "__pid__");
    return item;
  });
}
