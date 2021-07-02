import { PlainObject } from "@type/index";

/**
 * URL参数解析
 * @param url
 * parseURLParameters("http://url.com/page?age=123&sname=ddd"); // {age: "123", name: "ddd"}
 */
export function parseURLParameters(url: string) {
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a: PlainObject, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
}

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

/**
 * 通过a标签下载文件
 * @param url
 * @returns
 */
export function downFileByUrl(url: string) {
  if (!url) return;

  const fileName = url.slice(url.lastIndexOf("/") + 1, url.length);

  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = url;
  tempLink.setAttribute("download", decodeURI(fileName)); // 兼容：某些浏览器不支持HTML5的download属性

  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
}

/**
 * 将Blob数据以文件形式下载
 * @param binary 待转换的二进制数据
 * @param filename 待下载的文件名 res.headers['content-disposition'].match(/filename=(.*)/)[1];
 * @param type MIME 类型 res.headers['content-type']
 */
export function downFileByBlob(
  binary: any,
  filename = "unknown",
  type = "application/octet-stream"
) {
  // 将二进制流转为blob
  const blob = new Blob([binary], { type });
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(filename));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);

    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(filename)); // 兼容：某些浏览器不支持HTML5的download属性

    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }
}

/**
 * 将字符串拷贝到粘贴板
 * @param str
 * @returns
 */
export function copyToClipboard(str: string) {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "readonly");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);

  const selection = window.getSelection();

  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);

  if (!selection) return;

  const selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  if (selected) {
    selection.removeAllRanges();
    selection.addRange(selected);
  }
}
