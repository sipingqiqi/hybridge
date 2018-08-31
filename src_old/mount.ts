import { global } from './global';
import { data } from './data';
import { getCookie, setCookie, deleteCookie, ostype, token } from './util/cookie';
import { functions } from './functions';

import { Bridge } from './bridge';
import { BridgeImpl} from './browser/bridge';
import { Callback } from './callback';
import { CallbackImpl } from './browser/callback';

declare global {
    interface Window {
        HQAppGetH5Header(): void,
        app2js_onDataResult(type: string, data: string): void,
        notifyCommandFromNative(): void,

        gobackbtn(pathName: string): void,
        ostype(): string,
        token(): string,

        cookie: any,
        HQAppJSInterface: any,
        jsBridge: any,
        __js_bridge_mode__: string
    }
}

function attach (bridge: Bridge, callback: Callback) {    
    window.HQAppGetH5Header = callback.onReady;
    window.app2js_onDataResult = callback.onDataResult;
    window.notifyCommandFromNative = callback.notifyCommandFromNative;

    functions.forEach(name => {
        window[name] = bridge[name];
    });
}

function isApp () {
    return window.HQAppJSInterface ? true : false;
}

function isWechat () {
    return /micromessenger/i.test(window.navigator.userAgent) ? true : false;
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
//const bridge = require(`./${mode}/bridge`);
//const callback = require(`./${mode}/callback`);

export const mount = function (api: any, app: any) {
    const bridge: Bridge = new BridgeImpl(api, app);
    const callback: Callback = new CallbackImpl();

    window.jsBridge = data;

    window.gobackbtn = bridge.goBack;
    window.ostype = ostype;
    window.token = token;

    window.cookie = {
        set: setCookie,
        get: getCookie,
        delete: deleteCookie
    }

    window.__js_bridge_mode__ = mode;

    attach(bridge, callback);

    return global;
}
