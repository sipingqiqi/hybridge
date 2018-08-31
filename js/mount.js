'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.goBack = exports.shareShareEntry = exports.sendSms = exports.showPosterDetail = exports.nativeAjax = exports.showRiskArr = exports.showShareArr = exports.showShareBtn = exports.wechatShare = exports.shareShare = exports.callCameraMultiple = exports.takeUserImageMultiple = exports.closeWebview = exports.getCustomer = exports.getJob = exports.caSign = exports.getBank = exports.saveImage = exports.idCardScan = exports.callAddress = exports.tailorCamera = exports.callCamera = exports.startAudioRec = exports.viewPdf = exports.articleDetail = exports.rightMenu = exports.toggleMenu = exports.leftMenu = exports.toggleSearch = exports.openSearch = exports.mount = undefined;

var _global = require('./data/global');

var _data = require('./data/data');

var _cookie = require('./util/cookie');

var _api = require('./data/api');

var _app = require('./data/app');

var _bridge = require('./bridge/impl/browser/bridge');

var NativeBridge = _interopRequireWildcard(_bridge);

var BrowserBridge = _interopRequireWildcard(_bridge);

var _callback = require('./bridge/impl/browser/callback');

var NativeCallback = _interopRequireWildcard(_callback);

var BrowserCallback = _interopRequireWildcard(_callback);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var EnvType;
(function (EnvType) {
    EnvType[EnvType["NATIVE"] = 0] = "NATIVE";
    EnvType[EnvType["WECHAT"] = 1] = "WECHAT";
    EnvType[EnvType["BROWSER"] = 2] = "BROWSER";
})(EnvType || (EnvType = {}));

function attach(bridge, callback) {
    _global.global.HQAppGetH5Header = callback.onReady;
    _global.global.app2js_onDataResult = callback.onDataResult;
    _global.global.notifyCommandFromNative = callback.notifyCommandFromNative;
    console.log('for (let key in bridge) {');
    for (var key in bridge) {
        console.log('key: [' + bridge.openSearch + ']');
        _global.global[key] = bridge[key];
    }
}
function isApp() {
    return _global.global.HQAppJSInterface ? true : false;
}
function isWechat() {
    if (!_global.global.navigator) {
        return false;
    }
    return (/micromessenger/i.test(_global.global.navigator.userAgent) ? true : false
    );
}
function getMode() {
    if (isApp()) {
        return EnvType.NATIVE;
    } else if (isWechat()) {
        // 暂时不支持微信的 JS-SDK 特性，按纯 H5 的方式处理
        return EnvType.BROWSER;
    } else {
        return EnvType.BROWSER;
    }
}
function createBridge() {
    switch (getMode()) {
        case EnvType.NATIVE:
            return NativeBridge;
        case EnvType.BROWSER:
            return BrowserBridge;
    }
}
function createCallback() {
    switch (getMode()) {
        case EnvType.NATIVE:
            return NativeCallback;
        case EnvType.BROWSER:
            return BrowserCallback;
    }
}
function getModeName() {
    switch (getMode()) {
        case EnvType.NATIVE:
            return 'native';
        case EnvType.BROWSER:
            return 'browser';
    }
}
var bridge = createBridge();
var callback = createCallback();
var mount = exports.mount = function mount(services, vue) {
    for (var key in services) {
        _api.api[key] = services[key];
    }
    _app.app.vue = vue;
    console.log('mode: ' + getModeName());
    console.log('bridge: ' + bridge);
    console.log('callback: ' + callback);
    _global.global.jsBridge = _data.data;
    _global.global.gobackbtn = bridge.goBack;
    _global.global.ostype = _cookie.ostype;
    _global.global.token = _cookie.token;
    _global.global.cookie = {
        set: _cookie.setCookie,
        get: _cookie.getCookie,
        delete: _cookie.deleteCookie
    };
    _global.global.__js_bridge_mode__ = getModeName();
    attach(bridge, callback);
    return _global.global;
};
var openSearch = exports.openSearch = bridge.openSearch;
var toggleSearch = exports.toggleSearch = bridge.toggleSearch;
var leftMenu = exports.leftMenu = bridge.leftMenu;
var toggleMenu = exports.toggleMenu = bridge.toggleMenu;
var rightMenu = exports.rightMenu = bridge.rightMenu;
var articleDetail = exports.articleDetail = bridge.articleDetail;
var viewPdf = exports.viewPdf = bridge.viewPdf;
var startAudioRec = exports.startAudioRec = bridge.startAudioRec;
var callCamera = exports.callCamera = bridge.callCamera;
var tailorCamera = exports.tailorCamera = bridge.tailorCamera;
var callAddress = exports.callAddress = bridge.callAddress;
var idCardScan = exports.idCardScan = bridge.idCardScan;
var saveImage = exports.saveImage = bridge.saveImage;
var getBank = exports.getBank = bridge.getBank;
var caSign = exports.caSign = bridge.caSign;
var getJob = exports.getJob = bridge.getJob;
var getCustomer = exports.getCustomer = bridge.getCustomer;
var closeWebview = exports.closeWebview = bridge.closeWebview;
var takeUserImageMultiple = exports.takeUserImageMultiple = bridge.takeUserImageMultiple;
var callCameraMultiple = exports.callCameraMultiple = bridge.callCameraMultiple;
var shareShare = exports.shareShare = bridge.shareShare;
var wechatShare = exports.wechatShare = bridge.wechatShare;
var showShareBtn = exports.showShareBtn = bridge.showShareBtn;
var showShareArr = exports.showShareArr = bridge.showShareArr;
var showRiskArr = exports.showRiskArr = bridge.showRiskArr;
var nativeAjax = exports.nativeAjax = bridge.nativeAjax;
var showPosterDetail = exports.showPosterDetail = bridge.showPosterDetail;
var sendSms = exports.sendSms = bridge.sendSms;
var shareShareEntry = exports.shareShareEntry = bridge.shareShareEntry;
var goBack = exports.goBack = bridge.goBack;