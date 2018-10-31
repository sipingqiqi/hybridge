import {
  SearchResult,
  MenuOption,
  MenuExOption,
  PosterDetail,
  MenuPosition,
  CloseType,
  ShareType,
  Bridge,
  SignType,
} from './interface/bridge';

import Browser from './impl/browser/bridge';
import iOS from './impl/ios/bridge';
import Android from './impl/android/bridge';

import { getCookie, setCookie, deleteCookie, ostype, token } from './utils/cookie';
import { gobackbtn } from './utils/navigator';
import { nativeAjax } from './utils/ajax';
import { dictionary, KVtoNV, setDictionary, setAllDictionary, getDictionary, findDictionary, _findDictionary } from './utils/dictionary';
import { data } from './data/data';

let instance: Bridge = null;

const aliasNames = {
  onReady: 'HQAppGetH5Header',
  onDataResult: 'app2js_onDataResult',
  notifyCommandFromNative: 'notifyCommandFromNative',
}

declare var window: Window & {
  HQAppGetH5Header(): void,
  app2js_onDataResult(type: string, data: string): void,
  notifyCommandFromNative(): void,

  gobackbtn(pathName: string): void,
  ostype(): string,
  token(): string,
  nativeAjax(): void,

  dictionary: any,
  KVtoNV: any,
  setDictionary: any,
  setAllDictionary: any,
  getDictionary: any,
  findDictionary: any,
  _findDictionary: any,

  cookie: any,
  jsBridge: any,
}

/**
 * 挂载 bridge 对象
 * @param bridge - 实现 Bridge 接口的类型实例
 */
const mount = function (bridge: Bridge) {
  instance = bridge;

  Object.assign(window, {
    ostype,
    token,
    gobackbtn,
    nativeAjax,
    jsBridge: data,

    dictionary,
    KVtoNV,
    setDictionary,
    setAllDictionary,
    getDictionary,
    findDictionary,
    _findDictionary,
  });

  window.cookie = {
    set: setCookie,
    get: getCookie,
    delete: deleteCookie,
  }

  Object.keys(functions).forEach(key => {
    const alias = aliasNames[key];
    const func = instance[key];
    if (func) {
      window[alias || key] = func.bind(instance);
    }
  });

  setAllDictionary();
}

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
const openSearch = function (type: string, hint: string, message: string): SearchResult {
  return instance.openSearch(type, hint, message);
}

/**
 * 隐藏搜索框
 *
 * @param isHide 是否隐藏搜索框
 * * 为 `true` 隐藏，为 `false` 显示
 */
function toggleSearch(isHide: boolean): void {
  instance.toggleSearch(isHide);
}

/**
 * 设置标题文字
 * @param title 标题文字
 */
const SetH5Header = function (title: string): void {
  instance.SetH5Header(title);
}

/**
 * 设置标题栏左侧按钮
 * 
 * @param option 按钮选项
 * * `MenuOption`.`title` 按钮文字
 * * `MenuOption`.`javascript` 回调方法的名称
 */
function leftMenu(option: MenuOption): void {
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
function toggleMenu(option: MenuPosition, show: boolean): void {
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
function rightMenu(option: MenuExOption): void {
  return instance.rightMenu(option);
}


/**
 * 打开 PDF 文件
 * @param url - PDF 文件的 URL 地址
 * @param title - 阅读窗体的标题文字
 * @param btnTxt - 按钮文字
 */
function articleDetail(url: string, title: string, btnTxt: string): void {
  return instance.articleDetail(url, title, btnTxt);
}

/**
 * 查看 PDF 文档
 * @param url 打开的地址,主要有图片、PDF、视频三类数据
 * @param title 数据的标题
 * @param btnTxt 按钮上的文字
 * @returns {Promise} JSON 字符串，标识文章的已读信息
 */
function viewPdf(url: string, title: string, btnTxt: string): Promise<string> {
  return instance.viewPdf(url, title, btnTxt);
}

/**
 * 启动录音
 * @param show 显示隐藏, true:显示; false:隐藏 
 * @returns {Promise} JSON 字符串，音频文件信息
 */
function startAudioRec(show: boolean): Promise<string> {
  return instance.startAudioRec(show);
}

/**
 * 调用原生拍照
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
function callCamera(): Promise<string> {
  return instance.callCamera();
}

/**
 * 调用原生拍照，并按固定大小裁剪
 * @param isCut 是否需要裁剪
 * @param width 宽度
 * @param height 高度
 * @returns {Promise} JSON 字符串，以 base64 编码的照片内容
 */
function tailorCamera(isCut: boolean, width: number, height: number): Promise<string> {
  return instance.tailorCamera(isCut, width, height);
}

/**
 * 打开地址选择弹窗，可以选择“省”、“市”、“区”等
 * @returns {Promise} JSON 字符串，返回用户选择的省市区信息
 */
function callAddress(): Promise<string> {
  return instance.callAddress();
}

/**
 * 打开身份证扫描弹窗，可以获取姓名、证件号码等信息
 * @returns {Promise} JSON 字符串，返回身份证上的所有文字信息
 */
function idCardScan(isOCR: boolean): Promise<string> {
  return instance.idCardScan(isOCR);
}

/**
 * 打开银行卡扫描弹窗，可以获得银行名称、卡号、卡片种类等信息
 * @returns {Promise} JSON 字符串，返回银行卡面上的所有文字信息
 */
function getBank(): Promise<string> {
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
function caSign(name: string, type: SignType, serialized: string): Promise<string> {
  return instance.caSign(name, type, serialized);
}

/**
 * 打开职业选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择职业信息
 */
function getJob(): Promise<string> {
  return instance.getJob();
}

/**
 * 打开客户信息选择弹窗
 * @returns {Promise} JSON 字符串，返回用户选择的客户信息
 */
function getCustomer(): Promise<string> {
  return instance.getCustomer();
}

/**
 * 关闭当前 WebView 窗口
 * @param type 关闭类型（可选），默认为仅关闭 WebView 窗口
 * * `CloseType`.`CLOSE_AND_HOME` 关闭 WebView 窗口，并回到 APP 首页
 * * `CloseType`.`CLOSE` 关闭 WebView 窗口，停留在 APP 的当前页面
 */
function closeWebview(type: CloseType): void {
  return instance.closeWebview(type);
}

/**
 * 关闭当前 WebView 窗口，并且回到 APP 首页
 */
function goNativeHome(): void {
  return instance.goNativeHome();
}

/**
 * 打开原生相机，拍摄多张照片
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
function takeUserImageMultiple(count: number): Promise<string> {
  return instance.takeUserImageMultiple(count);
}

/**
 * 打开原生相机，拍摄多张照片，与 takeUserImageMultiple(count: number) 方法相同
 * @param count 照片数量
 * @returns {Promise} JSON 字符串，返回拍摄的照片
 */
const callCameraMultiple = function (count: number): Promise<string> {
  return instance.callCameraMultiple(count);
}

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
function showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string> {
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
function wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
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
function showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void {
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
function showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void {
  return instance.showShareArr(javascript, url, imageUrl, title, desc);
}

/**
 * 在标题栏右侧，显示多个图标按钮，要求图标大小 50 X 50 
 * @param icon 第一个图标，以 base64 编码
 * @param callback 第一个图标的回调函数名称
 * @param secondIcon 第二个图标，以 base64 编码
 * @param secondCallback 第二个图标的回调函数名称
 */
function showRiskArr(icon: string, callback: string, secondIcon: string, secondCallback: string): void {
  return instance.showRiskArr(icon, callback, secondIcon, secondCallback);
}

/**
 * 清空标题栏右侧的图标按钮
 */
function clearRiskArr(): void {
  return instance.clearRiskArr();
}

/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 * 
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
function showPosterDetail(param: Array<PosterDetail>, index: number): void {
  return instance.showPosterDetail(param, index);
}

/**
 * 打开原生的短信编辑页面
 * @param telephones 电话号码列表
 * @param content - 短信内容
 */
function sendSms(telephones: Array<string>, content: string): void {
  return instance.sendSms(telephones, content);
}

/**
 * 查询数据字典
 * @param type 字典类型
 * @returns {Promise} JSON 字符串，返回数据字典的值
 */
function findDictTable(type: string): Promise<string> {
  return instance.findDictTable(type);
}

/**
 * 用于接收来自 native 的通知，当 native 环境准备好之后，会调用此方法
 */
function onReady(): void {
  instance.onReady();
}

/**
 * 用于接收来自 native 的通知，当 native 返回结果时，回调此方法
 */
function onDataResult(eventType: string, eventData: string): void {
  instance.onDataResult(eventType, eventData);
}

/**
 * 用于接收来自 native 的通知，暂时没用
 */
function notifyCommandFromNative(): void { 
  instance.notifyCommandFromNative();
}

const functions = {
  MenuPosition,
  CloseType,
  ShareType,
  SignType,

  gobackbtn,
  openSearch,
  toggleSearch,
  SetH5Header,
  leftMenu,
  toggleMenu,
  rightMenu,
  articleDetail,
  viewPdf,
  startAudioRec,
  callCamera,
  tailorCamera,
  callAddress,
  idCardScan,
  getBank,
  caSign,
  getJob,
  getCustomer,
  closeWebview,
  goNativeHome,
  takeUserImageMultiple,
  callCameraMultiple,
  showShare,
  wechatShare,
  showShareBtn,
  showShareArr,
  showRiskArr,
  clearRiskArr,
  showPosterDetail,
  sendSms,
  findDictTable,

  onReady,
  onDataResult,
  notifyCommandFromNative,
}

const install = function (Vue, options) {
  console.log('Mount hybridge to vue');

  switch (ostype()) {
    case OS.IOS:
      mount(new iOS());
      break;
    case OS.ANDROID:
      mount(new Android());
      break;
    default:
      mount(new Browser());
      break;
  }

  Vue.prototype.$bridge = functions;
}

enum OS {
  IOS = 'ios',
  ANDROID = 'android',
}

export {
  Browser as BROWSER,
  iOS as IOS,
  Android as ANDROID,
  OS,
  install,
  mount,

  SearchResult,
  MenuOption,
  PosterDetail,
  
  MenuPosition,
  CloseType,
  ShareType,
  SignType,

  gobackbtn,
  openSearch,
  toggleSearch,
  SetH5Header,
  leftMenu,
  toggleMenu,
  rightMenu,
  articleDetail,
  viewPdf,
  startAudioRec,
  callCamera,
  tailorCamera,
  callAddress,
  idCardScan,
  getBank,
  caSign,
  getJob,
  getCustomer,
  closeWebview,
  goNativeHome,
  takeUserImageMultiple,
  callCameraMultiple,
  showShare,
  wechatShare,
  showShareBtn,
  showShareArr,
  showRiskArr,
  clearRiskArr,
  showPosterDetail,
  sendSms,
  findDictTable,

  onReady,
  onDataResult,
  notifyCommandFromNative,
}
