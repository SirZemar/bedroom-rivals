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
