'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notifyCommandFromNative = exports.onDataResult = exports.onReady = exports.findDictTable = exports.shareShareEntry = exports.sendSms = exports.showPosterDetail = exports.clearRiskArr = exports.showRiskArr = exports.showShareArr = exports.showShareBtn = exports.wechatShare = exports.showShare = exports.callCameraMultiple = exports.takeUserImageMultiple = exports.goNativeHome = exports.closeWebview = exports.getCustomer = exports.getJob = exports.caSign = exports.getBank = exports.idCardScan = exports.callAddress = exports.tailorCamera = exports.callCamera = exports.startAudioRec = exports.viewPdf = exports.articleDetail = exports.rightMenu = exports.toggleMenu = exports.leftMenu = exports.SetH5Header = exports.toggleSearch = exports.openSearch = exports.gobackbtn = exports.SignType = exports.ShareType = exports.CloseType = exports.MenuPosition = exports.mount = exports.install = exports.OS = exports.ANDROID = exports.IOS = exports.BROWSER = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bridge = require('./interface/bridge');

var _bridge2 = require('./impl/browser/bridge');

var _bridge3 = _interopRequireDefault(_bridge2);

var _bridge4 = require('./impl/ios/bridge');

var _bridge5 = _interopRequireDefault(_bridge4);

var _bridge6 = require('./impl/android/bridge');

var _bridge7 = _interopRequireDefault(_bridge6);

var _cookie = require('./utils/cookie');

var _navigator = require('./utils/navigator');

var _ajax = require('./utils/ajax');

var _dictionary = require('./utils/dictionary');

var _data = require('./data/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var instance = null;
var aliasNames = {
    onReady: 'HQAppGetH5Header',
    onDataResult: 'app2js_onDataResult',
    notifyCommandFromNative: 'notifyCommandFromNative'
};
/**
 * 挂载 bridge 对象
 * @param bridge - 实现 Bridge 接口的类型实例
 */
var mount = function mount(bridge) {
    instance = bridge;
    (0, _assign2.default)(window, {
        ostype: _cookie.ostype,
        token: _cookie.token,
        gobackbtn: _navigator.gobackbtn,
        nativeAjax: _ajax.nativeAjax,
        jsBridge: _data.data,
        dictionary: _dictionary.dictionary,
        KVtoNV: _dictionary.KVtoNV,
        setDictionary: _dictionary.setDictionary,
        setAllDictionary: _dictionary.setAllDictionary,
        getDictionary: _dictionary.getDictionary,
        findDictionary: _dictionary.findDictionary,
        _findDictionary: _dictionary._findDictionary
    });
    window.cookie = {
        set: _cookie.setCookie,
        get: _cookie.getCookie,
        delete: _cookie.deleteCookie
    };
    (0, _keys2.default)(functions).forEach(function (key) {
        var alias = aliasNames[key];
        var func = instance[key];
        if (func) {
            window[alias || key] = func.bind(instance);
        }
    });
    (0, _dictionary.setAllDictionary)();
};
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
var openSearch = function openSearch(type, hint, message) {
    return instance.openSearch(type, hint, message);
};
/**
 * 隐藏搜索框
 *
 * @param isHide 是否隐藏搜索框
 * * 为 `true` 隐藏，为 `false` 显示
 */
function toggleSearch(isHide) {
    instance.toggleSearch(isHide);
}
/**
 * 设置标题文字
 * @param title 标题文字
 */
var SetH5Header = function SetH5Header(title) {
    instance.SetH5Header(title);
};
/**
 * 设置标题栏左侧按钮
 *
 * @param option 按钮选项
 * * `MenuOption`.`title` 按钮文字
 * * `MenuOption`.`javascript` 回调方法的名称
 */
function leftMenu(option) {
    return instance.leftMenu(option);
}
/**
 * 控制标题栏上按钮的显示
 * @param option 指定要操作的按钮
 * * `MenuPosition`.`LEFT` 左按钮
 * * `MenuPosition`.`RIGHT` 右按钮
 * * `MenuPosition`.`BOTH` 两侧按钮
 * @param show 指定显示或者隐藏
 * * 为 `true` 显示，为 `false` 隐藏
 */
function toggleMenu(option, show) {
    return instance.toggleMenu(option, show);
}
/**
 * 设置标题栏右按钮
 * @param option 按钮选项
 * * `MenuExOption`.`title` 按钮文字
 * * `MenuExOption`.`javascript` 回调方法的名称
 * * `MenuExOption`.`type`
 * * `MenuExOption`.`url`
 * * `MenuExOption`.`params`
 */
function rightMenu(option) {
    return instance.rightMenu(option);
}
/**
 * 查看 PDF 文档，同 viewPdf 方法
 * @param url - 打开的地址
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
var articleDetail = function articleDetail(url, title, btnTxt) {
    return instance.articleDetail(url, title, btnTxt);
};
/**
 * 查看 PDF 文档
 * @param url - 打开的地址,主要有图片、PDF、视频三类数据
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
var viewPdf = function viewPdf(url, title, btnTxt) {
    return instance.viewPdf(url, title, btnTxt);
};
/**
 * 启动录音功能
 * @param isShow - 显示隐藏, true:显示; false:隐藏
 */
var startAudioRec = function startAudioRec(isShow) {
    return instance.startAudioRec(isShow);
};
/**
 * 拍照
 */
var callCamera = function callCamera() {
    return instance.callCamera();
};
/**
 * 拍照并裁剪
 * @param n
 * @param bool
 * @param width
 * @param height
 */
var tailorCamera = function tailorCamera(isCut, width, height) {
    return instance.tailorCamera(isCut, width, height);
};
/**
 * 打开地址选择窗口
 */
var callAddress = function callAddress() {
    return instance.callAddress();
};
/**
 * 打开身份证件扫描窗口
 */
var idCardScan = function idCardScan() {
    return instance.idCardScan();
};
// /**
//  * 将图片保存到用户相册
//  * @param base64String - 照片的 base64 流
//  */
// const saveImage = function(base64String: string): void {
//   return instance.saveImage(base64String)
// }
/**
 * 打开银行卡扫描窗口
 */
var getBank = function getBank() {
    return instance.getBank();
};
/**
 * 打开 CA 手写签名窗口
 * @param name
 * @param type
 * @param serialized
 */
var caSign = function caSign(name, type, serialized) {
    return instance.caSign(name, type, serialized);
};
/**
 * 选择并导入职业信息
 */
var getJob = function getJob() {
    return instance.getJob();
};
/**
 * 选择并导入客户信息
 */
var getCustomer = function getCustomer() {
    return instance.getCustomer();
};
/**
 * 关闭当前 WebView 窗口
 * @param n - 直接关闭，或者关闭并返回首页
 */
var closeWebview = function closeWebview(n) {
    return instance.closeWebview(n);
};
var goNativeHome = function goNativeHome() {
    return instance.goNativeHome();
};
/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
var takeUserImageMultiple = function takeUserImageMultiple(count) {
    return instance.takeUserImageMultiple(count);
};
/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
var callCameraMultiple = function callCameraMultiple(count) {
    return instance.callCameraMultiple(count);
};
/**
 * 指定显示右上角的分享按钮 无法实现
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
var showShare = function showShare(type, url, imageUrl, title, desc, callback) {
    return instance.showShare(type, url, imageUrl, title, desc, callback);
};
/**
 * 微信小程序分享
 * @param webPageUrl - 兼容低版本的网页链接
 * @param path - 小程序页面路径
 * @param imageUrl - 图片地址
 * @param title - 标题
 * @param desc - 描述
 * @param callback - 分享后的回调方法名
 */
var wechatShare = function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) {
    return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
};
/**
 * 右上角显示分享图标，并完成分享操作
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
var showShareBtn = function showShareBtn(type, url, imageUrl, title, desc, callback) {
    return instance.showShareBtn(type, url, imageUrl, title, desc, callback);
};
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
var showShareArr = function showShareArr(javascript, url, imageUrl, title, desc) {
    return instance.showShareArr(javascript, url, imageUrl, title, desc);
};
/**
 * 右上角设置两个图标
 * 类型为base64，大小限定50*50
 * @param baseImg 图1
 * @param fun1
 * @param baseImg2 图2
 * @param fun2
 * 执行函数，无返回值无mock有回调
 */
var showRiskArr = function showRiskArr(icon1, callback1, icon2, callback2) {
    return instance.showRiskArr(icon1, callback1, icon2, callback2);
};
var clearRiskArr = function clearRiskArr() {
    return instance.clearRiskArr();
};
/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 *
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
var showPosterDetail = function showPosterDetail(param, index) {
    return instance.showPosterDetail(param, index);
};
/**
 * 发短信 打开短信编辑界面
 * @param telNum - 电话号码
 * @param content - 发送的内容
 */
var sendSms = function sendSms(telephones, content) {
    return instance.sendSms(telephones, content);
};
/**
 * 设置分享数据，内部调用,设置分享数据的
 * @param type - 分享类型
 * @param url - 分享地址
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享完成后的回调方法名
 */
var shareShareEntry = function shareShareEntry(type, url, title, desc, callback) {
    return instance.shareShareEntry(type, url, title, desc, callback);
};
var findDictTable = function findDictTable(type) {
    return instance.findDictTable(type);
};
function onReady() {
    instance.onReady();
}
function onDataResult(eventType, eventData) {
    instance.onDataResult(eventType, eventData);
}
function notifyCommandFromNative() {
    instance.notifyCommandFromNative();
}
// const goBack = function(pathName: string): void {
//   return instance.goBack(pathName);
// }
var functions = {
    MenuPosition: _bridge.MenuPosition,
    CloseType: _bridge.CloseType,
    ShareType: _bridge.ShareType,
    SignType: _bridge.SignType,
    gobackbtn: _navigator.gobackbtn,
    openSearch: openSearch,
    toggleSearch: toggleSearch,
    SetH5Header: SetH5Header,
    leftMenu: leftMenu,
    toggleMenu: toggleMenu,
    rightMenu: rightMenu,
    articleDetail: articleDetail,
    viewPdf: viewPdf,
    startAudioRec: startAudioRec,
    callCamera: callCamera,
    tailorCamera: tailorCamera,
    callAddress: callAddress,
    idCardScan: idCardScan,
    //saveImage,
    getBank: getBank,
    caSign: caSign,
    getJob: getJob,
    getCustomer: getCustomer,
    closeWebview: closeWebview,
    goNativeHome: goNativeHome,
    takeUserImageMultiple: takeUserImageMultiple,
    callCameraMultiple: callCameraMultiple,
    showShare: showShare,
    wechatShare: wechatShare,
    showShareBtn: showShareBtn,
    showShareArr: showShareArr,
    showRiskArr: showRiskArr,
    clearRiskArr: clearRiskArr,
    showPosterDetail: showPosterDetail,
    sendSms: sendSms,
    shareShareEntry: shareShareEntry,
    findDictTable: findDictTable,
    onReady: onReady,
    onDataResult: onDataResult,
    notifyCommandFromNative: notifyCommandFromNative
};
var install = function install(Vue, options) {
    console.log('Mount hybridge to vue');
    switch ((0, _cookie.ostype)()) {
        case OS.IOS:
            mount(new _bridge5.default());
            break;
        case OS.ANDROID:
            mount(new _bridge7.default());
            break;
        default:
            mount(new _bridge3.default());
            break;
    }
    Vue.prototype.$bridge = functions;
};
var OS;
(function (OS) {
    OS["IOS"] = "ios";
    OS["ANDROID"] = "android";
})(OS || (exports.OS = OS = {}));
exports.BROWSER = _bridge3.default;
exports.IOS = _bridge5.default;
exports.ANDROID = _bridge7.default;
exports.OS = OS;
exports.install = install;
exports.mount = mount;
exports.MenuPosition = _bridge.MenuPosition;
exports.CloseType = _bridge.CloseType;
exports.ShareType = _bridge.ShareType;
exports.SignType = _bridge.SignType;
exports.gobackbtn = _navigator.gobackbtn;
exports.openSearch = openSearch;
exports.toggleSearch = toggleSearch;
exports.SetH5Header = SetH5Header;
exports.leftMenu = leftMenu;
exports.toggleMenu = toggleMenu;
exports.rightMenu = rightMenu;
exports.articleDetail = articleDetail;
exports.viewPdf = viewPdf;
exports.startAudioRec = startAudioRec;
exports.callCamera = callCamera;
exports.tailorCamera = tailorCamera;
exports.callAddress = callAddress;
exports.idCardScan = idCardScan;
exports.getBank = getBank;
exports.caSign = caSign;
exports.getJob = getJob;
exports.getCustomer = getCustomer;
exports.closeWebview = closeWebview;
exports.goNativeHome = goNativeHome;
exports.takeUserImageMultiple = takeUserImageMultiple;
exports.callCameraMultiple = callCameraMultiple;
exports.showShare = showShare;
exports.wechatShare = wechatShare;
exports.showShareBtn = showShareBtn;
exports.showShareArr = showShareArr;
exports.showRiskArr = showRiskArr;
exports.clearRiskArr = clearRiskArr;
exports.showPosterDetail = showPosterDetail;
exports.sendSms = sendSms;
exports.shareShareEntry = shareShareEntry;
exports.findDictTable = findDictTable;
exports.onReady = onReady;
exports.onDataResult = onDataResult;
exports.notifyCommandFromNative = notifyCommandFromNative;