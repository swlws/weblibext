import { PlainObject } from ".";

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
 * 获取数据类型
 *
 * @param obj
 * @returns
 */
export type getObjectType = (obj: any) => ObjectTypeEnum;

/**
 * 深拷贝
 *
 * @param obj
 * @returns
 */
export type deepClone = (obj: any) => any;

/**
 * 读cookie
 * @param key
 * @returns
 */
export type getCookie = (key: string) => string;

/**
 * 函数节流，一个周期内仅执行一次
 *
 * @param fn
 * @param wait
 */
export type throttle = (
  fn: any,
  wait?: number,
  that?: any
) => (...rest: any[]) => void;

/**
 * 函数防抖
 * 连续触发N次，仅在最后一次执行
 *
 * @param fn
 * @param wait
 */
export type debounce = (
  fn: any,
  wait?: number,
  that?: any
) => (...rest: any[]) => void;

/**
 * 获取数组、集合、Map的最后一项
 * @param list
 */
export type lastItem = (list: any[] | Set<any> | Map<any, any>) => any;

/**
 * 顺序执行Promise队列
 * @param list 其中元素可以是Promise、Funciton、常量
 */
export type asyncSequentializer = (list: any) => Promise<any[]>;

/**
 * 轮询，直到返回为true
 *
 * @param fn
 * @param validate
 * @param interval
 */
export type poll = (
  fn: Function,
  validate: Function,
  interval?: number
) => Promise<any>;

/**
 * 生成一颗树
 *
 * @param data
 * @param config
 * @returns
 */
export type makeTree = (
  data: PlainObject[],
  config?: { id: string; pid: string }
) => PlainObject[];
