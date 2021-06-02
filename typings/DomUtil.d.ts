import { PlainObject } from ".";

/**
 * 设备类型获取
 */
export type getDeviceType = () => "Mobile" | "Desktop";

/**
 * URL参数解析
 * @param url
 * parseURLParameters("http://url.com/page?age=123&sname=ddd"); // {age: "123", name: "ddd"}
 */
export type parseURLParameters = (url: string) => PlainObject;

/**
 * 注册事件
 *
 * @param element
 * @param event
 * @param handler
 * @param useCapture
 */
export type on = (
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
export type off = (
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
export type once = (el: HTMLElement, event: string, fn: EventListener) => void;

/**
 * 判断元素是否具有某个class
 *
 * @param el
 * @param cls
 * @returns
 */
export type hasClass = (el: HTMLElement, cls: string) => boolean;

/**
 * 给元素添加多个class
 *
 * @param el
 * @param cls “abc efg”
 * @returns
 */
export type addClass = (el: HTMLElement, cls: string) => void;

/**
 * 移除多个class
 *
 * @param el
 * @param cls "abc efg"
 * @returns
 */
export type removeClass = (el: HTMLElement, cls: string) => void;

/**
 * 获取元素的某个样式
 *
 * @param element
 * @param styleName
 * @returns
 */
export type getStyle = (
  element: HTMLElement,
  styleName: string
) => string | null;

/**
 * 修改元素样式
 *
 * @param element
 * @param styleName
 * @param value
 * @returns
 */
export type setStyle = (
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
export type removeStyle = (
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
export type isScroll = (el: HTMLElement, isVertical?: boolean) => boolean;

/**
 * 获取元素的滚动盒子
 *
 * @param el
 * @param isVertical
 * @returns
 */
export type getScrollContainer = (
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
export type isInContainer = (
  el: HTMLElement,
  container: HTMLElement
) => boolean;

/**
 * 元素距离文档顶部的位置
 *
 * @param el
 * @returns
 */
export type getOffsetTop = (el: HTMLElement) => void;

/**
 * 两元素顶部位置差
 *
 * @param el
 * @param containerEl
 * @returns
 */
export type getOffsetTopDistance = (
  el: HTMLElement,
  containerEl: HTMLElement
) => void;

/**
 * 节点在浏览器窗口中的位置
 * @param{domNode} element 起始节点
 */
export type getElementOffsetRoot = (element: any) => {
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
export type triggerEvent = (
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
export type lookupParentNodeByClassName = (
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
export type clickProxy = (
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
export type elementIsVisibleInViewport = (
  el: HTMLElement,
  partiallyVisible?: boolean
) => boolean;

/**
 * 是否滚动到底部
 *
 * @param target
 * @returns
 */
export type isScrollBottom = (target: HTMLElement) => void;

/**
 * 获取浏览器窗口的大小
 */
export type getViewport = () => { width: number; height: number };

/**
 * 相对于根节点的所有滚动总和
 * @param{domNode} element 起始节点
 */
export type getTotalScrollOffsetRoot = (element: any) => {
  width: number;
  height: number;
};

/**
 * 将字符串拷贝到粘贴板
 * @param str
 * @returns
 */
export type copyToClipboard = (str: string) => void;

/**
 * 通过a标签下载文件
 * @param url
 * @returns
 */
export type downFileByUrl = (url: string) => void;

/**
 * 将Blob数据一文件形式下载
 * @param binary 待转换的二进制数据
 * @param filename 待下载的文件名 res.headers['content-disposition'].match(/filename=(.*)/)[1];
 * @param type MIME 类型 res.headers['content-type']
 */
export type convertRes2Blob = (
  binary: any,
  filename: string,
  type: string
) => void;
