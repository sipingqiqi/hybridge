"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.deleteCookie = deleteCookie;
exports.ostype = ostype;
exports.token = token;
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
}
function getCookie(name) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] === name) {
            return unescape(temp[1]);
        }
    }
    return null;
}
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    }
}
function ostype() {
    return getCookie('hq_http_ostype');
}
function token() {
    return getCookie('hq_http_usertoken');
}