"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
* 顶端按钮位置
*/
var MenuPosition = exports.MenuPosition = undefined;
(function (MenuPosition) {
    MenuPosition[MenuPosition["LEFT"] = 1] = "LEFT";
    MenuPosition[MenuPosition["RIGHT"] = 2] = "RIGHT";
    MenuPosition[MenuPosition["BOTH"] = 3] = "BOTH";
})(MenuPosition || (exports.MenuPosition = MenuPosition = {}));
var CloseType = exports.CloseType = undefined;
(function (CloseType) {
    CloseType[CloseType["CLOSE_AND_HOME"] = 1] = "CLOSE_AND_HOME";
    CloseType[CloseType["CLOSE"] = 2] = "CLOSE";
})(CloseType || (exports.CloseType = CloseType = {}));
var ShareType = exports.ShareType = undefined;
(function (ShareType) {
    ShareType[ShareType["DEFAULT"] = 1] = "DEFAULT";
    ShareType[ShareType["WX_FRIEND"] = 2] = "WX_FRIEND";
    ShareType[ShareType["WX_TIMELINE"] = 3] = "WX_TIMELINE";
    ShareType[ShareType["QQ_FRIEND"] = 4] = "QQ_FRIEND";
    ShareType[ShareType["QQ_ZONE"] = 5] = "QQ_ZONE";
    ShareType[ShareType["WEIBO"] = 6] = "WEIBO";
})(ShareType || (exports.ShareType = ShareType = {}));
var SignType = exports.SignType = undefined;
(function (SignType) {
    SignType[SignType["WRITTEN"] = 1] = "WRITTEN";
    SignType[SignType["PHOTO"] = 2] = "PHOTO";
    SignType[SignType["FACE"] = 3] = "FACE";
    SignType[SignType["COMMENT"] = 4] = "COMMENT";
})(SignType || (exports.SignType = SignType = {}));