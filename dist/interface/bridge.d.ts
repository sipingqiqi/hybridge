/**
 * 搜索结果对象
 */
export interface SearchResult {
    status: boolean;
    value: string;
    callback(e: any): any;
}
/**
* 顶端按钮选项
*/
export interface MenuOption {
    title: string;
    javascript: string;
}
export interface MenuExOption {
    type: string;
    title: string;
    url: string;
    javascript: string;
    params: any;
}
export interface IdCardScanOption {
    isOCR: boolean;
    isHideMessage: boolean;
}
/**
* 海报详情
*/
export interface PosterDetail {
    type: string;
    subType: string;
    adId: string;
    url: string;
}
/**
* 顶端按钮位置
*/
export declare enum MenuPosition {
    LEFT = 1,
    RIGHT = 2,
    BOTH = 3
}
export declare enum CloseType {
    CLOSE_AND_HOME = 1,
    CLOSE = 2
}
export declare enum ShareType {
    DEFAULT = 1,
    WX_FRIEND = 2,
    WX_TIMELINE = 3,
    QQ_FRIEND = 4,
    QQ_ZONE = 5,
    WEIBO = 6
}
export declare enum SignType {
    WRITTEN = 1,
    PHOTO = 2,
    FACE = 3,
    COMMENT = 4
}
/**
* 用于 JsBridge 交互的接口
*/
export interface Bridge {
    openSearch(type: string, hint: string, message: string): SearchResult;
    toggleSearch(isHide: boolean): void;
    SetH5Header(n: string): void;
    leftMenu(n: MenuOption): void;
    toggleMenu(n: MenuPosition, show: boolean): void;
    rightMenu(n: MenuExOption): void;
    articleDetail(url: string, title: string, buttonText: string): void;
    viewPdf(url: string, title: string, buttonText: string): Promise<string>;
    startAudioRec(show: boolean): Promise<string>;
    callCamera(): Promise<string>;
    tailorCamera(isCut: boolean, width: number, height: number): Promise<string>;
    callAddress(): Promise<string>;
    idCardScan(option: IdCardScanOption): Promise<string>;
    getBank(): Promise<string>;
    caSign(name: string, type: SignType, serialized: string): Promise<string>;
    getJob(): Promise<string>;
    getCustomer(): Promise<string>;
    closeWebview(n: CloseType): void;
    goNativeHome(): void;
    takeUserImageMultiple(count: number): Promise<string>;
    callCameraMultiple(count: number): Promise<string>;
    showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string>;
    wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void;
    showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void;
    showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void;
    showRiskArr(icon1: string, callback1: string, icon2: string, callback2: string): void;
    clearRiskArr(): void;
    showPosterDetail(param: Array<PosterDetail>, index: number): void;
    sendSms(telephones: Array<string>, content: string): void;
    findDictTable(type: string): Promise<string>;
    onReady(): void;
    onDataResult(type: string, data: string): void;
    notifyCommandFromNative(): void;
}
