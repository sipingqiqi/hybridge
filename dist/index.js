'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.notifyCommandFromNative = exports.onDataResult = exports.onReady = exports.findDictTable = exports.sendSms = exports.showPosterDetail = exports.clearRiskArr = exports.showRiskArr = exports.showShareArr = exports.showShareBtn = exports.wechatShare = exports.showShare = exports.callCameraMultiple = exports.takeUserImageMultiple = exports.goNativeHome = exports.closeWebview = exports.getCustomer = exports.getJob = exports.caSign = exports.getBank = exports.idCardScan = exports.callAddress = exports.tailorCamera = exports.callCamera = exports.startAudioRec = exports.viewPdf = exports.articleDetail = exports.rightMenu = exports.toggleMenu = exports.leftMenu = exports.SetH5Header = exports.toggleSearch = exports.openSearch = exports.gobackbtn = exports.SignType = exports.ShareType = exports.CloseType = exports.MenuPosition = exports.mount = exports.install = exports.OS = exports.ANDROID = exports.IOS = exports.BROWSER = undefined;

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
 * 打开 PDF 文件
 * @param url - PDF 文件的 URL 地址
 * @param title - 阅读窗体的标题文字
 * @param btnTxt - 按钮文字
 */
function articleDetail(url, title, btnTxt) {
    return instance.articleDetail(url, title, btnTxt);
}
/**
 * 查看 PDF 文档
 * @param url 打开的地址,主要有图片、PDF、视频三类数据
 * @param title 数据的标题
 * @param btnTxt 按钮上的文字
 * @returns {Promise} JSON 字符串，标识文章的已读信息
 */
function viewPdf(url, title, btnTxt) {
    return instance.viewPdf(url, title, btnTxt);
}
/**
 * 启动录音
 * @param show 显示隐藏, true:显示; false:隐藏
 * @returns {Promise} JSON 字符串，音频文件信息
 */
function startAudioRec(show) {
    return instance.startAudioRec(show);
}
/**
 * 调用原生拍照
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
function callCamera() {
    return instance.callCamera();
}
/**
 * 调用原生拍照，并按固定大小裁剪
 * @param isCut 是否需要裁剪
 * @param width 宽度
 * @param height 高度
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
function tailorCamera(isCut, width, height) {
    return instance.tailorCamera(isCut, width, height);
}
/**
 * 打开地址选择弹窗，可以选择“省”、“市”、“区”等
 * @returns {Promise} JSON 字符串，返回用户选择的省市区信息
 */
function callAddress() {
    return instance.callAddress();
}
/**
 * 打开身份证扫描弹窗，可以获取姓名、证件号码等信息
 * @returns {Promise} JSON 字符串，返回身份证上的所有文字信息
 */
function idCardScan() {
    return instance.idCardScan();
}
/**
 * 打开银行卡扫描弹窗，可以获得银行名称、卡号、卡片种类等信息
 * @returns {Promise} JSON 字符串，返回银行卡面上的所有文字信息
 */
function getBank() {
    return instance.getBank();
}
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
function caSign(name, type, serialized) {
    return instance.caSign(name, type, serialized);
}
/**
 * 打开职业选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择职业信息
 */
function getJob() {
    return instance.getJob();
}
/**
 * 打开客户信息选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择的客户信息
 */
function getCustomer() {
    return instance.getCustomer();
}
/**
 * 关闭当前 WebView 窗口
 * @param type 关闭类型（可选），默认为仅关闭 WebView 窗口
 * * `CloseType`.`CLOSE_AND_HOME` 关闭 WebView 窗口，并回到 APP 首页
 * * `CloseType`.`CLOSE` 关闭 WebView 窗口，停留在 APP 的当前页面
 */
function closeWebview(type) {
    return instance.closeWebview(type);
}
/**
 * 关闭当前 WebView 窗口，并且回到 APP 首页
 */
function goNativeHome() {
    return instance.goNativeHome();
}
/**
 * 打开原生相机，拍摄多张照片
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
function takeUserImageMultiple(count) {
    return instance.takeUserImageMultiple(count);
}
/**
 * 打开原生相机，拍摄多张照片，与 takeUserImageMultiple(count: number) 方法相同
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
var callCameraMultiple = function callCameraMultiple(count) {
    return instance.callCameraMultiple(count);
};
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
function showShare(type, url, imageUrl, title, desc, callback) {
    return instance.showShare(type, url, imageUrl, title, desc, callback);
}
/**
 * 微信小程序分享
 * @param webPageUrl 兼容低版本的网页链接
 * @param path 小程序页面路径
 * @param imageUrl 图片地址
 * @param title 标题
 * @param desc 描述
 * @param callback 分享后的回调方法名
 */
function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) {
    return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
}
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
function showShareBtn(type, url, imageUrl, title, desc, callback) {
    return instance.showShareBtn(type, url, imageUrl, title, desc, callback);
}
/**
 * 显示搜索和分享两个按钮，用户点击弹出分享提示
 * @param javascript 回调函数名，用户点击搜索将调用此全局函数
 * @param url 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
 * @param imageUrl 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
 * @param title 分享预览标题
 * @param desc 分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
 */
function showShareArr(javascript, url, imageUrl, title, desc) {
    return instance.showShareArr(javascript, url, imageUrl, title, desc);
}
/**
 * 在标题栏右侧，显示多个图标按钮，要求图标大小 50 X 50
 * @param icon 第一个图标，以 base64 编码
 * @param callback 第一个图标的回调函数名称
 * @param secondIcon 第二个图标，以 base64 编码
 * @param secondCallback 第二个图标的回调函数名称
 */
function showRiskArr(icon, callback, secondIcon, secondCallback) {
    return instance.showRiskArr(icon, callback, secondIcon, secondCallback);
}
/**
 * 清空标题栏右侧的图标按钮
 */
function clearRiskArr() {
    return instance.clearRiskArr();
}
/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 *
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
function showPosterDetail(param, index) {
    return instance.showPosterDetail(param, index);
}
/**
 * 打开原生的短信编辑页面
 * @param telephones 电话号码列表
 * @param content - 短信内容
 */
function sendSms(telephones, content) {
    return instance.sendSms(telephones, content);
}
/**
 * 查询数据字典
 * @param type 字典类型
 * @returns {Promise} JSON 字符串，返回数据字典的值
 */
function findDictTable(type) {
    return instance.findDictTable(type);
}
/**
 * 用于接收来自 native 的通知，当 native 环境准备好之后，会调用此方法
 */
function onReady() {
    instance.onReady();
}
/**
 * 用于接收来自 native 的通知，当 native 返回结果时，回调此方法
 */
function onDataResult(eventType, eventData) {
    instance.onDataResult(eventType, eventData);
}
/**
 * 用于接收来自 native 的通知，暂时没用
 */
function notifyCommandFromNative() {
    instance.notifyCommandFromNative();
}
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
exports.findDictTable = findDictTable;
exports.onReady = onReady;
exports.onDataResult = onDataResult;
exports.notifyCommandFromNative = notifyCommandFromNative;