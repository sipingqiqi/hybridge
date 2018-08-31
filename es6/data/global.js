export const global = typeof window !== 'undefined' ? window : {
    HQAppGetH5Header() { },
    app2js_onDataResult(type, data) { },
    notifyCommandFromNative() { },
    gobackbtn(pathName) { },
    ostype() { return ''; },
    token() { return ''; },
    cookie: {},
    HQAppJSInterface: undefined,
    jsBridge: {},
    __js_bridge_mode__: ''
};
