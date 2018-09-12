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
 * 当用户输入并点击搜索按钮后，SearchResult 的 callback 被触发，并将输入的内容放入参数。
 * 用户点击取消按钮时，有两种情况：
 * 1. 未曾点击过搜索，则直接关闭搜索框；
 * 2. 已点击过搜索，触发 callback('') 方法。
 * @param type - 搜索历史的 ID 值
 * @param hint - 键盘上方的提示文字
 * @param message - 输入框中的提示文字，相当于 placeholder 的东西
 */
declare const openSearch: (type: string, hint: string, message: string) => SearchResult;
/**
 * ### 关闭搜索框
 * @param isHide - 是否关闭搜索框, true:隐藏 ; false: 显示
 */
declare const toggleSearch: (isHide: boolean) => void;
/**
 * 设置app标题
 * @param n - 标题文字
 */
declare const SetH5Header: (n: string) => void;
/**
 * 设置标题栏左按钮
 * @param option - 按钮选项，MenuOption.javascript 全局方法名，MenuOption.title 设置文字
 */
declare const leftMenu: (option: MenuOption) => void;
/**
 * 设置标题栏左、右按钮是否显示
 * @param option - 指定要操作的按钮，MenuPosition.LEFT / MenuPosition.RIGHT / MenuPosition.BOTH
 * @param show - 指定是否显示
 */
declare const toggleMenu: (option: MenuPosition, show: boolean) => void;
/**
 * 设置标题栏右按钮
 * @param option - 按钮选项
 */
declare const rightMenu: (option: MenuExOption) => void;
/**
 * 查看 PDF 文档，同 viewPdf 方法
 * @param url - 打开的地址
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
declare const articleDetail: (url: string, title: string, btnTxt: string) => void;
/**
 * 查看 PDF 文档
 * @param url - 打开的地址,主要有图片、PDF、视频三类数据
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
declare const viewPdf: (url: string, title: string, btnTxt: string) => Promise<string>;
/**
 * 启动录音功能
 * @param isShow - 显示隐藏, true:显示; false:隐藏
 */
declare const startAudioRec: (isShow: boolean) => Promise<string>;
/**
 * 拍照
 */
declare const callCamera: () => Promise<string>;
/**
 * 拍照并裁剪
 * @param n
 * @param bool
 * @param width
 * @param height
 */
declare const tailorCamera: (isCut: boolean, width: number, height: number) => Promise<string>;
/**
 * 打开地址选择窗口
 */
declare const callAddress: () => Promise<string>;
/**
 * 打开身份证件扫描窗口
 */
declare const idCardScan: () => Promise<string>;
/**
 * 打开银行卡扫描窗口
 */
declare const getBank: () => Promise<string>;
/**
 * 打开 CA 手写签名窗口
 * @param name
 * @param type
 * @param serialized
 */
declare const caSign: (name: string, type: SignType, serialized: string) => Promise<string>;
/**
 * 选择并导入职业信息
 */
declare const getJob: () => Promise<string>;
/**
 * 选择并导入客户信息
 */
declare const getCustomer: () => Promise<string>;
/**
 * 关闭当前 WebView 窗口
 * @param n - 直接关闭，或者关闭并返回首页
 */
declare const closeWebview: (n: CloseType) => void;
declare const goNativeHome: () => void;
/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
declare const takeUserImageMultiple: (count: number) => Promise<string>;
/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
declare const callCameraMultiple: (count: number) => Promise<string>;
/**
 * 指定显示右上角的分享按钮 无法实现
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
declare const showShare: (type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string) => Promise<string>;
/**
 * 微信小程序分享
 * @param webPageUrl - 兼容低版本的网页链接
 * @param path - 小程序页面路径
 * @param imageUrl - 图片地址
 * @param title - 标题
 * @param desc - 描述
 * @param callback - 分享后的回调方法名
 */
declare const wechatShare: (webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string) => void;
/**
 * 右上角显示分享图标，并完成分享操作
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
declare const showShareBtn: (type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string) => void;
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
declare const showShareArr: (javascript: string, url: string, imageUrl: string, title: string, desc: string) => void;
/**
 * 右上角设置两个图标
 * 类型为base64，大小限定50*50
 * @param baseImg 图1
 * @param fun1
 * @param baseImg2 图2
 * @param fun2
 * 执行函数，无返回值无mock有回调
 */
declare const showRiskArr: (icon1: string, callback1: string, icon2: string, callback2: string) => void;
declare const clearRiskArr: () => void;
/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 *
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
declare const showPosterDetail: (param: PosterDetail[], index: number) => void;
/**
 * 发短信 打开短信编辑界面
 * @param telNum - 电话号码
 * @param content - 发送的内容
 */
declare const sendSms: (telephones: string[], content: string) => void;
/**
 * 设置分享数据，内部调用,设置分享数据的
 * @param type - 分享类型
 * @param url - 分享地址
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享完成后的回调方法名
 */
declare const shareShareEntry: (type: ShareType, url: string, title: string, desc: string, callback: string) => void;
declare const findDictTable: (type: string) => Promise<string>;
declare const install: (Vue: any, options: any) => void;
declare enum OS {
    IOS = "ios",
    ANDROID = "android"
}
export { Browser as BROWSER, iOS as IOS, Android as ANDROID, OS, install, mount, SearchResult, MenuOption, PosterDetail, MenuPosition, CloseType, ShareType, SignType, gobackbtn, openSearch, toggleSearch, SetH5Header, leftMenu, toggleMenu, rightMenu, articleDetail, viewPdf, startAudioRec, callCamera, tailorCamera, callAddress, idCardScan, getBank, caSign, getJob, getCustomer, closeWebview, goNativeHome, takeUserImageMultiple, callCameraMultiple, showShare, wechatShare, showShareBtn, showShareArr, showRiskArr, clearRiskArr, showPosterDetail, sendSms, shareShareEntry, findDictTable, };
