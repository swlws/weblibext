/**
 * 将时间统一转化为Date标准格式
 *
 * @param time
 * @returns
 */
function toDate(time: Date | string | number): Date {
  if (typeof time === "object") {
    return time;
  }

  if (typeof time === "string") {
    if (/^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else {
      // 将ISO Date格式修改为GMT的时间格式
      // 2021-02-26T04:02:57:677Z
      // 2021-02-26T04:02:57.677Z
      time = time.replace(/:(.{3}z)$/gi, (str, $1) => {
        return `.${$1}`;
      });
    }
  }

  if (typeof time === "number" && time.toString().length === 10) {
    time = time * 1000;
  }

  return new Date(time as number);
}

/**
 * 解析时间
 *
 * @param time
 * @param format
 * @returns
 */
export function parseTime(
  time: Date | string | number,
  format = "{y}-{m}-{d} {h}:{i}:{s}"
): string | null {
  if (arguments.length === 0 || !time) {
    return null;
  }

  const date: Date = toDate(time);

  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = (formatObj as any)[key];
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * 将时间格式化
 *
 * @param time
 * @param option
 * @returns
 */
export function formatTime(time: Date | string | number, option?: string) {
  const d = toDate(time);
  const now = Date.now();
  const diff = (now - (d as any)) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }

  return parseTime(time, option);
}
