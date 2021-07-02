// 纯对象
export type PlainObject = Record<string, any>;

/**
 * DOM操作
 */
declare interface Dom {
  /**
   * 设备类型获取
   */
  getDeviceType: () => "Mobile" | "Desktop";

  /**
   * 注册事件
   *
   * @param element
   * @param event
   * @param handler
   * @param useCapture
   */
  on: (
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture?: boolean
  ) => void;

  /**
   * 移除事件
   *
   * @param element
   * @param event
   * @param handler
   * @param useCapture
   */
  off: (
    element: HTMLElement | Document | Window,
    event: string,
    handler: EventListenerOrEventListenerObject,
    useCapture?: boolean
  ) => void;

  /**
   * 仅触发一次的事件
   *
   * @param el
   * @param event
   * @param fn
   */
  once: (el: HTMLElement, event: string, fn: EventListener) => void;

  /**
   * 判断元素是否具有某个class
   *
   * @param el
   * @param cls
   * @returns
   */
  hasClass: (el: HTMLElement, cls: string) => boolean;

  /**
   * 给元素添加多个class
   *
   * @param el
   * @param cls “abc efg”
   * @returns
   */
  addClass: (el: HTMLElement, cls: string) => void;

  /**
   * 移除多个class
   *
   * @param el
   * @param cls "abc efg"
   * @returns
   */
  removeClass: (el: HTMLElement, cls: string) => void;

  /**
   * 获取元素的某个样式
   *
   * @param element
   * @param styleName
   * @returns
   */
  getStyle: (element: HTMLElement, styleName: string) => string | null;

  /**
   * 修改元素样式
   *
   * @param element
   * @param styleName
   * @param value
   * @returns
   */
  setStyle: (
    element: HTMLElement,
    styleName: CSSStyleDeclaration | string,
    value?: string
  ) => void;

  /**
   * 移除元素样式
   *
   * @param element
   * @param style
   * @returns
   */
  removeStyle: (
    element: HTMLElement,
    style: CSSStyleDeclaration | string
  ) => void;

  /**
   * 是否允许滚动
   *
   * @param el
   * @param isVertical
   * @returns
   */
  isScroll: (el: HTMLElement, isVertical?: boolean) => boolean;

  /**
   * 获取元素的滚动盒子
   *
   * @param el
   * @param isVertical
   * @returns
   */
  getScrollContainer: (
    el: HTMLElement,
    isVertical?: boolean
  ) => Window | HTMLElement;

  /**
   * 指定元素是否在另一元素包裹中
   *
   * @param el
   * @param container
   * @returns
   */
  isInContainer: (el: HTMLElement, container: HTMLElement) => boolean;

  /**
   * 元素距离文档顶部的位置
   *
   * @param el
   * @returns
   */
  getOffsetTop: (el: HTMLElement) => void;

  /**
   * 两元素顶部位置差
   *
   * @param el
   * @param containerEl
   * @returns
   */
  getOffsetTopDistance: (el: HTMLElement, containerEl: HTMLElement) => void;

  /**
   * 节点在浏览器窗口中的位置
   * @param{domNode} element 起始节点
   */
  getElementOffsetRoot: (element: any) => {
    top: number;
    left: number;
  };

  /**
   * 在执行元素上触发指定的事件，且可传递自定义事件
   *
   * @param el
   * @param eventType
   * @param detail
   *
   * eg：triggerEvent(document.getElementById('id'), 'click', {name: '123'})
   */
  triggerEvent: (
    el: HTMLElement,
    eventType: string,
    detail: PlainObject
  ) => void;

  /**
   * 查找指定具备ClassName的父节点
   * @param pClassName
   * @param currentTarget
   * @param rootNode
   * @returns
   */
  lookupParentNodeByClassName: (
    pClassName: string,
    currentTarget: HTMLElement,
    rootNode: HTMLElement
  ) => void;

  /**
   * DOM事件代理
   *
   * @param pEl
   * @param cb
   * @param itemClass
   */
  clickProxy: (
    pEl: HTMLElement,
    cb: (target: HTMLElement) => void,
    itemClass?: string
  ) => void;

  /**
   * 判断指定元素是否在可视窗口中
   *
   * @param el
   * @param partiallyVisible true为完全可见；false为完全可见
   */
  elementIsVisibleInViewport: (
    el: HTMLElement,
    partiallyVisible?: boolean
  ) => boolean;

  /**
   * 是否滚动到底部
   *
   * @param target
   * @returns
   */
  isScrollBottom: (target: HTMLElement) => void;

  /**
   * 获取浏览器窗口的大小
   */
  getViewport: () => { width: number; height: number };

  /**
   * 相对于根节点的所有滚动总和
   * @param{domNode} element 起始节点
   */
  getTotalScrollOffsetRoot: (element: any) => {
    width: number;
    height: number;
  };
}

/**
 * 常用DOM操作扩展
 */
export const dom: Dom;

import { Handler, EventType, Emitter, WildcardHandler } from "mitt";
type CustomEmitter = Emitter & {
  once<T = any>(type: EventType, handler: Handler<T>): void;
  once(type: "*", handler: WildcardHandler): void;
};

/**
 * 事件车
 */
declare interface EventBus {
  /**
   * 获取事件车实例
   *
   * @param instanceName
   * @returns
   */
  getBus: (instanceName: string) => CustomEmitter;

  /**
   * 销毁所有的事件车
   */
  destoryAllBus: () => void;
}
/**
 * 事件车
 */
export const event: EventBus;

/**
 * 正则表达式
 */
declare interface Reg {
  /**
   * IP地址
   */
  REGEXP_IP: RegExp;

  /**
   * 字符串
   */
  REGEXP_STRING: RegExp;
}

/**
 * 常用正则表达式
 */
export const reg: Reg;

/**
 * 字符串操作
 */
declare interface String {
  /**
   * 生成随机字符串
   */
  makeRandom: () => string;

  /**
   * 字符串转小驼峰
   * @param {String} str --a-_b--- => aBC
   */
  camelCase: (str: string) => string;

  /**
   * 字符串首字母大写
   */
  upperFirst: (str: string) => string;

  /**
   * rgb转hex
   *
   * @param color
   * @returns
   */
  rgbToHex: (color: string) => string;

  /**
   * hex转rgba
   * @param {String} color
   * @param {Float} alp
   */
  hexToRgba: (color: string, alp: number) => string;

  /**
   * rgba转rgb
   * @param {String} color
   */
  rgbaToRgb: (color: string) => string;

  /**
   * base64编码，兼容中文
   *
   * @param str
   * @returns
   */
  encode: (str: string) => string;

  /**
   * base64解码，兼容中文
   *
   * @param str
   * @returns
   */
  decode: (str: string) => string;

  /**
   * 序列化，支持Map、Set、Function
   */
  stringify: (obj: any, spaces = 0) => string;
}

/**
 * 常用字符串操作
 */
export const string: String;

/**
 * 时间操作
 */
declare interface Time {
  /**
   * 解析时间
   *
   * @param time
   * @param format
   * @returns
   */
  parseTime: (time: Date | string | number, format?: string) => string | null;

  /**
   * 将时间格式化
   *
   * @param time
   * @param option
   * @returns
   */
  formatTime: (time: Date | string | number, option?: string) => string | null;
}
/**
 * 常用时间操作
 */
export const time: Time;

/**
 * 数据类型枚举
 */
type ObjectTypeEnum =
  | "null"
  | "array"
  | "object"
  | "number"
  | "string"
  | "boolean";

/**
 * 工具方法
 */
declare interface Lib {
  /**
   * URL参数解析
   * @param url
   * parseURLParameters("http://url.com/page?age=123&sname=ddd"); // {age: "123", name: "ddd"}
   */
  parseURLParameters: (url: string) => PlainObject;

  /**
   * 获取数据类型
   *
   * @param obj
   * @returns
   */
  getObjectType: (obj: any) => ObjectTypeEnum;

  /**
   * 深拷贝
   *
   * @param obj
   * @returns
   */
  deepClone: (obj: any) => any;

  /**
   * 读cookie
   * @param key
   * @returns
   */
  getCookie: (key: string) => string;

  /**
   * 函数节流，一个周期内仅执行一次
   *
   * @param fn
   * @param wait
   */
  throttle: (fn: any, wait?: number, that?: any) => (...rest: any[]) => void;

  /**
   * 函数防抖，连续触发N次，仅在最后一次执行
   *
   * @param fn
   * @param wait
   */
  debounce: (fn: any, wait?: number, that?: any) => (...rest: any[]) => void;

  /**
   * 获取数组、集合、Map的最后一项
   * @param list
   */
  lastItem: (list: any[] | Set<any> | Map<any, any>) => any;

  /**
   * 顺序执行Promise队列
   * @param list 其中元素可以是Promise、Funciton、常量
   */
  asyncSequentializer: (list: any) => Promise<any[]>;

  /**
   * 轮询，直到返回为true
   *
   * @param fn
   * @param validate
   * @param interval
   */
  poll: (fn: Function, validate: Function, interval?: number) => Promise<any>;

  /**
   * 生成一颗树
   *
   * @param data
   * @param config
   * @returns
   */
  makeTree: (
    data: PlainObject[],
    config?: { id: string; pid: string }
  ) => PlainObject[];

  /**
   * 通过URL下载文件
   * @param url
   * @returns
   */
  downFileByUrl: (url: string) => void;

  /**
   * 将Blob数据以文件格式下载
   *
   * @param binary 待转换的二进制数据
   * @param filename 待下载的文件名 res.headers['content-disposition'].match(/filename=(.*)/)[1];
   * @param type MIME 类型 res.headers['content-type']
   */
  downFileByBlob: (
    binary: any,
    filename = "unknown",
    type = "application/octet-stream"
  ) => void;

  /**
   * 将字符串拷贝到粘贴板
   * @param str
   * @returns
   */
  copyToClipboard: (str: string) => void;
}

/**
 * 常用的工具方法
 */
export const lib: Lib;
