import { Bridge, SearchResult, MenuOption, MenuExOption, MenuPosition, CloseType, ShareType, PosterDetail } from '../../interface/bridge';
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

declare var window: Window & {
  webkit: any
}

async function ready(): Promise<string> {
  console.log(`HyBridge Ready: Checking bridge if it's ready ...`);
  let tid = 0;
  return new Promise<string>(resolve => {
    if (data.status.loadstatus) {
      setTimeout(() => {
        console.log(`HyBridge Ready: Checked.`);
        resolve('success');
      }, 0);
    } else {
      tid = setInterval(() => {
        if (data.status.loadstatus) {
          clearInterval(tid);
          console.log(`HyBridge Ready: Checked.`);
          resolve('success');
        }
      }, sleep);
    }
  });
}

async function execute<T>(method: string, params: string | number | boolean, name: string, noReturned: boolean): Promise<T> {
  console.log(`HyBridge Execute: ${method}, ${params}, ${name}, ${noReturned}`);
  return new Promise<T>(resolve => {
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
        resolve(d.value as T);
      }
    }, sleep);
  });
}

async function call<T>(method: string, params: string | number | boolean, name: string = '', noReturned: boolean = true): Promise<T> {
  console.log(`HyBridge Call: ${method}, ${params}, ${name}, ${noReturned}`);
  await ready();
  return await execute<T>(method, params, name, noReturned);
}

export default class IOSBridge implements Bridge {
  openSearch(type: string, hint: string, message: string): SearchResult {
    call<any>('openSearch', JSON.stringify({ type, hint, message }));
    return data.status.search;
  }

  toggleSearch(isHide: boolean): void {
    call<any>('hideSearchBox', isHide);
  }

  SetH5Header(title: string): void {
    call<any>('onJSInvokeResult', JSON.stringify({ type: '1', title }));
  }

  leftMenu(option: MenuOption): void {
    call<any>('setActionBarBackItem', JSON.stringify(option));
  }

  toggleMenu(position: MenuPosition, show: boolean): void {
    call<any>('showActionBarPanel', JSON.stringify({ type: position.toString(), show}));
  }

  rightMenu(option: MenuExOption): void {
    if (typeof option.params === 'object') {
      option.params = JSON.stringify(option.params);
    }
    call<any>('setWebViewMenu', JSON.stringify(option));
  }

  articleDetail(url: string, title: string = '', buttonTitle: string = ''): void {
    call<any>('studyArticleDetail', JSON.stringify({url, title, buttonTitle}));
  }

  viewPdf(url: string, title: string = '', buttonTitle: string = ''): Promise<string> {
    return call<any>('studyArticleDetail', 
      JSON.stringify({url, title, buttonTitle}), 'viewPdf', false);
  }

  startAudioRec(show: boolean): Promise<string> {
    return call<any>('requestAudioRecording', show, 'audio', false);
  }

  callAddress(): Promise<string> {
    return call<any>('popUpAddressChooseView', '', 'address', false);
  }

  idCardScan(): Promise<string> {
    return call<any>('requestScanCertificateCard', '', 'idCard', false);
  }

  getBank(): Promise<string> {
    return call<any>('requestScanBankCard', '', 'bank', false);
  }

  caSign(name: string, type: number, keyword: string): Promise<string> {
    const obj = {
      name, type, params: { keyword }
    }

    return call<any>('requestCAGestureSignData', 
      JSON.stringify(obj), 'sign', false);
  }

  getJob(): Promise<string> {
    return call<any>('requestOccupationDicItem', '', 'job', false);
  }

  getCustomer(): Promise<string> {
    return call<any>('requestImportCustomerItem', '', 'customer', false);
  }

  closeWebview(n: CloseType = CloseType.CLOSE): void {
    call<any>('closeWebview', n.toString());
  }

  showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string> {
    return call<any>('appLocalShare', 
      JSON.stringify({ type, url, imageUrl, title, desc, callback }), 
      'shareInvoke', false);
  }

  // wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
  //   return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
  // }

  showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void {
    call<any>('setAppLocalShareData', 
      JSON.stringify({ type, url, imageUrl, title, desc, callback }))
  }

  showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void {
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

    call<any>('setWebViewMenus', JSON.stringify(obj));
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

  callCamera(): Promise<string> {
    return call<any>('takeUserImage', 
      JSON.stringify({ isCut: false }), 'camera', false);
  }

  tailorCamera(isCut: boolean, width: number, height: number): Promise<string> {
    return call<any>('takeUserImage', 
      JSON.stringify({ isCut, width, height }), 'camera', false);
  }

  takeUserImageMultiple(count: number = 1): Promise<string> {
    return call<any>('takeUserImageMultiple', count, 'images', false);
  }

  callCameraMultiple(count: number = 1): Promise<string> {
    return call<any>('takeUserImageMultiple', count, 'images', false);
  }

  nativeAjax(url: string, data: any, method: string): void {
    // 异步对象
    var ajax = new XMLHttpRequest()
    // get 跟post  需要分别写不同的代码
    if (method == 'get') {
      // get请求
      if (data) {
        // 如果有值
        url += '?'
        url += data
      } else {

      }
      // 设置 方法 以及 url
      ajax.open(method, url)
      // send即可
      ajax.send()
    } else {
      // post请求
      // post请求 url 是不需要改变
      ajax.open(method, url)

      // 需要设置请求报文
      ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

      // 判断data send发送数据
      if (data) {
        // 如果有值 从send发送
        ajax.send(data)
      } else {
        // 木有值 直接发送即可
        ajax.send()
      }
    }
    // 注册事件
    ajax.onreadystatechange = function () {
      // 在事件中 获取数据 并修改界面显示
      if (ajax.readyState == 4 && ajax.status == 200) {
        alert('bbbb')
      }
    }
  }

  showPosterDetail(param: Array<PosterDetail>, index: number): void {
    call<any>('showPosterDetail', 
      JSON.stringify({ posterListStr: param, position: index }));
  }

  sendSms(telephones: Array<string>, content: string): void {
    call<any>('sendSms', JSON.stringify({ mobiles: telephones, message: content }));
  }

  shareShareEntry(type: ShareType, url: string, title: string, desc: string, callback: string): void {
    call<any>('setAppLocalShareData', 
      JSON.stringify({ type, url, title, desc, callback }));
  }



  onReady(): void {
    data.status.loadstatus = true;
  }

  onDataResult(eventType: string, eventData: string) {
    console.log('@method window.app2js_onDataResult:', eventType, eventData);

    if (eventType === 'search') {
      const item = data.status['search']
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

  notifyCommandFromNative(): void { }
}