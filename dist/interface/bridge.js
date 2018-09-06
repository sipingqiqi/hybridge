/**
* 顶端按钮位置
*/
export var MenuPosition;
(function (MenuPosition) {
    MenuPosition[MenuPosition["LEFT"] = 1] = "LEFT";
    MenuPosition[MenuPosition["RIGHT"] = 2] = "RIGHT";
    MenuPosition[MenuPosition["BOTH"] = 3] = "BOTH";
})(MenuPosition || (MenuPosition = {}));
export var CloseType;
(function (CloseType) {
    CloseType[CloseType["CLOSE_AND_HOME"] = 1] = "CLOSE_AND_HOME";
    CloseType[CloseType["CLOSE"] = 2] = "CLOSE";
})(CloseType || (CloseType = {}));
export var ShareType;
(function (ShareType) {
    ShareType[ShareType["DEFAULT"] = 1] = "DEFAULT";
    ShareType[ShareType["WX_FRIEND"] = 2] = "WX_FRIEND";
    ShareType[ShareType["WX_TIMELINE"] = 3] = "WX_TIMELINE";
    ShareType[ShareType["QQ_FRIEND"] = 4] = "QQ_FRIEND";
    ShareType[ShareType["QQ_ZONE"] = 5] = "QQ_ZONE";
    ShareType[ShareType["WEIBO"] = 6] = "WEIBO";
})(ShareType || (ShareType = {}));
