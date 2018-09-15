import { SearchResult, MenuOption, MenuExOption, PosterDetail, MenuPosition, CloseType, ShareType, Bridge, SignType } from './interface/bridge';
import Browser from './impl/browser/bridge';
import iOS from './impl/ios/bridge';
import Android from './impl/android/bridge';
import { gobackbtn } from './utils/navigator';
/**
 * 挂载 bridge 对象
 * @param bridge - 实现 Bridge 接口的类型实例
 */
declare const mount: (bridge: Bridge) => void;
/**
 * 打开搜索框
 *
 * * 用户未输入内容，点击取消按钮，会自动关闭搜索框，不回调任何方法；
 * * 用户已输入内容，点击搜索按钮，会调用 callback(text: string) 回调方法；
 * * 用户已输入内容，点击取消按钮，会调用 callback(text: string) 回调方法，参数为空字符串。
 *
 * @param type 搜索历史的类型名称，相同类型的共享搜索历史；
 * @param hint 相当于 placeholder 出现在输入框和键盘上方；
 * @param message 在没有搜索历史的情况下，出现在搜索框背景正中位置；
 * @returns {SearchResult} 其中的 callback 成员方法，是接收回调函数
 */
declare const openSearch: (type: string, hint: string, message: string) => SearchResult;
/**
 * 隐藏搜索框
 *
 * @param isHide 是否隐藏搜索框
 * * 为 `true` 隐藏，为 `false` 显示
 */
declare function toggleSearch(isHide: boolean): void;
/**
 * 设置标题文字
 * @param title 标题文字
 */
declare const SetH5Header: (title: string) => void;
/**
 * 设置标题栏左侧按钮
 *
 * @param option 按钮选项
 * * `MenuOption`.`title` 按钮文字
 * * `MenuOption`.`javascript` 回调方法的名称
 */
declare function leftMenu(option: MenuOption): void;
/**
 * 控制标题栏上按钮的显示
 * @param option 指定要操作的按钮
 * * `MenuPosition`.`LEFT` 左按钮
 * * `MenuPosition`.`RIGHT` 右按钮
 * * `MenuPosition`.`BOTH` 两侧按钮
 * @param show 指定显示或者隐藏
 * * 为 `true` 显示，为 `false` 隐藏
 */
declare function toggleMenu(option: MenuPosition, show: boolean): void;
/**
 * 设置标题栏右按钮
 * @param option 按钮选项
 * * `MenuExOption`.`title` 按钮文字
 * * `MenuExOption`.`javascript` 回调方法的名称
 * * `MenuExOption`.`type`
 * * `MenuExOption`.`url`
 * * `MenuExOption`.`params`
 */
declare function rightMenu(option: MenuExOption): void;
/**
 * 打开 PDF 文件
 * @param url - PDF 文件的 URL 地址
 * @param title - 阅读窗体的标题文字
 * @param btnTxt - 按钮文字
 */
declare function articleDetail(url: string, title: string, btnTxt: string): void;
/**
 * 查看 PDF 文档
 * @param url 打开的地址,主要有图片、PDF、视频三类数据
 * @param title 数据的标题
 * @param btnTxt 按钮上的文字
 * @returns {Promise} JSON 字符串，标识文章的已读信息
 */
declare function viewPdf(url: string, title: string, btnTxt: string): Promise<string>;
/**
 * 启动录音
 * @param show 显示隐藏, true:显示; false:隐藏
 * @returns {Promise} JSON 字符串，音频文件信息
 */
declare function startAudioRec(show: boolean): Promise<string>;
/**
 * 调用原生拍照
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
declare function callCamera(): Promise<string>;
/**
 * 调用原生拍照，并按固定大小裁剪
 * @param isCut 是否需要裁剪
 * @param width 宽度
 * @param height 高度
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
declare function tailorCamera(isCut: boolean, width: number, height: number): Promise<string>;
/**
 * 打开地址选择弹窗，可以选择“省”、“市”、“区”等
 * @returns {Promise} JSON 字符串，返回用户选择的省市区信息
 */
declare function callAddress(): Promise<string>;
/**
 * 打开身份证扫描弹窗，可以获取姓名、证件号码等信息
 * @returns {Promise} JSON 字符串，返回身份证上的所有文字信息
 */
declare function idCardScan(): Promise<string>;
/**
 * 打开银行卡扫描弹窗，可以获得银行名称、卡号、卡片种类等信息
 * @returns {Promise} JSON 字符串，返回银行卡面上的所有文字信息
 */
declare function getBank(): Promise<string>;
/**
 * 打开手写签名或人脸识别弹窗
 * @param name 签名人的姓名
 * @param type 功能类型
 * * `SignType`.`WRITTEN` 手写签名
 * * `SignType`.`PHOTO` 拍照上传签名
 * * `SignType`.`FACE` 人脸识别
 * * `SignType`.`COMMENT` 批注
 * @param serialized 其它信息，要求使用 JSON 字符串形式传入
 * @returns {Promise} JSON 字符串，返回签名的保存状态
 */
declare function caSign(name: string, type: SignType, serialized: string): Promise<string>;
/**
 * 打开职业选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择职业信息
 */
declare function getJob(): Promise<string>;
/**
 * 打开客户信息选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择的客户信息
 */
declare function getCustomer(): Promise<string>;
/**
 * 关闭当前 WebView 窗口
 * @param type 关闭类型（可选），默认为仅关闭 WebView 窗口
 * * `CloseType`.`CLOSE_AND_HOME` 关闭 WebView 窗口，并回到 APP 首页
 * * `CloseType`.`CLOSE` 关闭 WebView 窗口，停留在 APP 的当前页面
 */
declare function closeWebview(type: CloseType): void;
/**
 * 关闭当前 WebView 窗口，并且回到 APP 首页
 */
declare function goNativeHome(): void;
/**
 * 打开原生相机，拍摄多张照片
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
declare function takeUserImageMultiple(count: number): Promise<string>;
/**
 * 打开原生相机，拍摄多张照片，与 takeUserImageMultiple(count: number) 方法相同
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
declare const callCameraMultiple: (count: number) => Promise<string>;
/**
 * 代码直接调用分享功能，不弹出提示
 * @param type 分享类型
 * * `ShareType`.`DEFAULT` 仍然弹出提示，由用户选择分享类型
 * * `ShareType`.`WX_FRIEND` 直接分享给微信好友
 * * `ShareType`.`WX_TIMELINE` 直接分享到朋友
 * * `ShareType`.`QQ_FRIEND` 直接分享到 QQ 好友
 * * `ShareType`.`QQ_ZONE` 直接分享到 QQ 空间
 * * `ShareType`.`WEIBO` 直接分享到微博
 * @param url 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
 * @param imageUrl 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
 * @param title 分享预览标题
 * @param desc 可选，分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
 * @param callback 可选，分享完成时的回调函数名，要求为全局函数，入参表明用户是否成功完成分享操作
 * @returns {Promise} JSON 字符串，返回用户分享结果，即：分享成功、分享失败、用户取消
 */
declare function showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string>;
/**
 * 微信小程序分享
 * @param webPageUrl 兼容低版本的网页链接
 * @param path 小程序页面路径
 * @param imageUrl 图片地址
 * @param title 标题
 * @param desc 描述
 * @param callback 分享后的回调方法名
 */
declare function wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void;
/**
 * 显示分享按钮，用户点击弹出分享提示
 * @param type 分享类型，本接口固定使用 ShareType.DEFAULT
 * * `ShareType`.`DEFAULT` 仍然弹出提示，由用户选择分享类型
 * @param url 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
 * @param imageUrl 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
 * @param title 分享预览标题
 * @param desc 可选，分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
 * @param callback 可选，分享完成时的回调函数名，要求为全局函数，入参表明用户是否成功完成分享操作
 * @returns {Promise} JSON 字符串，返回用户分享结果，即：分享成功、分享失败、用户取消
 */
declare function showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void;
/**
 * 显示搜索和分享两个按钮，用户点击弹出分享提示
 * @param javascript 回调函数名，用户点击搜索将调用此全局函数
 * @param url 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
 * @param imageUrl 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
 * @param title 分享预览标题
 * @param desc 分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
 */
declare function showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void;
/**
 * 在标题栏右侧，显示多个图标按钮，要求图标大小 50 X 50
 * @param icon 第一个图标，以 base64 编码
 * @param callback 第一个图标的回调函数名称
 * @param secondIcon 第二个图标，以 base64 编码
 * @param secondCallback 第二个图标的回调函数名称
 */
declare function showRiskArr(icon: string, callback: string, secondIcon: string, secondCallback: string): void;
/**
 * 清空标题栏右侧的图标按钮
 */
declare function clearRiskArr(): void;
/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 *
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
declare function showPosterDetail(param: Array<PosterDetail>, index: number): void;
/**
 * 打开原生的短信编辑页面
 * @param telephones 电话号码列表
 * @param content - 短信内容
 */
declare function sendSms(telephones: Array<string>, content: string): void;
/**
 * 查询数据字典
 * @param type 字典类型
 * @returns {Promise} JSON 字符串，返回数据字典的值
 */
declare function findDictTable(type: string): Promise<string>;
/**
 * 用于接收来自 native 的通知，当 native 环境准备好之后，会调用此方法
 */
declare function onReady(): void;
/**
 * 用于接收来自 native 的通知，当 native 返回结果时，回调此方法
 */
declare function onDataResult(eventType: string, eventData: string): void;
/**
 * 用于接收来自 native 的通知，暂时没用
 */
declare function notifyCommandFromNative(): void;
declare const install: (Vue: any, options: any) => void;
declare enum OS {
    IOS = "ios",
    ANDROID = "android"
}
export { Browser as BROWSER, iOS as IOS, Android as ANDROID, OS, install, mount, SearchResult, MenuOption, PosterDetail, MenuPosition, CloseType, ShareType, SignType, gobackbtn, openSearch, toggleSearch, SetH5Header, leftMenu, toggleMenu, rightMenu, articleDetail, viewPdf, startAudioRec, callCamera, tailorCamera, callAddress, idCardScan, getBank, caSign, getJob, getCustomer, closeWebview, goNativeHome, takeUserImageMultiple, callCameraMultiple, showShare, wechatShare, showShareBtn, showShareArr, showRiskArr, clearRiskArr, showPosterDetail, sendSms, findDictTable, onReady, onDataResult, notifyCommandFromNative, };
