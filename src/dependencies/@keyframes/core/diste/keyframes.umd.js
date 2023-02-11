(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

module.exports = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};
},{}],2:[function(require,module,exports){
'use strict';

/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};

function toHyphenLower(match) {
  return '-' + match.toLowerCase()
}

function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name]
  }

  var hName = name.replace(uppercasePattern, toHyphenLower);
  return (cache[name] = msPattern.test(hName) ? '-' + hName : hName)
}

module.exports = hyphenateStyleName;

},{}],3:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var add_px_to_style_1 = __importDefault(require("add-px-to-style"));
var hyphenate_style_name_1 = __importDefault(require("hyphenate-style-name"));
var wait = function () {
    return new Promise(function (accept) {
        requestAnimationFrame(function () {
            accept();
        });
    });
};
exports.isBrowser = typeof window !== "undefined";
var keyframesSheet;
if (exports.isBrowser) {
    var styleElem = document.createElement("style");
    styleElem.setAttribute("id", "keyframesjs-stylesheet");
    document.head.appendChild(styleElem);
    keyframesSheet = styleElem.sheet;
}
var clone = function (input) {
    if (Array.isArray(input)) {
        return __spread(input);
    }
    else if (typeof input === "object") {
        return __assign({}, input);
    }
    else {
        return input.toString();
    }
};
var voidFunction = function () {
    return;
};
var defaultCallbacks = {
    onStart: voidFunction,
    onBeforeStart: voidFunction,
    onIteration: voidFunction,
    onEnd: voidFunction,
    onQueueComplete: voidFunction,
    onCancel: voidFunction
};
var objToCss = function (obj) {
    if (!Object.keys(obj).length) {
        return "";
    }
    var result = "";
    for (var key in obj) {
        result += hyphenate_style_name_1.default(key) + ":" + add_px_to_style_1.default(key, obj[key]) + ";";
    }
    return result;
};
var Keyframes = (function () {
    function Keyframes(elem, debug) {
        if (debug === void 0) { debug = false; }
        this.playing = false;
        this.previousCancel = voidFunction;
        this.debug = false;
        this.queueStore = [];
        this.callbacks = defaultCallbacks;
        this.animationstartListener = voidFunction;
        this.animationendListener = voidFunction;
        this.animationiterationListener = voidFunction;
        this.animationcancelListener = voidFunction;
        this.mountedElement = elem;
        this.frozenStyles = [];
        this.debug = debug;
    }
    Keyframes.isSupported = function () {
        return document.body.style.animationName !== undefined;
    };
    Keyframes.prototype.freeze = function () {
        var _this = this;
        var ruleCache = Keyframes.ruleCache[this.mountedElement.style.animationName];
        if (ruleCache) {
            var computedStyle_1 = __assign({}, getComputedStyle(this.mountedElement));
            ruleCache.forEach(function (rule) {
                _this.mountedElement.style[rule] = computedStyle_1[rule];
            });
            this.frozenStyles = __spread(new Set(this.frozenStyles.concat(ruleCache)));
        }
    };
    Keyframes.prototype.unfreeze = function () {
        var _this = this;
        if (this.frozenStyles.length) {
            this.frozenStyles.forEach(function (rule) {
                _this.mountedElement.style[rule] = "";
            });
            this.frozenStyles = [];
        }
    };
    Keyframes.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("reset");
                        this.playing = false;
                        this.removeEvents();
                        this.mountedElement.style.animationPlayState = "running";
                        this.mountedElement.style.animation = "none";
                        return [4, wait()];
                    case 1:
                        _a.sent();
                        return [2, this];
                }
            });
        });
    };
    Keyframes.prototype.pause = function () {
        this.mountedElement.style.animationPlayState = "paused";
        return this;
    };
    Keyframes.prototype.resume = function () {
        this.mountedElement.style.animationPlayState = "running";
        return this;
    };
    Keyframes.prototype.play = function (animationOptions, callbacks) {
        var _this = this;
        this.log("play", animationOptions);
        var _a = callbacks || {}, _b = _a.onBeforeStart, onBeforeStart = _b === void 0 ? null : _b, _c = _a.onStart, onStart = _c === void 0 ? null : _c, _d = _a.onIteration, onIteration = _d === void 0 ? null : _d, _e = _a.onEnd, onEnd = _e === void 0 ? null : _e, _f = _a.onCancel, onCancel = _f === void 0 ? null : _f;
        if (this.playing === true) {
            this.log("cancelled");
            if (this.previousCancel) {
                this.queueStore = [];
                this.previousCancel();
            }
        }
        if (onCancel) {
            this.previousCancel = onCancel;
        }
        if (this.mountedElement.style.animationName ===
            this.getAnimationName(animationOptions)) {
            this.freeze();
            requestAnimationFrame(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.reset()];
                        case 1:
                            _a.sent();
                            this.play(animationOptions, callbacks);
                            this.unfreeze();
                            return [2];
                    }
                });
            }); });
            return this;
        }
        this.playing = true;
        var animationCount = Array.isArray(animationOptions)
            ? animationOptions.length
            : 1;
        var animationcss = Keyframes.playCSS(animationOptions);
        var addEvent = function (type, eventCallback) {
            var listenerName = type + "Listener";
            _this.mountedElement.removeEventListener(type, _this[listenerName]);
            _this[listenerName] = eventCallback;
            _this.mountedElement.addEventListener(type, _this[listenerName]);
        };
        this.log("onBeforeStart");
        if (onBeforeStart) {
            onBeforeStart();
        }
        this.mountedElement.style.animationPlayState = "running";
        this.mountedElement.style.animation = animationcss;
        addEvent("animationiteration", function (e) {
            _this.log("animationiteration", e);
            if (onIteration) {
                onIteration(e);
            }
        });
        addEvent("animationend", function (e) {
            animationCount -= 1;
            if (!animationCount) {
                _this.log("ended", e);
                _this.playing = false;
                if (onEnd && !animationCount) {
                    onEnd(e);
                }
            }
        });
        addEvent("animationstart", function (e) {
            _this.log("onStart", e);
            if (onStart) {
                onStart(e);
            }
        });
        return this;
    };
    Keyframes.prototype.playNext = function () {
        var _this = this;
        var animationOption = this.queueStore[this.queueStore.length - 1];
        if (animationOption) {
            this.log("playNext", animationOption);
        }
        else {
            this.log("Queue Complete");
        }
        if (animationOption) {
            this.play(animationOption, {
                onEnd: function (e) {
                    _this.queueStore.pop();
                    if (_this.callbacks.onEnd) {
                        _this.callbacks.onEnd(e);
                    }
                    _this.playNext();
                },
                onCancel: this.callbacks.onCancel,
                onIteration: this.callbacks.onIteration
            });
        }
        else if (this.callbacks.onQueueComplete) {
            this.callbacks.onQueueComplete();
        }
    };
    Keyframes.prototype.removeEvents = function () {
        this.log("events cleared");
        this.mountedElement.removeEventListener("animationiteration", this.animationiterationListener);
        this.mountedElement.removeEventListener("animationend", this.animationendListener);
        this.mountedElement.removeEventListener("animationstart", this.animationstartListener);
        return this;
    };
    Keyframes.prototype.updateCallbacks = function (callbacks) {
        if (callbacks) {
            this.callbacks = __assign(__assign({}, this.callbacks), callbacks);
        }
    };
    Keyframes.prototype.queue = function (animationOptions, callbacks) {
        var _this = this;
        var currentQueueLength = this.queueStore.length;
        this.updateCallbacks(__assign(__assign({}, defaultCallbacks), callbacks));
        var _animationOptions = clone(animationOptions);
        if (Array.isArray(_animationOptions)) {
            this.queueStore = _animationOptions.reverse().concat(this.queueStore);
        }
        else {
            this.queueStore.unshift(_animationOptions);
        }
        this.log("queued", animationOptions, currentQueueLength);
        if (!currentQueueLength) {
            requestAnimationFrame(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.reset()];
                        case 1:
                            _a.sent();
                            this.playNext();
                            return [2];
                    }
                });
            }); });
        }
        else if (!this.playing) {
            this.playNext();
        }
        return this;
    };
    Keyframes.prototype.chain = function (animationOptions, callbacks) {
        console.warn("Keyframes: .chain is deprecated, please use .queue");
        this.queue(animationOptions, callbacks);
        return this;
    };
    Keyframes.prototype.resetQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("resetQueue");
                        return [4, wait()];
                    case 1:
                        _a.sent();
                        this.removeEvents();
                        this.queueStore = [];
                        return [4, this.reset()];
                    case 2:
                        _a.sent();
                        return [2, this];
                }
            });
        });
    };
    Keyframes.prototype.loop = function (animationOptions, callbacks) {
        if (callbacks === void 0) { callbacks = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var populateQueue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("loop", animationOptions);
                        return [4, this.resetQueue()];
                    case 1:
                        _a.sent();
                        populateQueue = function () {
                            _this.queue(animationOptions, __assign(__assign({}, callbacks), { onQueueComplete: function () { return populateQueue(); } }));
                        };
                        populateQueue();
                        return [2, this];
                }
            });
        });
    };
    Keyframes.prototype.getAnimationName = function (animationObject) {
        var _this = this;
        if (Array.isArray(animationObject)) {
            return animationObject.map(function (o) { return _this.getAnimationName(o); }).join(", ");
        }
        if (typeof animationObject === "string") {
            return animationObject.split(" ")[0];
        }
        return animationObject.name;
    };
    Keyframes.playCSS = function (animationOptions) {
        var animObjToStr = function (obj) {
            var newObj = __assign({ duration: "0s", timingFunction: "ease", delay: "0s", iterationCount: 1, direction: "normal", fillMode: "forwards" }, obj);
            return [
                newObj.name,
                newObj.duration,
                newObj.timingFunction,
                newObj.delay,
                newObj.iterationCount,
                newObj.direction,
                newObj.fillMode
            ].join(" ");
        };
        if (Array.isArray(animationOptions)) {
            var animationOptionsStrings = [];
            for (var i = 0; i < animationOptions.length; i += 1) {
                var option = animationOptions[i];
                animationOptionsStrings.push(typeof option === "string" ? option : animObjToStr(option));
            }
            return animationOptionsStrings.join(", ");
        }
        if (typeof animationOptions === "string") {
            return animationOptions;
        }
        return animObjToStr(animationOptions);
    };
    Keyframes.generateCSS = function (frameData) {
        var css = "@keyframes " + frameData.name + " {";
        for (var key in frameData) {
            if (key !== "name" && key !== "media" && key !== "complete") {
                var cssRuleObject = objToCss(frameData[key]);
                css += key + " {" + cssRuleObject + "}";
            }
        }
        css += "}";
        if (frameData.media) {
            css = "@media " + frameData.media + "{" + css + "}";
        }
        return css;
    };
    Keyframes.generate = function (frameData) {
        this.addToRuleCache(frameData);
        var css = this.generateCSS(frameData);
        var oldFrameIndex = Keyframes.rules.indexOf(frameData.name);
        if (oldFrameIndex > -1) {
            Keyframes.sheet.deleteRule(oldFrameIndex);
            Keyframes.rules.splice(oldFrameIndex, 1);
        }
        var ruleIndex = (Keyframes.sheet.cssRules || Keyframes.sheet.rules)
            .length;
        Keyframes.sheet.insertRule(css, ruleIndex);
        Keyframes.rules[ruleIndex] = frameData.name;
    };
    Keyframes.define = function (frameOptions) {
        if (Array.isArray(frameOptions)) {
            for (var i = 0; i < frameOptions.length; i += 1) {
                this.generate(frameOptions[i]);
            }
        }
        else {
            this.generate(frameOptions);
        }
    };
    Keyframes.defineCSS = function (frameOptions) {
        if (Array.isArray(frameOptions)) {
            var css = "";
            for (var i = 0; i < frameOptions.length; i += 1) {
                css += this.generateCSS(frameOptions[i]);
            }
            return css;
        }
        return this.generateCSS(frameOptions);
    };
    Keyframes.addToRuleCache = function (frameData) {
        if (!this.ruleCache[frameData.name]) {
            var rules = Object.values(frameData)
                .filter(function (v) { return typeof v === "object"; })
                .map(function (v) { return Object.keys(v); })
                .flat();
            this.ruleCache[frameData.name] = __spread(new Set(rules));
        }
    };
    Keyframes.prototype.log = function (msg) {
        var detail = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            detail[_i - 1] = arguments[_i];
        }
        if (this.debug) {
            console.log.apply(console, __spread([msg], detail));
        }
    };
    Keyframes.sheet = keyframesSheet;
    Keyframes.rules = [];
    Keyframes.ruleCache = {};
    Keyframes.clearRules = function () {
        Keyframes.rules = [];
        while (Keyframes.sheet.cssRules.length) {
            Keyframes.sheet.deleteRule(0);
        }
    };
    return Keyframes;
}());
if (exports.isBrowser) {
    window.Keyframes = Keyframes;
}
__export(require("./pathfinder"));
__export(require("./spritesheet"));
exports.default = Keyframes;

},{"./pathfinder":4,"./spritesheet":5,"add-px-to-style":1,"hyphenate-style-name":2}],4:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var keyframes_1 = require("./keyframes");
function getCirclePoint(radians, radius, center) {
    return {
        x: center.x + radius * Math.cos(radians),
        y: center.y + radius * Math.sin(radians)
    };
}
var coord = function (x, y) {
    if (x === void 0) { x = 0; }
    if (y === void 0) { y = 0; }
    return { x: x, y: y };
};
var B1 = function (t) { return t * t * t; };
var B2 = function (t) { return 3 * t * t * (1 - t); };
var B3 = function (t) { return 3 * t * (1 - t) * (1 - t); };
var B4 = function (t) { return (1 - t) * (1 - t) * (1 - t); };
var getBezier = function (percent, C1, C2, C3, C4) {
    var pos = coord();
    pos.x =
        C1.x * B1(percent) +
            C2.x * B2(percent) +
            C3.x * B3(percent) +
            C4.x * B4(percent);
    pos.y =
        C1.y * B1(percent) +
            C2.y * B2(percent) +
            C3.y * B3(percent) +
            C4.y * B4(percent);
    return pos;
};
exports.bezierPath = function (keyframeOptions, p1, p2, p3, p4) {
    var opts = __assign({ bezierSteps: 100, transform: "" }, keyframeOptions);
    if (p4 == null) {
        p4 = p1;
    }
    var vector1 = coord(p1[0], p1[1]);
    var vector2 = coord(p2[0], p2[1]);
    var vector3 = coord(p3[0], p3[1]);
    var vector4 = coord(p4[0], p4[1]);
    var points = {};
    var step = 1 / opts.bezierSteps;
    for (var i = 0; i <= 1.01; i += step) {
        var newPosition = getBezier(i, vector1, vector4, vector3, vector2);
        points[100 - Math.round(i * 100) + "%"] = {
            transform: "translate(" + newPosition.x + "px," + newPosition.y + "px) " + opts.transform
        };
    }
    return Object.assign({}, keyframeOptions, points);
};
exports.circlePath = function (keyframeOptions, center, radius) {
    var opts = __assign({ circleSteps: 100, transform: "" }, keyframeOptions);
    var points = {};
    var newCenter = coord(center[0], center[1]);
    var pieandahalf = 1.5 * Math.PI;
    var notmuchpie = Math.PI / 180;
    var stepPercentage = 100 / opts.circleSteps;
    var stepDegree = 360 / opts.circleSteps;
    for (var i = 0; i <= opts.circleSteps; i += 1) {
        var degree = stepDegree * i;
        var radians = pieandahalf + degree * notmuchpie;
        var newpos = getCirclePoint(radians, radius, newCenter);
        points[Math.round(stepPercentage * i) + "%"] = {
            transform: "translate(" + newpos.x + "px," + newpos.y + "px) " + opts.transform
        };
    }
    for (var step in keyframeOptions) {
        var rules = keyframeOptions[step];
        for (var newstep in points) {
            var newrules = points[newstep];
            if (step === newstep) {
                if (newrules.transform && rules.transform) {
                    points[newstep].transform = newrules.transform + " " + rules.transform;
                    break;
                }
            }
        }
    }
    return Object.assign({}, keyframeOptions, points);
};
if (keyframes_1.isBrowser) {
    var _window = window;
    if (_window.Keyframes) {
        _window.Keyframes.bezierPath = exports.bezierPath;
        _window.Keyframes.circlePath = exports.circlePath;
    }
}

},{"./keyframes":3}],5:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var keyframes_1 = require("./keyframes");
exports.spriteSheet = function (_a) {
    var _b = _a.rows, rows = _b === void 0 ? 1 : _b, _c = _a.cols, cols = _c === void 0 ? 1 : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e, rest = __rest(_a, ["rows", "cols", "width", "height"]);
    var defaults = {
        offsetX: 0,
        offsetY: 0,
        count: rows * cols,
        spriteWidth: width / cols,
        spriteHeight: height / rows,
        loop: true,
    };
    var opts = __assign(__assign(__assign({}, defaults), { rows: rows, cols: cols, width: width, height: height }), rest);
    var spriteStep = 100 / opts.count;
    var spriteFrames = {};
    var x = opts.offsetX;
    var y = opts.offsetY;
    for (var i = 0; i < opts.count; i += 1) {
        spriteFrames[Math.round(spriteStep * i) + "%"] = {
            backgroundPosition: "-" + x + "px -" + y + "px",
        };
        if (x >= opts.width - opts.spriteWidth) {
            y += opts.spriteHeight;
        }
        else {
            x += opts.spriteWidth;
        }
    }
    return Object.assign({}, { name: opts.name }, spriteFrames);
};
exports.playSpriteSheet = function (name, time, loops) {
    if (loops === void 0) { loops = 'infinite'; }
    if (loops && loops < 0) {
        loops = 'infinite';
    }
    return name + " " + time + " steps(1) " + loops;
};
if (keyframes_1.isBrowser) {
    var _window = window;
    if (_window.Keyframes) {
        _window.Keyframes.spriteSheet = exports.spriteSheet;
        _window.Keyframes.playSpriteSheet = exports.playSpriteSheet;
    }
}

},{"./keyframes":3}]},{},[3]);
