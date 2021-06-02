import base64 from "Base64";

/**
 * 随机字符串
 */
export function makeRandom() {
  return (Math.random() / +new Date()).toString(36).replace(/\d/g, "").slice(1);
}

/**
 * 字符串转小驼峰
 * @param {String} str --a-_b--- => aBC
 */
export function camelCase(str: string) {
  if (!str) return "";

  // 去除收尾的空格、横线、下划线
  const tmp = str.replace(/^[_\-\s]*|[_\-\s]*$/g, "");
  return tmp.replace(/[-_\s]+(\w)/g, (substr, $1) => $1.toUpperCase());
}

/**
 * 字符串首字母大写
 */
export function upperFirst(str: string) {
  if (!str.trim()) return "";

  return str.trim().replace(/^\w/, ($1) => $1.toUpperCase());
}

/**
 * rgb转hex
 *
 * @param color
 * @returns
 */
export function rgbToHex(color: string) {
  const values = color.replace(/(rgba?|[()]+|\s+)/g, "").split(",");

  const r = parseInt(values[0]) || 0;
  const g = parseInt(values[1]) || 0;
  const b = parseInt(values[2]) || 0;

  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
}

/**
 * hex转rgba
 * @param {String} color
 * @param {Float} alp
 */
export function hexToRgba(color: string, alp: number) {
  const tmp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  if (!tmp) return "";

  const r = parseInt(tmp[1], 16);
  const g = parseInt(tmp[2], 16);
  const b = parseInt(tmp[3], 16);
  const a = alp;

  return `rgba(${r},${g},${b},${a})`;
}

/**
 * rgba转rgb
 * @param {String} color
 */
export function rgbaToRgb(color: string) {
  const values = color.replace(/(rgba?|[()]+|\s+)/g, "").split(",");

  const a = parseFloat(values[3]) || 1;
  const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
  const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
  const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);

  const rr = "0" + r.toString(16).slice(-2);
  const gg = "0" + g.toString(16).slice(-2);
  const bb = "0" + b.toString(16).slice(-2);

  return `#${rr}${gg}${bb}`;
}

/**
 * base64编码，兼容中文
 *
 * @param str
 * @returns
 */
export function encode(str: string) {
  return base64.btoa(window.encodeURIComponent(str));
}

/**
 * base64解码，兼容中文
 *
 * @param str
 * @returns
 */
export function decode(str: string) {
  return window.decodeURIComponent(base64.atob(str));
}
