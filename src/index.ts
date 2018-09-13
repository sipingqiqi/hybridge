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

  //setAllDictionary();
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
 * @param isHide - 为 true 时，隐藏搜索框；为 false 时，显示搜索框
 */
function toggleSearch(isHide: boolean): void {
  instance.toggleSearch(isHide);
}

/**
 * 设置标题文字
 * @param title - 标题文字
 */
const SetH5Header = function (title: string): void {
  instance.SetH5Header(title);
}

/**
 * 设置标题栏左侧按钮
 * @param option - 按钮选项，MenuOption.javascript 全局方法名，MenuOption.title 设置文字
 */
const leftMenu = function (option: MenuOption): void {
  return instance.leftMenu(option);
}

/**
 * 设置标题栏左、右按钮是否显示
 * @param option - 指定要操作的按钮，MenuPosition.LEFT / MenuPosition.RIGHT / MenuPosition.BOTH
 * @param show - 指定是否显示
 */
const toggleMenu = function (option: MenuPosition, show: boolean): void {
  return instance.toggleMenu(option, show);
}

/**
 * 设置标题栏右按钮
 * @param option - 按钮选项
 */
const rightMenu = function (option: MenuExOption): void {
  return instance.rightMenu(option);
}


/**
 * 查看 PDF 文档，同 viewPdf 方法
 * @param url - 打开的地址
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
const articleDetail = function (url: string, title: string, btnTxt: string): void {
  return instance.articleDetail(url, title, btnTxt);
}

/**
 * 查看 PDF 文档
 * @param url - 打开的地址,主要有图片、PDF、视频三类数据
 * @param title - 数据的标题
 * @param btnTxt - 按钮上的文字
 */
const viewPdf = function (url: string, title: string, btnTxt: string): Promise<string> {
  return instance.viewPdf(url, title, btnTxt);
}

/**
 * 启动录音功能
 * @param isShow - 显示隐藏, true:显示; false:隐藏 
 */
const startAudioRec = function (isShow: boolean): Promise<string> {
  return instance.startAudioRec(isShow);
}

/**
 * 拍照
 */
const callCamera = function (): Promise<string> {
  return instance.callCamera();
}

/**
 * 拍照并裁剪
 * @param n 
 * @param bool 
 * @param width 
 * @param height 
 */
const tailorCamera = function (isCut: boolean, width: number, height: number): Promise<string> {
  return instance.tailorCamera(isCut, width, height);
}

/**
 * 打开地址选择窗口
 */
const callAddress = function (): Promise<string> {
  return instance.callAddress();
}

/**
 * 打开身份证件扫描窗口
 */
const idCardScan = function (): Promise<string> {
  return instance.idCardScan();
}

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
const getBank = function (): Promise<string> {
  return instance.getBank();
}

/**
 * 打开 CA 手写签名窗口
 * @param name 
 * @param type 
 * @param serialized 
 */
const caSign = function (name: string, type: SignType, serialized: string): Promise<string> {
  return instance.caSign(name, type, serialized);
}

/**
 * 选择并导入职业信息
 */
const getJob = function (): Promise<string> {
  return instance.getJob();
}

/**
 * 选择并导入客户信息
 */
const getCustomer = function (): Promise<string> {
  return instance.getCustomer();
}

/**
 * 关闭当前 WebView 窗口
 * @param n - 直接关闭，或者关闭并返回首页
 */
const closeWebview = function (n: CloseType): void {
  return instance.closeWebview(n);
}

const goNativeHome = function(): void {
  return instance.goNativeHome();
}

/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
const takeUserImageMultiple = function (count: number): Promise<string> {
  return instance.takeUserImageMultiple(count);
}

/**
 * 拍照（多张照片）
 * @param count - 照片数量
 */
const callCameraMultiple = function (count: number): Promise<string> {
  return instance.callCameraMultiple(count);
}

/**
 * 指定显示右上角的分享按钮 无法实现
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
const showShare = function (type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string> {
  return instance.showShare(type, url, imageUrl, title, desc, callback);
}

/**
 * 微信小程序分享
 * @param webPageUrl - 兼容低版本的网页链接
 * @param path - 小程序页面路径
 * @param imageUrl - 图片地址
 * @param title - 标题
 * @param desc - 描述
 * @param callback - 分享后的回调方法名
 */
const wechatShare = function(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
  return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
}

/**
 * 右上角显示分享图标，并完成分享操作
 * @param type - 分享类型，详情参见 ShareType 枚举类型
 * @param url - 分享链接
 * @param imageUrl - 分享图片
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享后的回调方法名
 */
const showShareBtn = function (type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void {
  return instance.showShareBtn(type, url, imageUrl, title, desc, callback);
}

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
const showShareArr = function (javascript: string, url: string, imageUrl: string, title: string, desc: string): void {
  return instance.showShareArr(javascript, url, imageUrl, title, desc);
}

/**
 * 右上角设置两个图标
 * 类型为base64，大小限定50*50
 * @param baseImg 图1
 * @param fun1 
 * @param baseImg2 图2
 * @param fun2 
 * 执行函数，无返回值无mock有回调
 */
const showRiskArr = function(icon1: string, callback1: string, icon2: string, callback2: string): void {
  return instance.showRiskArr(icon1, callback1, icon2, callback2);
}

const clearRiskArr = function(): void {
  return instance.clearRiskArr();
}

/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 * 
 * @param param - 海报 url 列表, type、subType、adId 均为 “1”
 * @param index - 海报索引
 */
const showPosterDetail = function (param: Array<PosterDetail>, index: number): void {
  return instance.showPosterDetail(param, index);
}

/**
 * 发短信 打开短信编辑界面
 * @param telNum - 电话号码
 * @param content - 发送的内容
 */
const sendSms = function (telephones: Array<string>, content: string): void {
  return instance.sendSms(telephones, content);
}

/**
 * 设置分享数据，内部调用,设置分享数据的
 * @param type - 分享类型
 * @param url - 分享地址
 * @param title - 分享标题
 * @param desc - 分享描述
 * @param callback - 分享完成后的回调方法名
 */
const shareShareEntry = function (type: ShareType, url: string, title: string, desc: string, callback: string): void {
  return instance.shareShareEntry(type, url, title, desc, callback);
}

const findDictTable = function (type: string): Promise<string> {
  return instance.findDictTable(type);
}

function onReady(): void {
  instance.onReady();
}

function onDataResult(eventType: string, eventData: string): void {
  instance.onDataResult(eventType, eventData);
}

function notifyCommandFromNative(): void { 
  instance.notifyCommandFromNative();
}

// const goBack = function(pathName: string): void {
//   return instance.goBack(pathName);
// }

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
  //saveImage,
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
  shareShareEntry,
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
  //saveImage,
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
  shareShareEntry,
  findDictTable,

  onReady,
  onDataResult,
  notifyCommandFromNative,
}
