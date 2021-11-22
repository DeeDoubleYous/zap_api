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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImage = exports.uploadImage = void 0;
var makeDatePath = function () {
    var date = new Date(Date.now());
    return date.getFullYear() + "_" + (date.getMonth() + 1) + "_" + date.getDate();
};
var makeProperName = function (originalName) {
    return originalName.replace(/\s/g, '');
};
/**
 * Takes an image upload and stores it to the server local disk while returning the path to return to it to be saved in the database.
 * If Passed multiple files will only take the first.
 * @param img
 * @returns The url to find the stored image
 */
var uploadImage = function (img) { return __awaiter(void 0, void 0, void 0, function () {
    var url, fImg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                url = '';
                if ('mv' in img) {
                    fImg = img;
                }
                else {
                    fImg = img[0];
                }
                url = "./public/images/" + makeDatePath() + "/" + makeProperName(fImg.name);
                return [4 /*yield*/, fImg.mv(url)];
            case 1:
                _a.sent();
                return [2 /*return*/, url];
        }
    });
}); };
exports.uploadImage = uploadImage;
/**
 * Updates the image at the url on the server with the given image
 * @param img
 * @param originalUrl
 */
var updateImage = function (img, originalUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var fImg;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if ('mv' in img) {
                    fImg = img;
                }
                else {
                    fImg = img[0];
                }
                return [4 /*yield*/, fImg.mv(originalUrl)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateImage = updateImage;
