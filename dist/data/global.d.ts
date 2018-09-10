export interface Global {
    HQAppGetH5Header(): void;
    app2js_onDataResult(type: string, data: string): void;
    notifyCommandFromNative(): void;
    gobackbtn(pathName: string): void;
    ostype(): string;
    token(): string;
    navigator?: Navigator;
    cookie: any;
    HQAppJSInterface?: any;
    jsBridge: any;
    __js_bridge_mode__: string;
}
declare global {
    interface Window {
        HQAppGetH5Header(): void;
        app2js_onDataResult(type: string, data: string): void;
        notifyCommandFromNative(): void;
        gobackbtn(pathName: string): void;
        ostype(): string;
        token(): string;
        nativeAjax(): void;
        cookie: any;
        HQAppJSInterface?: any;
        jsBridge: any;
        __js_bridge_mode__: string;
    }
}
export declare const global: Global;
