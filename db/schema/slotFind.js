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
// import { config } from "../../src/apiGoogleconfig.json";
// import moment from "moment";
// import setSeconds from "date-fns/setSeconds";
// import setMinutes from "date-fns/setMinutes";
// import setHours from "date-fns/setHours";
// import { google } from "googleapis";
var config = require("./apiGoogleconfig.json");
var moment = require("moment");
var axios = require("axios");
// const google = require("googleapis");
function getAccessToken(refresh_token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("https://oauth2.googleapis.com/token", {
                            refresh_token: refresh_token,
                            client_id: "272589905349-scqfilok0ucok40j6h6eo9pcsp7bhadd.apps.googleusercontent.com",
                            client_secret: "vpM3s6IXDLcmZtNpkOFbeQMg",
                            redirect_uri: "http://localhost:3000",
                            grant_type: "refresh_token"
                        })];
                case 1:
                    response = _a.sent();
                    // console.log("acccess");
                    // console.log(response.data.access_token);
                    // console.log(response.status);
                    // console.log(response.statusText);
                    return [2 /*return*/, Promise.resolve(response.data.access_token)];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.response.status, error_1.response.statusText, error_1.response.data);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function slotQuery(refreshCode) {
    return __awaiter(this, void 0, void 0, function () {
        var accessToken, loading;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAccessToken(refreshCode)];
                case 1:
                    accessToken = _a.sent();
                    console.log(accessToken);
                    loading = gapi.load("client:auth2", function () {
                        gapi.client
                            .init({
                            apiKey: config.config.apiKey,
                            clientId: config.config.clientId,
                            discoveryDocs: config.config.discoveryDocs,
                            scope: config.config.scope
                        })
                            .then(function () {
                            console.log("SET ACCESS TOKEN");
                            gapi.client.setToken({
                                access_token: accessToken
                            });
                        }, function (error) {
                            console.log("An error in Accessing Account");
                        })
                            .then(function () {
                            console.log("CREATE EVENT LIST");
                            gapi.client.calendar.events
                                .list({
                                calendarId: "primary",
                                timeMin: new Date().toISOString(),
                                showDeleted: false,
                                singleEvents: true,
                                maxResults: 10,
                                orderBy: "startTime"
                            })
                                .then(function (response) {
                                console.log("CREATE ARRAY");
                                var events = response.result.items;
                                var rv = events.map(function (event) { return ({
                                    start: moment.utc(event.start.dateTime).toDate().toISOString(),
                                    end: moment.utc(event.end.dateTime).toDate().toISOString()
                                }); });
                                rv.map(function (item) {
                                    console.log(item);
                                });
                                //return rv;
                            });
                        });
                    });
                    return [2 /*return*/, loading];
            }
        });
    });
}
slotQuery("1//06UBcPVmhaK0PCgYIARAAGAYSNwF-L9IrW4nBJnd6zOqWTh3jDgWHq3iCG5V_v5m-loT5yHpTJJJI3ni8WJg131MCSM3pZYOM-Vs");
exports["default"] = slotQuery;
