import { 
  Bridge, 
  SearchResult, 
  MenuOption, 
  MenuExOption, 
  MenuPosition, 
  CloseType, 
  ShareType, 
  PosterDetail, 
  SignType,
  IdCardScanOption
} from '../../interface/bridge';

import { 
  data 
} from '../../data/data';

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
  console.log(`HyBridge Execute: ${method}, ${params}`);
  noReturned ? console.log(`Hybridge Callback: ${name}`) : console.log('Hybridge Callback: none');

  return new Promise<T>(resolve => {
    if (noReturned) {
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
    call<any>('showActionBarPanel', JSON.stringify({ type: position.toString(), show }));
  }

  rightMenu(option: MenuExOption): void {
    if (typeof option.params === 'object') {
      option.params = JSON.stringify(option.params);
    }
    call<any>('setWebViewMenu', JSON.stringify(option));
  }

  articleDetail(url: string, title: string = '', buttonTitle: string = ''): void {
    call<any>('studyArticleDetail', JSON.stringify({ url, title, buttonTitle }));
  }

  viewPdf(url: string, title: string = '', buttonTitle: string = ''): Promise<string> {
    return call<any>('studyArticleDetail',
      JSON.stringify({ url, title, buttonTitle }), 'viewPdf', false);
  }

  startAudioRec(show: boolean): Promise<string> {
    return call<any>('requestAudioRecording', show, 'audio', false);
  }

  callAddress(): Promise<string> {
    return call<any>('popUpAddressChooseView', '', 'address', false);
  }

  idCardScan(option: IdCardScanOption): Promise<string> {
    const obj = Object.assign({ isOCR: false, isHideMessage: false }, option);
    return call<any>('requestScanCertificateCard', JSON.stringify({
      isOCR: obj.isOCR,
      hiddenMessage: obj.isHideMessage
    }), 'idCard', false);
  }

  getBank(): Promise<string> {
    return call<any>('requestScanBankCard', '', 'bank', false);
  }

  caSign(name: string, type: SignType, serialized: string): Promise<string> {
    const obj = {
      name, type: type.toString(), params: serialized
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

  goNativeHome(): void {
    this.closeWebview(CloseType.CLOSE_AND_HOME);
  }

  showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string = '', callback: string = ''): Promise<string> {
    return call<any>('appLocalShare',
      JSON.stringify({ type, url, imageUrl, title, desc, callback }),
      'shareInvoke', false);
  }

  wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
    call<any>('setAppMinProgramShareData', JSON.stringify({
      webPageUrl, path, imageUrl, title, desc, callback
    }));
  }

  showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string = '', callback: string = ''): void {
    call<any>('setAppLocalShareData',
      JSON.stringify({ type: type.toString(), url, imageUrl, title, desc, callback }))
  }

  showShareArr(javascript: string = '', url: string, imageUrl: string, title: string, desc: string): void {
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

  showRiskArr(icon1: string, callback1: string, icon2: string, callback2: string): void {
    const icons = [{
      type: 'image', title: icon1, javascript: callback1
    }, {
      type: 'image', title: icon2, javascript: callback2
    }];

    call<any>('setWebViewMenus', JSON.stringify(icons));
  }

  clearRiskArr(): void {
    call<any>('setWebViewMenus', JSON.stringify([]));
  }

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

  showPosterDetail(param: Array<PosterDetail>, index: number): void {
    call<any>('showPosterDetail',
      JSON.stringify({ posterListStr: param, position: index }));
  }

  sendSms(telephones: Array<string>, content: string): void {
    call<any>('sendSms', JSON.stringify({ mobiles: telephones, message: content }));
  }

  findDictTable(type: string): Promise<string> {
    return new Promise<string>(resolve => {
      resolve('{}');
    });
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
