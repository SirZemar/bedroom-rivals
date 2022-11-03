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
