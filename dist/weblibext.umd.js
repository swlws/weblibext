(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('Base64'), require('mitt')) :
  typeof define === 'function' && define.amd ? define(['exports', 'Base64', 'mitt'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.weblibext = {}, global.Base64, global.mitt));
}(this, (function (exports, base64, mitt) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var base64__default = /*#__PURE__*/_interopDefaultLegacy(base64);
  var mitt__default = /*#__PURE__*/_interopDefaultLegacy(mitt);

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /**
   * 随机字符串
   */

  function makeRandom() {
    return (Math.random() / +new Date()).toString(36).replace(/\d/g, "").slice(1);
  }
  /**
   * 字符串转小驼峰
   * @param {String} str --a-_b--- => aBC
   */

  function camelCase(str) {
    if (!str) return ""; // 去除收尾的空格、横线、下划线

    var tmp = str.replace(/^[_\-\s]*|[_\-\s]*$/g, "");
    return tmp.replace(/[-_\s]+(\w)/g, function (substr, $1) {
      return $1.toUpperCase();
    });
  }
  /**
   * 字符串首字母大写
   */

  function upperFirst(str) {
    if (!str.trim()) return "";
    return str.trim().replace(/^\w/, function ($1) {
      return $1.toUpperCase();
    });
  }
  /**
   * rgb转hex
   *
   * @param color
   * @returns
   */

  function rgbToHex(color) {
    var values = color.replace(/(rgba?|[()]+|\s+)/g, "").split(",");
    var r = parseInt(values[0]) || 0;
    var g = parseInt(values[1]) || 0;
    var b = parseInt(values[2]) || 0;
    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
  }
  /**
   * hex转rgba
   * @param {String} color
   * @param {Float} alp
   */

  function hexToRgba(color, alp) {
    var tmp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    if (!tmp) return "";
    var r = parseInt(tmp[1], 16);
    var g = parseInt(tmp[2], 16);
    var b = parseInt(tmp[3], 16);
    var a = alp;
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
  }
  /**
   * rgba转rgb
   * @param {String} color
   */

  function rgbaToRgb(color) {
    var values = color.replace(/(rgba?|[()]+|\s+)/g, "").split(",");
    var a = parseFloat(values[3]) || 1;
    var r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
    var g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
    var b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    var rr = "0" + r.toString(16).slice(-2);
    var gg = "0" + g.toString(16).slice(-2);
    var bb = "0" + b.toString(16).slice(-2);
    return "#".concat(rr).concat(gg).concat(bb);
  }
  /**
   * base64编码，兼容中文
   *
   * @param str
   * @returns
   */

  function encode(str) {
    return base64__default['default'].btoa(window.encodeURIComponent(str));
  }
  /**
   * base64解码，兼容中文
   *
   * @param str
   * @returns
   */

  function decode(str) {
    return window.decodeURIComponent(base64__default['default'].atob(str));
  }
  /**
   * 序列化，可以处理Set、Map、Function
   * @param obj
   * @param spaces
   * @returns
   */

  function stringify(obj) {
    var spaces = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return JSON.stringify(obj, function (key, val) {
      if (_typeof(val) === "symbol") {
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
    }, spaces);
  }

  var string = /*#__PURE__*/Object.freeze({
    __proto__: null,
    makeRandom: makeRandom,
    camelCase: camelCase,
    upperFirst: upperFirst,
    rgbToHex: rgbToHex,
    hexToRgba: hexToRgba,
    rgbaToRgb: rgbaToRgb,
    encode: encode,
    decode: decode,
    stringify: stringify
  });

  /**
   * URL参数解析
   * @param url
   * parseURLParameters("http://url.com/page?age=123&sname=ddd"); // {age: "123", name: "ddd"}
   */
  function parseURLParameters(url) {
    return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(function (a, v) {
      return a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1), a;
    }, {});
  }
  var isObject = function isObject(val) {
    return getObjectType(val);
  };
  /**
   * 获取数据类型
   *
   * @param obj
   * @returns
   */

  function getObjectType(obj) {
    return obj === null ? "null" : obj instanceof Array ? "array" : _typeof(obj) !== "object" ? _typeof(obj) : "object";
  }
  /**
   * 深拷贝
   *
   * @param obj
   * @returns
   */

  function deepClone(obj) {
    var type = getObjectType(obj);

    if (type === "object") {
      var res = {};
      Object.keys(obj).forEach(function (key) {
        res[key] = deepClone(obj[key]);
      });
      return res;
    }

    if (type === "array") {
      var _res = [];
      obj.forEach(function (item) {
        _res.push(deepClone(item));
      });
      return _res;
    }

    return obj;
  }
  /**
   * 读cookie
   * @param key
   * @returns
   */

  function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(";");

    for (var i = 0, len = ca.length; i < len; i++) {
      var c = ca[i];

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

  function throttle(fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var that = arguments.length > 2 ? arguments[2] : undefined;
    var timer = null;
    return function () {
      for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
        rest[_key] = arguments[_key];
      }

      if (typeof fn !== "function") return;

      if (!timer) {
        timer = setTimeout(function () {
          timer = null;
          fn.call.apply(fn, [that].concat(rest));
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

  function debounce(fn) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;
    var that = arguments.length > 2 ? arguments[2] : undefined;
    var timer = null;
    return function () {
      if (typeof fn !== "function") return;
      clearTimeout(timer);

      for (var _len2 = arguments.length, rest = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        rest[_key2] = arguments[_key2];
      }

      timer = setTimeout(fn.bind.apply(fn, [that].concat(rest)), wait);
    };
  }
  /**
   * 获取数组、集合、Map的最后一项
   * @param list
   */

  function lastItem(list) {
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

  var asyncSequentializer = function () {
    var toPromise = function toPromise(x) {
      if (x instanceof Promise) {
        return x;
      }

      if (typeof x === "function") {
        // if function is not async this will turn its result into a promise
        // if it is async this will await for the result
        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return x();

                case 2:
                  return _context.abrupt("return", _context.sent);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }))();
      }

      return Promise.resolve(x);
    };

    return function (list) {
      var results = [];
      return list.reduce(function (lastPromise, currentPromise) {
        return lastPromise.then(function (res) {
          results.push(res); // collect the results

          return toPromise(currentPromise);
        });
      }, toPromise(list.shift())) // collect the final result and return the array of results as resolved promise
      .then(function (res) {
        return Promise.resolve([].concat(results, [res]));
      });
    };
  }();
  /**
   * 轮询，直到返回为true
   *
   * @param fn
   * @param validate
   * @param interval
   */

  function poll(_x, _x2) {
    return _poll.apply(this, arguments);
  }
  /**
   * 找到树的第一个叶子节点
   */

  function _poll() {
    _poll = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(fn, validate) {
      var interval,
          resolver,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              interval = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : 2500;

              resolver = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
                  var result, valid;
                  return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.prev = 0;
                          _context2.next = 3;
                          return fn();

                        case 3:
                          result = _context2.sent;
                          valid = validate(result);

                          if (valid === true) {
                            resolve(result);
                          } else if (valid === false) {
                            // https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
                            // settimeout可以接受多个参数，多余的参数会传递到回掉函数中
                            setTimeout(resolver, interval, resolve, reject);
                          }

                          _context2.next = 11;
                          break;

                        case 8:
                          _context2.prev = 8;
                          _context2.t0 = _context2["catch"](0);
                          reject(_context2.t0);

                        case 11:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2, null, [[0, 8]]);
                }));

                return function resolver(_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }();

              return _context3.abrupt("return", new Promise(resolver));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return _poll.apply(this, arguments);
  }

  function findFirstLeafNode(arr) {
    var childKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "child";
    if (!Array.isArray(arr) || arr.length === 0) return undefined;

    var child = _toConsumableArray(arr);

    var obj = child.shift();

    while (Array.isArray(obj[childKey]) && obj[childKey].length > 0) {
      child = _toConsumableArray(obj[childKey]);
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

  function makeTree(data) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      id: "id",
      pid: "pid"
    };

    if (!Array.isArray(data)) {
      return [];
    }

    var _id = config.id,
        _pid = config.pid;
    var map = data.reduce(function (_map, item) {
      item.__id__ = item[_id];
      item.__pid__ = item[_pid];
      item.child = [];
      _map[item.__id__] = item;
      return _map;
    }, {});
    var set = new Set(Object.keys(map));
    Object.keys(map).forEach(function (key) {
      var item = map[key];
      var pid = item.__pid__;
      var pItem = map[pid];
      if (!pItem) return;
      pItem.child.push(item);
      set["delete"](item.__id__);
      Reflect.deleteProperty(item, "__id__");
      Reflect.deleteProperty(item, "__pid__");
    });
    return Array.from(set.values()).map(function (id) {
      var item = _objectSpread2({}, map[id]);

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

  function downFileByUrl(url) {
    if (!url) return;
    var fileName = url.slice(url.lastIndexOf("/") + 1, url.length);
    var tempLink = document.createElement("a");
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

  function downFileByBlob(binary) {
    var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "unknown";
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "application/octet-stream";
    // 将二进制流转为blob
    var blob = new Blob([binary], {
      type: type
    });

    if (typeof window.navigator.msSaveBlob !== "undefined") {
      // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
      window.navigator.msSaveBlob(blob, decodeURI(filename));
    } else {
      // 创建新的URL并指向File对象或者Blob对象的地址
      var blobURL = window.URL.createObjectURL(blob);
      var tempLink = document.createElement("a");
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

  function copyToClipboard(str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "readonly");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    var selection = window.getSelection();
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (!selection) return;
    var selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;

    if (selected) {
      selection.removeAllRanges();
      selection.addRange(selected);
    }
  }

  var lib = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseURLParameters: parseURLParameters,
    isObject: isObject,
    getObjectType: getObjectType,
    deepClone: deepClone,
    getCookie: getCookie,
    throttle: throttle,
    debounce: debounce,
    lastItem: lastItem,
    asyncSequentializer: asyncSequentializer,
    poll: poll,
    findFirstLeafNode: findFirstLeafNode,
    makeTree: makeTree,
    downFileByUrl: downFileByUrl,
    downFileByBlob: downFileByBlob,
    copyToClipboard: copyToClipboard
  });

  /**
   * 设备类型获取
   */

  function getDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
  }

  var trim = function trim(s) {
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


  var on = function on(element, event, handler) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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

  var off = function off(element, event, handler) {
    var useCapture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

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

  var once = function once(el, event, fn) {
    var listener = function listener() {
      if (fn) {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        fn.apply(this, args);
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

  function hasClass(el, cls) {
    if (!el || !cls) return false;
    if (cls.indexOf(" ") !== -1) throw new Error("className should not contain space.");

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

  function addClass(el, cls) {
    if (!el) return;
    var curClass = el.className;
    var classes = (cls || "").split(" ");

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
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

  function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(" ");
    var curClass = " " + el.className + " ";

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
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

  var getStyle = function getStyle(element, styleName) {
    styleName = camelCase(styleName);

    if (styleName === "float") {
      styleName = "cssFloat";
    }

    try {
      var style = element.style[styleName];
      if (style) return style;
      if (!document || !document.defaultView) return "";
      var computed = document.defaultView.getComputedStyle(element, "");
      return computed ? computed[styleName] : "";
    } catch (e) {
      return element.style[styleName];
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

  function setStyle(element, styleName, value) {
    if (!element || !styleName) return;

    if (isObject(styleName)) {
      Object.keys(styleName).forEach(function (prop) {
        setStyle(element, prop, styleName[prop]);
      });
    } else {
      styleName = camelCase(styleName);
      element.style[styleName] = value;
    }
  }
  /**
   * 移除元素样式
   *
   * @param element
   * @param style
   * @returns
   */

  function removeStyle(element, style) {
    if (!element || !style) return;

    if (isObject(style)) {
      Object.keys(style).forEach(function (prop) {
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

  var isScroll = function isScroll(el, isVertical) {
    var _overflow$match;

    var determinedDirection = isVertical === null || isVertical === undefined;
    var overflow = determinedDirection ? getStyle(el, "overflow") : isVertical ? getStyle(el, "overflow-y") : getStyle(el, "overflow-x");
    if (!overflow) return false;
    var len = (_overflow$match = overflow.match(/(scroll|auto)/)) === null || _overflow$match === void 0 ? void 0 : _overflow$match.length;
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

  var getScrollContainer = function getScrollContainer(el, isVertical) {
    var parent = el;

    while (parent) {
      if ([window, document, document.documentElement].includes(parent)) {
        return window;
      }

      if (isScroll(parent, isVertical)) {
        return parent;
      }

      parent = parent.parentNode;
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

  var isInContainer = function isInContainer(el, container) {
    if (!el || !container) return false;
    var elRect = el.getBoundingClientRect();
    var containerRect;

    if ([window, document, document.documentElement, null, undefined].includes(container)) {
      containerRect = {
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight,
        left: 0
      };
    } else {
      containerRect = container.getBoundingClientRect();
    }

    return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right;
  };
  /**
   * 元素距离文档顶部的位置
   *
   * @param el
   * @returns
   */

  var getOffsetTop = function getOffsetTop(el) {
    var offset = 0;
    var parent = el;

    while (parent) {
      offset += parent.offsetTop;
      parent = parent.offsetParent;
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

  var getOffsetTopDistance = function getOffsetTopDistance(el, containerEl) {
    return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl));
  };
  /**
   * 节点在浏览器窗口中的位置
   * @param{domNode} element 起始节点
   */

  function getElementOffsetRoot(element) {
    if (!element) return {
      left: 0,
      top: 0
    };
    var actualTop = element.offsetTop;
    var actualLeft = element.offsetLeft;
    var current = element.offsetParent;

    while (current !== null) {
      actualTop += current.offsetTop;
      actualLeft += current.offsetLeft;
      current = current.offsetParent;
    }

    var scroll = getTotalScrollOffsetRoot(element);
    return {
      top: actualTop - scroll.height,
      left: actualLeft - scroll.width
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

  function triggerEvent(el, eventType, detail) {
    el.dispatchEvent(new CustomEvent(eventType, {
      detail: detail
    }));
  }
  /**
   * 查找指定具备ClassName的父节点
   * @param pClassName
   * @param currentTarget
   * @param rootNode
   * @returns
   */

  function lookupParentNodeByClassName(pClassName, currentTarget, rootNode) {
    if (currentTarget === rootNode) {
      return null;
    }

    if (rootNode && !rootNode.contains(currentTarget)) {
      return null;
    }

    var tmp = currentTarget;

    while (tmp !== null && tmp !== rootNode) {
      var classList = tmp.classList;

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

  function clickProxy(pEl, cb) {
    var itemClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "item";
    on(pEl, "click", function (event) {
      var target = lookupParentNodeByClassName(itemClass, event.target, pEl);
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

  function elementIsVisibleInViewport(el) {
    var partiallyVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _el$getBoundingClient = el.getBoundingClientRect(),
        top = _el$getBoundingClient.top,
        left = _el$getBoundingClient.left,
        bottom = _el$getBoundingClient.bottom,
        right = _el$getBoundingClient.right;

    var _window = window,
        innerHeight = _window.innerHeight,
        innerWidth = _window.innerWidth;
    return partiallyVisible ? (top > 0 && top < innerHeight || bottom > 0 && bottom < innerHeight) && (left > 0 && left < innerWidth || right > 0 && right < innerWidth) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
  }
  /**
   * 是否滚动到底部
   *
   * @param target
   * @returns
   */

  function isScrollBottom(target) {
    var clientHeight = target.clientHeight;
    var scrollTop = target.scrollTop;
    var scrollHeight = target.scrollHeight;

    if (scrollHeight - scrollTop === clientHeight) {
      return true;
    }

    return false;
  }
  /**
   * 获取浏览器窗口的大小
   */

  function getViewport() {
    if (document.compatMode === "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      };
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      };
    }
  }
  /**
   * 相对于根节点的所有滚动总和
   * @param{domNode} element 起始节点
   */

  function getTotalScrollOffsetRoot(element) {
    var width = 0,
        height = 0;
    var pNode = element.parentNode;

    while (pNode !== null && pNode !== document) {
      width += pNode.scrollLeft;
      height += pNode.scrollTop;
      pNode = pNode.parentNode;
    }

    return {
      width: width,
      height: height
    };
  }

  var dom = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getDeviceType: getDeviceType,
    on: on,
    off: off,
    once: once,
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass,
    getStyle: getStyle,
    setStyle: setStyle,
    removeStyle: removeStyle,
    isScroll: isScroll,
    getScrollContainer: getScrollContainer,
    isInContainer: isInContainer,
    getOffsetTop: getOffsetTop,
    getOffsetTopDistance: getOffsetTopDistance,
    getElementOffsetRoot: getElementOffsetRoot,
    triggerEvent: triggerEvent,
    lookupParentNodeByClassName: lookupParentNodeByClassName,
    clickProxy: clickProxy,
    elementIsVisibleInViewport: elementIsVisibleInViewport,
    isScrollBottom: isScrollBottom,
    getViewport: getViewport,
    getTotalScrollOffsetRoot: getTotalScrollOffsetRoot
  });

  /**
   * IP地址
   */
  var REGEXP_IP = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/;
  /**
   * 字符串
   */

  var REGEXP_STRING = /^[a-zA-Z0-9-_:：（）\(\)\u4e00-\u9fa5]{1,30}$/;

  var reg = /*#__PURE__*/Object.freeze({
    __proto__: null,
    REGEXP_IP: REGEXP_IP,
    REGEXP_STRING: REGEXP_STRING
  });

  /**
   * 将时间统一转化为Date标准格式
   *
   * @param time
   * @returns
   */
  function toDate(time) {
    if (_typeof(time) === "object") {
      return time;
    }

    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time);
      } else {
        // 将ISO Date格式修改为GMT的时间格式
        // 2021-02-26T04:02:57:677Z
        // 2021-02-26T04:02:57.677Z
        time = time.replace(/:(.{3}z)$/gi, function (str, $1) {
          return ".".concat($1);
        });
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }

    return new Date(time);
  }
  /**
   * 解析时间
   *
   * @param time
   * @param format
   * @returns
   */


  function parseTime(time) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "{y}-{m}-{d} {h}:{i}:{s}";

    if (arguments.length === 0 || !time) {
      return null;
    }

    var date = toDate(time);
    var formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay()
    };
    var time_str = format.replace(/{([ymdhisa])+}/g, function (result, key) {
      var value = formatObj[key];

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

  function formatTime(time, option) {
    var d = toDate(time);
    var now = Date.now();
    var diff = (now - d) / 1000;

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

  var time = /*#__PURE__*/Object.freeze({
    __proto__: null,
    parseTime: parseTime,
    formatTime: formatTime
  });

  // 全局事件车
  var ENVENT_BUS_INSTANCES = new Map();
  /**
   * 生成事件车
   *
   * @returns
   */

  function makeOneBus() {
    var bus = mitt__default['default'](); // 仅触发一次的事件

    bus.once = function (eventType, handler) {
      var listener = function listener() {
        if (handler) {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          handler.apply(this, args);
        }

        bus.off(eventType, listener);
      };

      bus.on(eventType, listener);
    };

    return bus;
  }
  /**
   * 获取事件车实例
   *
   * @param instanceName
   * @returns
   */


  function getBus(instanceName) {
    if (!instanceName) {
      throw new Error("Event Bus Require One Instance Name");
    }

    var ins = ENVENT_BUS_INSTANCES.get(instanceName);

    if (ins) {
      return ins;
    }

    ins = makeOneBus();
    ENVENT_BUS_INSTANCES.set(instanceName, ins);
    return ins;
  }
  /**
   * 销毁所有的事件车
   */

  function destoryAllBus() {
    ENVENT_BUS_INSTANCES.clear();
  }

  var eventBus = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getBus: getBus,
    destoryAllBus: destoryAllBus
  });

  exports.dom = dom;
  exports.event = eventBus;
  exports.lib = lib;
  exports.reg = reg;
  exports.string = string;
  exports.time = time;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=weblibext.umd.js.map
