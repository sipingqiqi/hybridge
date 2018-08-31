const { global } = require('./global');
const { data } = require('./data');
const { getCookie, setCookie, deleteCookie, ostype, token } = require('./util/cookie');
const { goBack } = require('./util/navigator');
const { functions } = require('./functions');

function attach (bridge, callback) {
    global.HQAppGetH5Header = callback.onReady;
    global.app2js_onDataResult = callback.onDataResult;
    global.notifyCommandFromNative = callback.notifyCommandFromNative;

    functions.forEach(name => {
        global[name] = bridge[name];
    });
}

function isApp () {
    return global.HQAppJSInterface ? true : false;
}

function isWechat () {
    return /micromessenger/i.test(global.navigator.userAgent) ? true : false;
}

function getMode () {
    if (isApp()) {
        return 'native';
    } else if (isWechat()) {
        // 暂时不支持微信的 JS-SDK 特性，按纯 H5 的方式处理
        return 'browser'; 
    } else {
        return 'browser';
    }
}

const mode = getMode();
const bridge = require(`./${mode}/bridge`);
const callback = require(`./${mode}/callback`);

const mount = function (api) {
    global.jsBridge = data;

    global.gobackbtn = goBack;
    global.ostype = ostype;
    global.token = token;
    global.API = api;
    global.cookie = {
        set: setCookie,
        get: getCookie,
        delete: deleteCookie
    }

    global.__js_bridge_mode__ = mode;

    attach(bridge, callback);

    return global;
}

module.exports = {
    mount: mount
}