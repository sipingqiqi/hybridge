export interface Global {
    HQAppGetH5Header(): void,
    app2js_onDataResult(type: string, data: string): void,
    notifyCommandFromNative(): void,

    gobackbtn(pathName: string): void,
    ostype(): string,
    token(): string,

    navigator?: Navigator,
    cookie: any,
    HQAppJSInterface?: any,
    jsBridge: any,
    __js_bridge_mode__: string,
}

declare global {
    interface Window {
        HQAppGetH5Header(): void,
        app2js_onDataResult(type: string, data: string): void,
        notifyCommandFromNative(): void,

        gobackbtn(pathName: string): void,
        ostype(): string,
        token(): string,

        cookie: any,
        HQAppJSInterface?: any,
        jsBridge: any,
        __js_bridge_mode__: string,
    }
}

export const global: Global = typeof window !== 'undefined' ? window : {
    HQAppGetH5Header() {},
    app2js_onDataResult(type: string, data: string) {},
    notifyCommandFromNative() {},

    gobackbtn(pathName: string) {},
    ostype(): string { return ''},
    token(): string { return ''},

    cookie: {},
    HQAppJSInterface: undefined,
    jsBridge: {},
    __js_bridge_mode__: ''
}