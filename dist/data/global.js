'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var global = exports.global = typeof window !== 'undefined' ? window : {
    HQAppGetH5Header: function HQAppGetH5Header() {},
    app2js_onDataResult: function app2js_onDataResult(type, data) {},
    notifyCommandFromNative: function notifyCommandFromNative() {},
    gobackbtn: function gobackbtn(pathName) {},
    ostype: function ostype() {
        return '';
    },
    token: function token() {
        return '';
    },

    cookie: {},
    HQAppJSInterface: undefined,
    jsBridge: {},
    __js_bridge_mode__: ''
};