"use strict";

var __assign = this && this.__assign || function () {
    return (__assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) for (var p in s = arguments[i]) Object.prototype.hasOwnProperty.call(s, p) && (t[p] = s[p]);
        return t;
    }).apply(this, arguments);
}, __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P = P || Promise)(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            var value;
            result.done ? resolve(result.value) : ((value = result.value) instanceof P ? value : new P(function (resolve) {
                resolve(value);
            })).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}, __generator = this && this.__generator || function (thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function () {
            if (1 & t[0]) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
    }, "function" == typeof Symbol && (g[Symbol.iterator] = function () {
        return this;
    }), g;
    function verb(n) {
        return function (v) {
            return function (op) {
                if (f) throw new TypeError("Generator is already executing.");
                for (; _;) try {
                    if (f = 1, y && (t = 2 & op[0] ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y),
                        0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                    switch (y = 0, t && (op = [2 & op[0], t.value]), op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;

                        case 4:
                            return _.label++, {
                                value: op[1],
                                done: !1
                            };

                        case 5:
                            _.label++, y = op[1], op = [0];
                            continue;

                        case 7:
                            op = _.ops.pop(), _.trys.pop();
                            continue;

                        default:
                            if (!(t = 0 < (t = _.trys).length && t[t.length - 1]) && (6 === op[0] || 2 === op[0])) {
                                _ = 0;
                                continue;
                            }
                            if (3 === op[0] && (!t || op[1] > t[0] && op[1] < t[3])) {
                                _.label = op[1];
                                break;
                            }
                            if (6 === op[0] && _.label < t[1]) {
                                _.label = t[1], t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2], _.ops.push(op);
                                break;
                            }
                            t[2] && _.ops.pop(), _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                } catch (e) {
                    op = [6, e], y = 0;
                } finally {
                        f = t = 0;
                    }
                if (5 & op[0]) throw op[1];
                return {
                    value: op[0] ? op[1] : void 0,
                    done: !0
                };
            }([n, v]);
        };
    }
}, __read = this && this.__read || function (o, n) {
    var m = "function" == typeof Symbol && o[Symbol.iterator];
    if (!m) return o;
    var r, e, i = m.call(o), ar = [];
    try {
        for (; (void 0 === n || 0 < n--) && !(r = i.next()).done;) ar.push(r.value);
    } catch (error) {
        e = {
            error: error
        };
    } finally {
        try {
            r && !r.done && (m = i.return) && m.call(i);
        } finally {
            if (e) throw e.error;
        }
    }
    return ar;
}, __spread = this && this.__spread || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};

function __export(m) {
    for (var p in m) exports.hasOwnProperty(p) || (exports[p] = m[p]);
}

var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : {
        default: mod
    };
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var keyframesSheet, add_px_to_style_1 = __importDefault(require("add-px-to-style")), hyphenate_style_name_1 = __importDefault(require("hyphenate-style-name")), wait = function () {
    return new Promise(function (accept) {
        requestAnimationFrame(function () {
            accept();
        });
    });
};

if (exports.isBrowser = "undefined" != typeof window, exports.isBrowser) {
    var styleElem = document.createElement("style");
    styleElem.setAttribute("id", "keyframesjs-stylesheet"), document.head.appendChild(styleElem),
        keyframesSheet = styleElem.sheet;
}

var clone = function (input) {
    return Array.isArray(input) ? __spread(input) : "object" == typeof input ? __assign({}, input) : input.toString();
}, voidFunction = function () { }, defaultCallbacks = {
    onStart: voidFunction,
    onBeforeStart: voidFunction,
    onIteration: voidFunction,
    onEnd: voidFunction,
    onQueueComplete: voidFunction,
    onCancel: voidFunction
}, objToCss = function (obj) {
    if (!Object.keys(obj).length) return "";
    var result = "";
    for (var key in obj) result += hyphenate_style_name_1.default(key) + ":" + add_px_to_style_1.default(key, obj[key]) + ";";
    return result;
}, Keyframes = function () {
    function Keyframes(elem, debug) {
        void 0 === debug && (debug = !1), this.playing = !1, this.previousCancel = voidFunction,
            this.debug = !1, this.queueStore = [], this.callbacks = defaultCallbacks, this.animationstartListener = voidFunction,
            this.animationendListener = voidFunction, this.animationiterationListener = voidFunction,
            this.animationcancelListener = voidFunction, this.mountedElement = elem, this.frozenStyles = [],
            this.debug = debug;
    }
    return Keyframes.isSupported = function () {
        return void 0 !== document.body.style.animationName;
    }, Keyframes.prototype.freeze = function () {
        var _this = this, ruleCache = Keyframes.ruleCache[this.mountedElement.style.animationName];
        if (ruleCache) {
            var computedStyle_1 = __assign({}, getComputedStyle(this.mountedElement));
            ruleCache.forEach(function (rule) {
                _this.mountedElement.style[rule] = computedStyle_1[rule];
            }), this.frozenStyles = __spread(new Set(this.frozenStyles.concat(ruleCache)));
        }
    }, Keyframes.prototype.unfreeze = function () {
        var _this = this;
        this.frozenStyles.length && (this.frozenStyles.forEach(function (rule) {
            _this.mountedElement.style[rule] = "";
        }), this.frozenStyles = []);
    }, Keyframes.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return this.log("reset"), this.playing = !1, this.removeEvents(), this.mountedElement.style.animationPlayState = "running",
                            this.mountedElement.style.animation = "none", [4, wait()];

                    case 1:
                        return _a.sent(), [2, this];
                }
            });
        });
    }, Keyframes.prototype.pause = function () {
        return this.mountedElement.style.animationPlayState = "paused", this;
    }, Keyframes.prototype.resume = function () {
        return this.mountedElement.style.animationPlayState = "running", this;
    }, Keyframes.prototype.play = function (animationOptions, callbacks) {
        var _this = this;
        this.log("play", animationOptions);
        var _a = callbacks || {}, _b = _a.onBeforeStart, onBeforeStart = void 0 === _b ? null : _b, _c = _a.onStart, onStart = void 0 === _c ? null : _c, _d = _a.onIteration, onIteration = void 0 === _d ? null : _d, _e = _a.onEnd, onEnd = void 0 === _e ? null : _e, _f = _a.onCancel, onCancel = void 0 === _f ? null : _f;
        if (!0 === this.playing && (this.log("cancelled"), this.previousCancel && (this.queueStore = [],
            this.previousCancel())), onCancel && (this.previousCancel = onCancel), this.mountedElement.style.animationName === this.getAnimationName(animationOptions)) return this.freeze(),
                requestAnimationFrame(function () {
                    return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    return [4, this.reset()];

                                case 1:
                                    return _a.sent(), this.play(animationOptions, callbacks), this.unfreeze(), [2];
                            }
                        });
                    });
                }), this;
        this.playing = !0;
        function addEvent(type, eventCallback) {
            var listenerName = type + "Listener";
            _this.mountedElement.removeEventListener(type, _this[listenerName]), _this[listenerName] = eventCallback,
                _this.mountedElement.addEventListener(type, _this[listenerName]);
        }
        var animationCount = Array.isArray(animationOptions) ? animationOptions.length : 1, animationcss = Keyframes.playCSS(animationOptions);
        return this.log("onBeforeStart"), onBeforeStart && onBeforeStart(), this.mountedElement.style.animationPlayState = "running",
            this.mountedElement.style.animation = animationcss, addEvent("animationiteration", function (e) {
                _this.log("animationiteration", e), onIteration && onIteration(e);
            }), addEvent("animationend", function (e) {
                --animationCount || (_this.log("ended", e), _this.playing = !1, onEnd && !animationCount && onEnd(e));
            }), addEvent("animationstart", function (e) {
                _this.log("onStart", e), onStart && onStart(e);
            }), this;
    }, Keyframes.prototype.playNext = function () {
        var _this = this, animationOption = this.queueStore[this.queueStore.length - 1];
        animationOption ? this.log("playNext", animationOption) : this.log("Queue Complete"),
            animationOption ? this.play(animationOption, {
                onEnd: function (e) {
                    _this.queueStore.pop(), _this.callbacks.onEnd && _this.callbacks.onEnd(e), _this.playNext();
                },
                onCancel: this.callbacks.onCancel,
                onIteration: this.callbacks.onIteration
            }) : this.callbacks.onQueueComplete && this.callbacks.onQueueComplete();
    }, Keyframes.prototype.removeEvents = function () {
        return this.log("events cleared"), this.mountedElement.removeEventListener("animationiteration", this.animationiterationListener),
            this.mountedElement.removeEventListener("animationend", this.animationendListener),
            this.mountedElement.removeEventListener("animationstart", this.animationstartListener),
            this;
    }, Keyframes.prototype.updateCallbacks = function (callbacks) {
        callbacks && (this.callbacks = __assign(__assign({}, this.callbacks), callbacks));
    }, Keyframes.prototype.queue = function (animationOptions, callbacks) {
        var _this = this, currentQueueLength = this.queueStore.length;
        this.updateCallbacks(__assign(__assign({}, defaultCallbacks), callbacks));
        var _animationOptions = clone(animationOptions);
        return Array.isArray(_animationOptions) ? this.queueStore = _animationOptions.reverse().concat(this.queueStore) : this.queueStore.unshift(_animationOptions),
            this.log("queued", animationOptions, currentQueueLength), currentQueueLength ? this.playing || this.playNext() : requestAnimationFrame(function () {
                return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                return [4, this.reset()];

                            case 1:
                                return _a.sent(), this.playNext(), [2];
                        }
                    });
                });
            }), this;
    }, Keyframes.prototype.chain = function (animationOptions, callbacks) {
        return this.queue(animationOptions, callbacks), this;
    }, Keyframes.prototype.resetQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return this.log("resetQueue"), [4, wait()];

                    case 1:
                        return _a.sent(), this.removeEvents(), this.queueStore = [], [4, this.reset()];

                    case 2:
                        return _a.sent(), [2, this];
                }
            });
        });
    }, Keyframes.prototype.loop = function (animationOptions, callbacks) {
        return void 0 === callbacks && (callbacks = {}), __awaiter(this, void 0, void 0, function () {
            var populateQueue, _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        return this.log("loop", animationOptions), [4, this.resetQueue()];

                    case 1:
                        return _a.sent(), (populateQueue = function () {
                            _this.queue(animationOptions, __assign(__assign({}, callbacks), {
                                onQueueComplete: function () {
                                    return populateQueue();
                                }
                            }));
                        })(), [2, this];
                }
            });
        });
    }, Keyframes.prototype.getAnimationName = function (animationObject) {
        var _this = this;
        return Array.isArray(animationObject) ? animationObject.map(function (o) {
            return _this.getAnimationName(o);
        }).join(", ") : "string" == typeof animationObject ? animationObject.split(" ")[0] : animationObject.name;
    }, Keyframes.playCSS = function (animationOptions) {
        function animObjToStr(obj) {
            var newObj = __assign({
                duration: "0s",
                timingFunction: "ease",
                delay: "0s",
                iterationCount: 1,
                direction: "normal",
                fillMode: "forwards"
            }, obj);
            return [newObj.name, newObj.duration, newObj.timingFunction, newObj.delay, newObj.iterationCount, newObj.direction, newObj.fillMode].join(" ");
        }
        if (Array.isArray(animationOptions)) {
            for (var animationOptionsStrings = [], i = 0; i < animationOptions.length; i += 1) {
                var option = animationOptions[i];
                animationOptionsStrings.push("string" == typeof option ? option : animObjToStr(option));
            }
            return animationOptionsStrings.join(", ");
        }
        return "string" == typeof animationOptions ? animationOptions : animObjToStr(animationOptions);
    }, Keyframes.generateCSS = function (frameData) {
        var css = "@keyframes " + frameData.name + " {";
        for (var key in frameData) {
            if ("name" !== key && "media" !== key && "complete" !== key) css += key + " {" + objToCss(frameData[key]) + "}";
        }
        return css += "}", frameData.media && (css = "@media " + frameData.media + "{" + css + "}"),
            css;
    }, Keyframes.generate = function (frameData) {
        this.addToRuleCache(frameData);
        var css = this.generateCSS(frameData), oldFrameIndex = Keyframes.rules.indexOf(frameData.name);
        -1 < oldFrameIndex && (Keyframes.sheet.deleteRule(oldFrameIndex), Keyframes.rules.splice(oldFrameIndex, 1));
        var ruleIndex = (Keyframes.sheet.cssRules || Keyframes.sheet.rules).length;
        Keyframes.sheet.insertRule(css, ruleIndex), Keyframes.rules[ruleIndex] = frameData.name;
    }, Keyframes.define = function (frameOptions) {
        if (Array.isArray(frameOptions)) for (var i = 0; i < frameOptions.length; i += 1) this.generate(frameOptions[i]); else this.generate(frameOptions);
    }, Keyframes.defineCSS = function (frameOptions) {
        if (Array.isArray(frameOptions)) {
            for (var css = "", i = 0; i < frameOptions.length; i += 1) css += this.generateCSS(frameOptions[i]);
            return css;
        }
        return this.generateCSS(frameOptions);
    }, Keyframes.addToRuleCache = function (frameData) {
        if (!this.ruleCache[frameData.name]) {
            var rules = Object.values(frameData).filter(function (v) {
                return "object" == typeof v;
            }).map(function (v) {
                return Object.keys(v);
            }).flat();
            this.ruleCache[frameData.name] = __spread(new Set(rules));
        }
    }, Keyframes.prototype.log = function (msg) {
        for (var detail = [], _i = 1; _i < arguments.length; _i++) detail[_i - 1] = arguments[_i];
        this.debug;
    }, Keyframes.sheet = keyframesSheet, Keyframes.rules = [], Keyframes.ruleCache = {},
        Keyframes.clearRules = function () {
            for (Keyframes.rules = []; Keyframes.sheet.cssRules.length;) Keyframes.sheet.deleteRule(0);
        }, Keyframes;
}();

exports.isBrowser && (window.Keyframes = Keyframes), __export(require("./pathfinder")),
    __export(require("./spritesheet")), exports.default = Keyframes;
