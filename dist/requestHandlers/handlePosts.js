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
exports.handleUpdates = exports.handlePost = void 0;
var databaseLookup_1 = require("../tools/databaseLookup");
var imageStore_1 = require("../tools/imageStore");
/**
 * Handles creating the data on the database so that it doesn't have to be done in the app.js file.
 * @param req
 * @returns The status of the request and id of the inserted item.
 */
var handlePost = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var status, data, imageUrl, time, isDead, location_1, deathType, note, sql, params, result, e_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = 500, data = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(req.body.time && ((_a = req.files) === null || _a === void 0 ? void 0 : _a.pangolinImage) && req.body.isDead && req.body.location)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, imageStore_1.uploadImage)(req.files.pangolinImage)];
            case 2:
                imageUrl = _b.sent(), time = req.body.time, isDead = req.body.isDead, location_1 = req.body.location;
                deathType = null, note = null;
                if (req.body.deathType)
                    deathType = req.body.deathType;
                if (req.body.note)
                    note = req.body.note;
                sql = "INSERT INTO PangolinStore (time, imageUrl, isDead, location" + (deathType ? ', deathType' : '') + " " + (note ? ', note' : '') + ") VALUES(?, ?, ?, ? " + (deathType ? ', ?' : '') + " " + (note ? ', ?' : '') + ")";
                params = [time, imageUrl, isDead, location_1];
                deathType && params.push(deathType);
                note && params.push(note);
                return [4 /*yield*/, (0, databaseLookup_1.executeQuery)(sql, params)];
            case 3:
                result = _b.sent();
                if ('affectedRows' in result) {
                    status = 201;
                    data = { id: result.insertId };
                }
                return [3 /*break*/, 5];
            case 4:
                status = 204;
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_1 = _b.sent();
                console.error(e_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, { status: status, data: data }];
        }
    });
}); };
exports.handlePost = handlePost;
/**
 * Handles updating the data in the server so that this doesn't have to be done in the app.js file.
 * @param req
 * @returns The status of the request and the id of the affected data
 */
var handleUpdates = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var status, data, id, time, isDead, location_2, deathType, note, sql, params, result, e_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                status = 500, data = null;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, , 7]);
                if (!(req.body.id && req.body.time && ((_a = req.files) === null || _a === void 0 ? void 0 : _a.updatedImage) && req.body.originalUrl && req.body.isDead && req.body.location)) return [3 /*break*/, 4];
                id = req.body.id, time = req.body.time, isDead = req.body.isDead, location_2 = req.body.location;
                deathType = null, note = null;
                if (req.body.deathType) {
                    deathType = req.body.deathType;
                }
                if (req.body.note) {
                    note = req.body.note;
                }
                sql = "UPDATE PangolinStore SET time = ?, isDead = ?, location = ?" + (deathType ? ', deathType = ?' : '') + (note ? ', note = ?' : '') + " WHERE id = ?";
                params = [time, isDead, location_2];
                deathType && params.push(deathType);
                note && params.push(note);
                params.push(id);
                return [4 /*yield*/, (0, databaseLookup_1.executeQuery)(sql, params)];
            case 2:
                result = _b.sent();
                if ('affectedRows' in result) {
                    status = 201;
                    data = { id: id };
                }
                return [4 /*yield*/, (0, imageStore_1.updateImage)(req.files.updatedImage, req.body.originalUrl)];
            case 3:
                _b.sent();
                return [3 /*break*/, 5];
            case 4:
                status = 204;
                _b.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                e_2 = _b.sent();
                console.error(e_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/, { status: status, data: data }];
        }
    });
}); };
exports.handleUpdates = handleUpdates;
