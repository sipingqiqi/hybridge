import { global } from './data/global';
import { data } from './data/data';
import { getCookie, setCookie, deleteCookie, ostype, token } from './util/cookie';
import { api } from './data/api';
import { app } from './data/app';
var EnvType;
(function (EnvType) {
    EnvType[EnvType["NATIVE"] = 0] = "NATIVE";
    EnvType[EnvType["WECHAT"] = 1] = "WECHAT";
    EnvType[EnvType["BROWSER"] = 2] = "BROWSER";
})(EnvType || (EnvType = {}));
import * as NativeBridge from './bridge/impl/browser/bridge';
import * as BrowserBridge from './bridge/impl/browser/bridge';
import * as NativeCallback from './bridge/impl/browser/callback';
import * as BrowserCallback from './bridge/impl/browser/callback';
function attach(bridge, callback) {
    global.HQAppGetH5Header = callback.onReady;
    global.app2js_onDataResult = callback.onDataResult;
    global.notifyCommandFromNative = callback.notifyCommandFromNative;
    console.log('for (let key in bridge) {');
    for (let key in bridge) {
        console.log(`key: [${bridge.openSearch}]`);
        global[key] = bridge[key];
    }
}
function isApp() {
    return global.HQAppJSInterface ? true : false;
}
function isWechat() {
    if (!global.navigator) {
        return false;
    }
    return /micromessenger/i.test(global.navigator.userAgent) ? true : false;
}
function getMode() {
    if (isApp()) {
        return EnvType.NATIVE;
    }
    else if (isWechat()) {
        // 暂时不支持微信的 JS-SDK 特性，按纯 H5 的方式处理
        return EnvType.BROWSER;
    }
    else {
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
const bridge = createBridge();
const callback = createCallback();
export const mount = function (services, vue) {
    for (let key in services) {
        api[key] = services[key];
    }
    app.vue = vue;
    console.log(`mode: ${getModeName()}`);
    console.log(`bridge: ${bridge}`);
    console.log(`callback: ${callback}`);
    global.jsBridge = data;
    global.gobackbtn = bridge.goBack;
    global.ostype = ostype;
    global.token = token;
    global.cookie = {
        set: setCookie,
        get: getCookie,
        delete: deleteCookie
    };
    global.__js_bridge_mode__ = getModeName();
    attach(bridge, callback);
    return global;
};
export const openSearch = bridge.openSearch;
export const toggleSearch = bridge.toggleSearch;
export const leftMenu = bridge.leftMenu;
export const toggleMenu = bridge.toggleMenu;
export const rightMenu = bridge.rightMenu;
export const articleDetail = bridge.articleDetail;
export const viewPdf = bridge.viewPdf;
export const startAudioRec = bridge.startAudioRec;
export const callCamera = bridge.callCamera;
export const tailorCamera = bridge.tailorCamera;
export const callAddress = bridge.callAddress;
export const idCardScan = bridge.idCardScan;
export const saveImage = bridge.saveImage;
export const getBank = bridge.getBank;
export const caSign = bridge.caSign;
export const getJob = bridge.getJob;
export const getCustomer = bridge.getCustomer;
export const closeWebview = bridge.closeWebview;
export const takeUserImageMultiple = bridge.takeUserImageMultiple;
export const callCameraMultiple = bridge.callCameraMultiple;
export const shareShare = bridge.shareShare;
export const wechatShare = bridge.wechatShare;
export const showShareBtn = bridge.showShareBtn;
export const showShareArr = bridge.showShareArr;
export const showRiskArr = bridge.showRiskArr;
export const nativeAjax = bridge.nativeAjax;
export const showPosterDetail = bridge.showPosterDetail;
export const sendSms = bridge.sendSms;
export const shareShareEntry = bridge.shareShareEntry;
export const goBack = bridge.goBack;
