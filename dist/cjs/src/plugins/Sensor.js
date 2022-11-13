"use strict";
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
exports.__esModule = true;
var onoff_1 = require("onoff");
var HCSR501 = /** @class */ (function () {
    /**
     * @param sensorPin GPIO Pin
     * @param delay Delay in ms to stop motion detection
     */
    function HCSR501(sensorPin, delay) {
        this.sensorPin = sensorPin;
        this.sensor = new onoff_1.Gpio(sensorPin, "in", "both");
        if (delay) {
            this.delay = delay;
        }
    }
    HCSR501.prototype.watch = function (cb) {
        var _this = this;
        try {
            var timeout_1;
            var motionState_1 = false; // Prevent multiple true outputs in a row
            this.sensor.watch(function (err, value) {
                if (err) {
                    throw Error(err);
                }
                else {
                    if (value === 0) {
                        timeout_1 = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                motionState_1 = false;
                                cb(false);
                                return [2 /*return*/];
                            });
                        }); }, _this.delay !== undefined && _this.delay >= 3000 ? _this.delay : 3000); // 3000 ms by default to prevent false output if motion exists
                    }
                    else if (value === 1) {
                        timeout_1 && clearTimeout(timeout_1);
                        if (motionState_1 === false) {
                            motionState_1 = true;
                            cb(true);
                        }
                    }
                }
            });
        }
        catch (err) {
            throw Error(err);
        }
    };
    return HCSR501;
}());
exports["default"] = HCSR501;
