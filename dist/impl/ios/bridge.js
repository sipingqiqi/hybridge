var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { data } from '../../data/data';
const sleep = 100;
const events = {
    'takeUserImage': 'camera',
    'popUpAddressChooseView': 'address',
    'requestScanCertificateCard': 'idCard',
    'requestImportbankItem': 'bank',
    'requestOccupationDicItem': 'job',
    'requestCAGestureSignData': 'sign',
    'requestImportCustomerItem': 'customer',
    'studyArticleDetail': 'viewPdf',
    'appLocalShare': 'shareInvoke',
    'requestAudioRecording': 'audio',
    'takeUserImageMultiple': 'images',
};
function ready() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`HyBridge Ready: Checking bridge if it's ready ...`);
        let tid = 0;
        return new Promise(resolve => {
            if (data.status.loadstatus) {
                setTimeout(() => {
                    console.log(`HyBridge Ready: Checked.`);
                    resolve('success');
                }, 0);
            }
            else {
                tid = setInterval(() => {
                    if (data.status.loadstatus) {
                        clearInterval(tid);
                        console.log(`HyBridge Ready: Checked.`);
                        resolve('success');
                    }
                }, sleep);
            }
        });
    });
}
function execute(method, params, name, noReturned) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`HyBridge Execute: ${method}, ${params}, ${name}, ${noReturned}`);
        return new Promise(resolve => {
            if (noReturned) {
                //window.HQAppJSInterface[method](...params);
                if (window.webkit && window.webkit.messageHandlers) {
                    const handler = window.webkit.messageHandlers[method];
                    handler && handler.postMessage && handler.postMessage(params);
                }
                resolve(null);
                return;
            }
            let tid = 0;
            const d = data.status[name];
            d.value = '';
            d.status = false;
            //window.HQAppJSInterface[method](...params);
            if (window.webkit && window.webkit.messageHandlers) {
                const handler = window.webkit.messageHandlers[method];
                handler && handler.postMessage && handler.postMessage(params);
            }
            tid = setInterval(() => {
                if (d.status) {
                    clearInterval(tid);
                    resolve(d.value);
                }
            }, sleep);
        });
    });
}
function call(method, params, name = '', noReturned = true) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`HyBridge Call: ${method}, ${params}, ${name}, ${noReturned}`);
        yield ready();
        return yield execute(method, params, name, noReturned);
    });
}
export default class IOSBridge {
    openSearch(type, hint, message) {
        call('openSearch', JSON.stringify({ type, hint, message }));
        return data.status.search;
    }
    toggleSearch(isHide) {
        call('hideSearchBox', isHide);
    }
    SetH5Header(title) {
        call('onJSInvokeResult', JSON.stringify({ type: '1', title }));
    }
    leftMenu(option) {
        call('setActionBarBackItem', JSON.stringify(option));
    }
    toggleMenu(position, show) {
        call('showActionBarPanel', JSON.stringify({ type: position.toString(), show }));
    }
    rightMenu(option) {
        if (typeof option.params === 'object') {
            option.params = JSON.stringify(option.params);
        }
        call('setWebViewMenu', JSON.stringify(option));
    }
    articleDetail(url, title = '', buttonTitle = '') {
        call('studyArticleDetail', JSON.stringify({ url, title, buttonTitle }));
    }
    viewPdf(url, title = '', buttonTitle = '') {
        return call('studyArticleDetail', JSON.stringify({ url, title, buttonTitle }), 'viewPdf', false);
    }
    startAudioRec(show) {
        return call('requestAudioRecording', show, 'audio', false);
    }
    callAddress() {
        return call('popUpAddressChooseView', '', 'address', false);
    }
    idCardScan() {
        return call('requestScanCertificateCard', '', 'idCard', false);
    }
    getBank() {
        return call('requestScanBankCard', '', 'bank', false);
    }
    caSign(name, type, keyword) {
        const obj = {
            name, type, params: { keyword }
        };
        return call('requestCAGestureSignData', JSON.stringify(obj), 'sign', false);
    }
    getJob() {
        return call('requestOccupationDicItem', '', 'job', false);
    }
    getCustomer() {
        return call('requestImportCustomerItem', '', 'customer', false);
    }
    closeWebview(n) {
        call('closeWebview', n);
    }
    showShare(type, url, imageUrl, title, desc, callback) {
        return call('appLocalShare', JSON.stringify({ type, url, imageUrl, title, desc, callback }), 'shareInvoke', false);
    }
    // wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
    //   return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
    // }
    showShareBtn(type, url, imageUrl, title, desc, callback) {
        call('setAppLocalShareData', JSON.stringify({ type, url, imageUrl, title, desc, callback }));
    }
    showShareArr(javascript, url, imageUrl, title, desc) {
        const obj = [{
                title: '搜索',
                javascript
            }, {
                title: '分享',
                attachData: {
                    typeSet: ['1'],
                    url,
                    imageUrl,
                    title,
                    desc,
                    callback: 'shareCallback'
                }
            }];
        call('setWebViewMenus', JSON.stringify(obj));
    }
    // /**
    //  * 右上角设置两个图标
    //  * 类型为base64，大小限定50*50
    //  * @param baseImg 图1
    //  * @param fun1 
    //  * @param baseImg2 图2
    //  * @param fun2 
    //  * 执行函数，无返回值无mock有回调
    //  */
    // const showRiskArr = function(baseImg: string, fun1: string, baseImg2: string, fun2: string): void {
    //   return instance.showRiskArr(baseImg, fun1, baseImg2, fun2);
    // }
    callCamera() {
        return call('takeUserImage', JSON.stringify({ isCut: false }), 'camera', false);
    }
    tailorCamera(isCut, width, height) {
        return call('takeUserImage', JSON.stringify({ isCut, width, height }), 'camera', false);
    }
    takeUserImageMultiple(count = 1) {
        return call('takeUserImageMultiple', count, 'images', false);
    }
    callCameraMultiple(count = 1) {
        return call('takeUserImageMultiple', count, 'images', false);
    }
    nativeAjax(url, data, method) {
        // 异步对象
        var ajax = new XMLHttpRequest();
        // get 跟post  需要分别写不同的代码
        if (method == 'get') {
            // get请求
            if (data) {
                // 如果有值
                url += '?';
                url += data;
            }
            else {
            }
            // 设置 方法 以及 url
            ajax.open(method, url);
            // send即可
            ajax.send();
        }
        else {
            // post请求
            // post请求 url 是不需要改变
            ajax.open(method, url);
            // 需要设置请求报文
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // 判断data send发送数据
            if (data) {
                // 如果有值 从send发送
                ajax.send(data);
            }
            else {
                // 木有值 直接发送即可
                ajax.send();
            }
        }
        // 注册事件
        ajax.onreadystatechange = function () {
            // 在事件中 获取数据 并修改界面显示
            if (ajax.readyState == 4 && ajax.status == 200) {
                alert('bbbb');
            }
        };
    }
    showPosterDetail(param, index) {
        call('showPosterDetail', JSON.stringify({ posterListStr: param, position: index }));
    }
    sendSms(telephones, content) {
        call('sendSms', JSON.stringify({ mobiles: telephones, message: content }));
    }
    shareShareEntry(type, url, title, desc, callback) {
        call('setAppLocalShareData', JSON.stringify({ type, url, title, desc, callback }));
    }
    onReady() {
        data.status.loadstatus = true;
    }
    onDataResult(eventType, eventData) {
        console.log('@method window.app2js_onDataResult:', eventType, eventData);
        if (eventType === 'search') {
            const item = data.status['search'];
            item.status = true;
            item.value = eventData;
            item.callback(JSON.parse(eventData));
            return;
        }
        const name = events[eventType];
        if (name) {
            const item = data.status[name];
            if (item) {
                item.status = true;
                item.value = eventData;
            }
        }
    }
    notifyCommandFromNative() { }
}
