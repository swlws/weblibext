/**
 * 解析时间
 *
 * @param time
 * @param format
 * @returns
 */
export type parseTime = (
  time: Date | string | number,
  format?: string
) => string | null;

/**
 * 将时间格式化
 *
 * @param time
 * @param option
 * @returns
 */
export type formatTime = (
  time: Date | string | number,
  option?: string
) => string | null;
