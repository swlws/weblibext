/**
 * 生成随机数
 */
export type makeRandom = () => string;

/**
 * 字符串转小驼峰
 * @param {String} str --a-_b--- => aBC
 */
export type camelCase = (str: string) => string;

/**
 * 字符串首字母大写
 */
export type upperFirst = (str: string) => string;

/**
 * rgb转hex
 *
 * @param color
 * @returns
 */
export type rgbToHex = (color: string) => string;

/**
 * hex转rgba
 * @param {String} color
 * @param {Float} alp
 */
export type hexToRgba = (color: string, alp: number) => string;

/**
 * rgba转rgb
 * @param {String} color
 */
export type rgbaToRgb = (color: string) => string;

/**
 * base64编码，兼容中文
 *
 * @param str
 * @returns
 */
export type encode = (str: string) => string;

/**
 * base64解码，兼容中文
 *
 * @param str
 * @returns
 */
export type decode = (str: string) => string;
