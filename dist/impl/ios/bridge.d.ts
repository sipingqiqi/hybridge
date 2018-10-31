import { Bridge, SearchResult, MenuOption, MenuExOption, MenuPosition, CloseType, ShareType, PosterDetail, SignType } from '../../interface/bridge';
export default class IOSBridge implements Bridge {
    openSearch(type: string, hint: string, message: string): SearchResult;
    toggleSearch(isHide: boolean): void;
    SetH5Header(title: string): void;
    leftMenu(option: MenuOption): void;
    toggleMenu(position: MenuPosition, show: boolean): void;
    rightMenu(option: MenuExOption): void;
    articleDetail(url: string, title?: string, buttonTitle?: string): void;
    viewPdf(url: string, title?: string, buttonTitle?: string): Promise<string>;
    startAudioRec(show: boolean): Promise<string>;
    callAddress(): Promise<string>;
    idCardScan(isOCR?: boolean): Promise<string>;
    getBank(): Promise<string>;
    caSign(name: string, type: SignType, serialized: string): Promise<string>;
    getJob(): Promise<string>;
    getCustomer(): Promise<string>;
    closeWebview(n?: CloseType): void;
    goNativeHome(): void;
    showShare(type: ShareType, url: string, imageUrl: string, title: string, desc?: string, callback?: string): Promise<string>;
    wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void;
    showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc?: string, callback?: string): void;
    showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void;
    showRiskArr(icon1: string, callback1: string, icon2: string, callback2: string): void;
    clearRiskArr(): void;
    callCamera(): Promise<string>;
    tailorCamera(isCut: boolean, width: number, height: number): Promise<string>;
    takeUserImageMultiple(count?: number): Promise<string>;
    callCameraMultiple(count?: number): Promise<string>;
    showPosterDetail(param: Array<PosterDetail>, index: number): void;
    sendSms(telephones: Array<string>, content: string): void;
    findDictTable(type: string): Promise<string>;
    onReady(): void;
    onDataResult(eventType: string, eventData: string): void;
    notifyCommandFromNative(): void;
}
