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
    /**
     * ### 打开搜索框
     * > 当用户输入并点击搜索按钮后，SearchResult 的 callback 被触发，并将输入的内容放入参数。
     * > 用户点击取消按钮时，有两种情况：
     * > 1. 未曾点击过搜索，则直接关闭搜索框；
     * > 2. 已点击过搜索，触发 callback('') 方法。
     * @param type - 搜索历史的 ID 值
     * @param hint - 键盘上方的提示文字
     * @param message - 输入框中的提示文字，相当于 placeholder 的东西
     */
    openSearch(type: string, hint: string, message: string): SearchResult;
    /**
     * ### 关闭搜索框
     * @param isHide - 是否关闭搜索框, true:隐藏 ; false: 显示
     */
    toggleSearch(isHide: boolean): void;
    /**
     * 设置app标题
     * @param n - 标题文字
     */
    SetH5Header(n: string): void;
    /**
     * 左边标题
     * @param n - 按钮选项
     */
    leftMenu(n: MenuOption): void;
    /**
     * 控制左右标题显示隐藏
     * @param n - 隐藏哪个bar对应的value值,1:左边 ; 2:右边 ; 3:全部
     * @param show - 显示还是隐藏: true 为显示，false 为隐藏
     */
    toggleMenu(n: MenuPosition, show: boolean): void;
    /**
     * 左边标题
     * @param n - 按钮选项
     */
    rightMenu(n: MenuExOption): void;
    /**
     * 查看 PDF 文档，同 viewPdf 方法
     * @param url - 打开的地址
     * @param title - 数据的标题
     * @param buttonText - 按钮上的文字
     */
    articleDetail(url: string, title: string, buttonText: string): void;
    /**
     * 查看 PDF 文档
     * @param url - 打开的地址,主要有图片、PDF、视频三类数据
     * @param title - 数据的标题
     * @param buttonText - 按钮上的文字
     */
    viewPdf(url: string, title: string, buttonText: string): Promise<string>;
    /**
     * 启动录音功能
     * @param show - 显示隐藏, true:显示; false:隐藏
     */
    startAudioRec(show: boolean): Promise<string>;
    /**
     * 拍照
     */
    callCamera(): Promise<string>;
    /**
     * 拍照并裁剪
     * @param n
     * @param bool
     * @param width
     * @param height
     */
    tailorCamera(isCut: boolean, width: number, height: number): Promise<string>;
    /**
     * 打开地址选择窗口
     */
    callAddress(): Promise<string>;
    /**
     * 打开身份证件扫描窗口
     */
    idCardScan(): Promise<string>;
    /**
     * 打开银行卡扫描窗口
     */
    getBank(): Promise<string>;
    /**
     * 打开 CA 手写签名窗口
     * @param name
     * @param type
     * @param serialized
     */
    caSign(name: string, type: SignType, serialized: string): Promise<string>;
    /**
     * 选择并导入职业信息
     */
    getJob(): Promise<string>;
    /**
     * 选择并导入客户信息
     */
    getCustomer(): Promise<string>;
    /**
     * 关闭当前 WebView 窗口
     * @param n - 直接关闭，或者关闭并返回首页
     */
    closeWebview(n: CloseType): void;
    goNativeHome(): void;
    /**
     * 拍照（多张照片）
     * @param count - 照片数量
     */
    takeUserImageMultiple(count: number): Promise<string>;
    /**
     * 拍照（多张照片）
     * @param count - 照片数量
     */
    callCameraMultiple(count: number): Promise<string>;
    /**
     * 指定显示右上角的分享按钮 无法实现
     * @param type - 分享类型，详情参见 ShareType 枚举类型
     * @param url - 分享链接
     * @param imageUrl - 分享图片
     * @param title - 分享标题
     * @param desc - 分享描述
     * @param callback - 分享后的回调方法名
     */
    showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string>;
    /**
     * 微信小程序分享
     * @param webPageUrl - 兼容低版本的网页链接
     * @param path - 小程序页面路径
     * @param imageUrl - 图片地址
     * @param title - 标题
     * @param desc - 描述
     * @param callback - 分享后的回调方法名
     */
    wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void;
    /**
     * 右上角显示分享图标，并完成分享操作
     * @param type - 分享类型，详情参见 ShareType 枚举类型
     * @param url - 分享链接
     * @param imageUrl - 分享图片
     * @param title - 分享标题
     * @param desc - 分享描述
     * @param callback - 分享后的回调方法名
     */
    showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void;
    /**
     * 在右上角显示分享和搜索两个图标；
     * 图标,是根据 title 上的文字对应显示的，
     * 如：搜索、分享
     * @param javascript - 搜索的回调传null则无搜索
     * @param url - 分享的地址
     * @param imageUrl - 图标图片的地址
     * @param title - 对应图标的文字
     * @param desc - 分享描述文字
     */
    showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void;
    /**
     * 右上角设置两个图标
     * 类型为base64，大小限定50*50
     * @param baseImg 图1
     * @param fun1
     * @param baseImg2 图2
     * @param fun2
     * 执行函数，无返回值无mock有回调
     */
    showRiskArr(icon1: string, callback1: string, icon2: string, callback2: string): void;
    clearRiskArr(): void;
    /**
     * 打开海报详情界面,点击显示大图数组可分享
     * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
     *
     * @param param - 海报 url 列表, type、subType、adId 均为 “1”
     * @param index - 海报索引
     */
    showPosterDetail(param: Array<PosterDetail>, index: number): void;
    /**
     * 发短信 打开短信编辑界面
     * @param telNum - 电话号码
     * @param content - 发送的内容
     */
    sendSms(telephones: Array<string>, content: string): void;
    /**
     * 设置分享数据，内部调用,设置分享数据的
     * @param type - 分享类型
     * @param url - 分享地址
     * @param title - 分享标题
     * @param desc - 分享描述
     * @param callback - 分享完成后的回调方法名
     */
    shareShareEntry(type: ShareType, url: string, title: string, desc: string, callback: string): void;
    findDictTable(type: string): Promise<string>;
    onReady(): void;
    onDataResult(type: string, data: string): void;
    notifyCommandFromNative(): void;
}
