import { PlainObject } from "@type/index";
import { camelCase } from "./string";
import { isObject } from "./lib";

/**
 * 设备类型获取
 */
export function getDeviceType() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
    ? "Mobile"
    : "Desktop";
}

const trim = function (s: string) {
  return (s || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/**
 * 注册事件
 *
 * @param element
 * @param event
 * @param handler
 * @param useCapture
 */
export const on = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture);
  }
};

/**
 * 移除事件
 *
 * @param element
 * @param event
 * @param handler
 * @param useCapture
 */
export const off = function (
  element: HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
  useCapture = false
): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture);
  }
};

/**
 * 仅触发一次的事件
 *
 * @param el
 * @param event
 * @param fn
 */
export const once = function (
  el: HTMLElement,
  event: string,
  fn: EventListener
): void {
  const listener = function (...args: unknown[]) {
    if (fn) {
      fn.apply(this, args as any);
    }
    off(el, event, listener);
  };
  on(el, event, listener);
};

/**
 * 判断元素是否具有某个class
 *
 * @param el
 * @param cls
 * @returns
 */
export function hasClass(el: HTMLElement, cls: string): boolean {
  if (!el || !cls) return false;
  if (cls.indexOf(" ") !== -1)
    throw new Error("className should not contain space.");
  if (el.classList) {
    return el.classList.contains(cls);
  } else {
    return (" " + el.className + " ").indexOf(" " + cls + " ") > -1;
  }
}

/**
 * 给元素添加多个class
 *
 * @param el
 * @param cls "abc efg"
 * @returns
 */
export function addClass(el: HTMLElement, cls: string): void {
  if (!el) return;
  let curClass = el.className;
  const classes = (cls || "").split(" ");

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.add(clsName);
    } else if (!hasClass(el, clsName)) {
      curClass += " " + clsName;
    }
  }
  if (!el.classList) {
    el.className = curClass;
  }
}

/**
 * 移除多个class
 *
 * @param el
 * @param cls "abc efg"
 * @returns
 */
export function removeClass(el: HTMLElement, cls: string): void {
  if (!el || !cls) return;
  const classes = cls.split(" ");
  let curClass = " " + el.className + " ";

  for (let i = 0, j = classes.length; i < j; i++) {
    const clsName = classes[i];
    if (!clsName) continue;

    if (el.classList) {
      el.classList.remove(clsName);
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(" " + clsName + " ", " ");
    }
  }
  if (!el.classList) {
    el.className = trim(curClass);
  }
}

/**
 * 获取元素的某个样式
 *
 * @param element
 * @param styleName
 * @returns
 */
export const getStyle = function (
  element: HTMLElement,
  styleName: string
): string | null {
  styleName = camelCase(styleName);
  if (styleName === "float") {
    styleName = "cssFloat";
  }
  try {
    const style = (element.style as PlainObject)[styleName];
    if (style) return style;

    if (!document || !document.defaultView) return "";

    const computed = document.defaultView.getComputedStyle(element, "");
    return computed ? (computed as PlainObject)[styleName] : "";
  } catch (e) {
    return (element.style as PlainObject)[styleName];
  }
};

/**
 * 修改元素样式
 *
 * @param element
 * @param styleName
 * @param value
 * @returns
 */
export function setStyle(
  element: HTMLElement,
  styleName: CSSStyleDeclaration | string,
  value?: string
): void {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.keys(styleName).forEach((prop) => {
      setStyle(element, prop, (styleName as PlainObject)[prop]);
    });
  } else {
    styleName = camelCase(styleName as string);
    (element.style as PlainObject)[styleName as string] = value;
  }
}

/**
 * 移除元素样式
 *
 * @param element
 * @param style
 * @returns
 */
export function removeStyle(
  element: HTMLElement,
  style: CSSStyleDeclaration | string
) {
  if (!element || !style) return;

  if (isObject(style)) {
    Object.keys(style).forEach((prop) => {
      setStyle(element, prop, "");
    });
  } else {
    setStyle(element, style, "");
  }
}

/**
 * 是否允许滚动
 *
 * @param el
 * @param isVertical
 * @returns
 */
export const isScroll = (el: HTMLElement, isVertical?: boolean): boolean => {
  const determinedDirection = isVertical === null || isVertical === undefined;
  const overflow = determinedDirection
    ? getStyle(el, "overflow")
    : isVertical
    ? getStyle(el, "overflow-y")
    : getStyle(el, "overflow-x");

  if (!overflow) return false;

  let len = overflow.match(/(scroll|auto)/)?.length;
  if (!len) return false;
  return true;
};

/**
 * 获取元素的滚动盒子
 *
 * @param el
 * @param isVertical
 * @returns
 */
export const getScrollContainer = (
  el: HTMLElement,
  isVertical?: boolean
): Window | HTMLElement => {
  let parent: HTMLElement = el;
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window;
    }
    if (isScroll(parent, isVertical)) {
      return parent;
    }
    parent = parent.parentNode as HTMLElement;
  }
  return parent;
};

/**
 * 指定元素是否在另一元素包裹中
 *
 * @param el
 * @param container
 * @returns
 */
export const isInContainer = (
  el: HTMLElement,
  container: HTMLElement
): boolean => {
  if (!el || !container) return false;

  const elRect = el.getBoundingClientRect();
  let containerRect: PlainObject;

  if (
    [window, document, document.documentElement, null, undefined].includes(
      container
    )
  ) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }

  return (
    elRect.top < containerRect.bottom &&
    elRect.bottom > containerRect.top &&
    elRect.right > containerRect.left &&
    elRect.left < containerRect.right
  );
};

/**
 * 元素距离文档顶部的位置
 *
 * @param el
 * @returns
 */
export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0;
  let parent = el;

  while (parent) {
    offset += parent.offsetTop;
    parent = parent.offsetParent as HTMLElement;
  }

  return offset;
};

/**
 * 两元素顶部位置差
 *
 * @param el
 * @param containerEl
 * @returns
 */
export const getOffsetTopDistance = (
  el: HTMLElement,
  containerEl: HTMLElement
) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
};

/**
 * 节点在浏览器窗口中的位置
 * @param{domNode} element 起始节点
 */
export function getElementOffsetRoot(element: any) {
  if (!element) return { left: 0, top: 0 };

  let actualTop = element.offsetTop;
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    actualTop += current.offsetTop;
    actualLeft += current.offsetLeft;

    current = current.offsetParent;
  }

  const scroll = getTotalScrollOffsetRoot(element);
  return {
    top: actualTop - scroll.height,
    left: actualLeft - scroll.width,
  };
}

/**
 * 在执行元素上触发指定的事件，且可传递自定义事件
 *
 * @param el
 * @param eventType
 * @param detail
 *
 * eg：triggerEvent(document.getElementById('id'), 'click', {name: '123'})
 */
export function triggerEvent(
  el: HTMLElement,
  eventType: string,
  detail: PlainObject
) {
  el.dispatchEvent(new CustomEvent(eventType, { detail }));
}

/**
 * 查找指定具备ClassName的父节点
 * @param pClassName
 * @param currentTarget
 * @param rootNode
 * @returns
 */
export function lookupParentNodeByClassName(
  pClassName: string,
  currentTarget: HTMLElement,
  rootNode: HTMLElement
) {
  if (currentTarget === rootNode) {
    return null;
  }

  if (rootNode && !rootNode.contains(currentTarget)) {
    return null;
  }

  let tmp: HTMLElement | null = currentTarget;
  while (tmp !== null && tmp !== rootNode) {
    const classList = tmp.classList;
    if (classList.contains(pClassName)) {
      return tmp;
    }

    tmp = tmp.parentElement;
  }

  return null;
}

/**
 * DOM事件代理
 *
 * @param pEl
 * @param cb
 * @param itemClass
 */
export function clickProxy(
  pEl: HTMLElement,
  cb: (target: HTMLElement) => void,
  itemClass = "item"
) {
  on(pEl, "click", (event) => {
    const target = lookupParentNodeByClassName(
      itemClass,
      event.target as HTMLElement,
      pEl
    );
    if (!target) return;

    cb(target);
  });
}

/**
 * 判断指定元素是否在可视窗口中
 *
 * @param el
 * @param partiallyVisible true为完全可见；false为完全可见
 */
export function elementIsVisibleInViewport(
  el: HTMLElement,
  partiallyVisible = false
) {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

/**
 * 是否滚动到底部
 *
 * @param target
 * @returns
 */
export function isScrollBottom(target: HTMLElement) {
  const clientHeight = target.clientHeight;
  const scrollTop = target.scrollTop;
  const scrollHeight = target.scrollHeight;

  if (scrollHeight - scrollTop === clientHeight) {
    return true;
  }

  return false;
}

/**
 * 获取浏览器窗口的大小
 */
export function getViewport() {
  if (document.compatMode === "BackCompat") {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    };
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  }
}

/**
 * 相对于根节点的所有滚动总和
 * @param{domNode} element 起始节点
 */
export function getTotalScrollOffsetRoot(element: any) {
  let width = 0,
    height = 0;

  let pNode = element.parentNode;
  while (pNode !== null && pNode !== document) {
    width += pNode.scrollLeft;
    height += pNode.scrollTop;

    pNode = pNode.parentNode;
  }

  return { width: width, height: height };
}
