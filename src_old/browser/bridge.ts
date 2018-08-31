import { Bridge, SearchResult, MenuOption, MenuPosition, CloseType, ShareType, PosterDetail } from '../bridge'
import Zip from '../util/zip'

interface FileToBase64Result {
    full: string,
    split: string
}

const zip = new Zip()
let __tid = 0;

export class BridgeImpl implements Bridge {

    constructor (api: any, app: any) {
        this.api = api;
        this.app = app;
    }

    openSearch(type: string, hint: string, message: string): SearchResult {
        return {
            status: true,
            value: '',
            callback() {}
        }
    }

    toggleSearch(isHide: boolean): void {}

    SetH5Header(n: string): void {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
        if (isAndroid) {
            document.title = n
        } else {
            var $body = document.body
            document.title = n
            /**
             * 设置一个空的占位iframe，每次调用时增加去除 可以强制刷新;
             */
            var $iframe = document.createElement('iframe')
            $body.appendChild($iframe)
            setTimeout(_ => {
                $body.removeChild($iframe)
            })
        }
    }

    leftMenu(n: MenuOption): void {}

    toggleMenu(n: MenuPosition, show: boolean): void {}

    rightMenu(n: MenuOption): void {}

    articleDetail(url: string, title: string, btnTxt: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    viewPdf(url: string, title: string, btnTxt: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    startAudioRec(isShow: boolean): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    callCamera(): Promise<string> {
        return new Promise<string>((res, rej) => {
            let fileObj: Blob = null;
            let fileInput: HTMLInputElement = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/*');
            var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
            fileInput.dispatchEvent(evt);
            fileInput.onchange = function (e) {
                if (fileInput.files.length > 0) {
                    fileObj = fileInput.files[0];
                    zip.run(fileObj).then(success => {
                        let base64 = success.base64.split('base64,')[1]
                        res(base64);
                        fileInput.remove()
                    })
                }
            }
        })
    }

    tailorCamera(n: number, bool: boolean, width: number, height: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    callAddress(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    idCardScan(): Promise<string> {
        let __this = this;
        function getIdCard(): Promise<string> {
            return new Promise((res,rej) => {
                this.callCamera().then(base64=>{
                    res(this.app.axios.post(__this.api.IDCARD, { base64 }))
                })
            })
        }
        return getIdCard();
    }

    saveImage(base64String: string): void {}

    getBank(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    caSign(name: string, type: string, keyWord: string): Promise<string> {
        let __this = this;

        __this.clearTimer()
        __this.app.$router.push('/h5SignIn')
        function sign(): Promise<string> {
            return new Promise<string>((resolve, reject) => {
                __tid = window.setInterval(success => {
                    if (__this.app.$store.state.jsBridge.caSign.includes('base64')) {
                        __this.clearTimer()
                        resolve(__this.app.$store.state.jsBridge.caSign)
                        __this.app.$store.commit('clearCaSign')
                    } else {
                        // reject('fail')
                    }
                }, 30)
            })
        }

        return sign()
    }

    getJob(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success')
            this.app.$router.push('/jobList')
        })
    }

    getCustomer(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    closeWebview(n: CloseType): void {}

    takeUserImageMultiple(count: number): Promise<Array<string>> {
        this.clearTimer()
        let __this = this;
        let imgs = []
        function getImg() {
            return new Promise((res, rej) => {
                const fileInput: HTMLInputElement = __this.getFile()
                fileInput.onchange = function () {
                    if (fileInput.files.length > 0) {
                        __this.getFileToBase64(fileInput.files[0], obj => {
                            imgs.push(obj);
                            res(obj);
                        })
                    }

                    fileInput.remove();
                }
            })
        }
        let countArr = []
        for (let i = 0; i < count; i++) {
            countArr.push(getImg())
        }
        let imgArr = Promise.all(countArr)
        imgArr.then(res => {
            console.log(res)
        })
        return new Promise<Array<string>>((res, rej) => {
            this.clearTimer()
            __tid = setInterval(_ => {
                console.log(imgs);
                if (imgs.length == count) {
                    this.clearTimer()
                    res(imgs)
                }
            }, 30)
        })
    }

    callCameraMultiple(count: number): Promise<Array<string>> {
        return this.takeUserImageMultiple(count);
    }

    shareShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve('success');
        })
    }

    wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {}

    showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void {}

    showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void {}

    showRiskArr(baseImg: string, fun1: string, baseImg2: string, fun2: string): void {}

    nativeAjax(url: string, data: any, method: string): void {}

    showPosterDetail(param: Array<PosterDetail>, index: number): void {}

    sendSms(telNum: string, content: string): void {}

    shareShareEntry(type: ShareType, url: string, title: string, desc: string, callback: string): void {}

    goBack(pathName: string): void {
        const __this = this;
        const __gobackbtn = function (pathName) {
            //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
            // params 参数说明：
            // - 为空： 则去查步骤，返回逻辑上一步
            // - 有参，则直接跳转以参数为name的路由，不带query
            // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
            // - 默认行为 返回上一历史记录
            const app = __this.app
            const { meta, query, planType } = app.$route
            if (meta && (typeof meta.prevent === 'function') && meta.prevent()) return
            if (/\|query/.test(pathName)) {
                app.$router.push({ name: pathName.split('|')[0], query: query })
            } else if (pathName) {
                app.$router.push({ name: pathName })
            } else if (planType) {
                app.$router.go(-1)
            } else {
                app.$router.go(-1)
            }
        }
        // 如果有hook 则先执行hock
        if (typeof window['__gobackbtn__hook'] === 'function') {
            window['__gobackbtn__hook']().then(res => {
                __gobackbtn(pathName)
            })
        } else {
            __gobackbtn(pathName)
        }
    }

    private api: any

    private app: any
    
    private clearTimer(): void {
        if (__tid) {
            window.clearInterval(__tid)
            __tid = null
        }
    }
    
    private getFile(): HTMLInputElement {
        let fileObj = null
        let fileInput = document.createElement('input')
        fileInput.setAttribute('type', 'file')
        fileInput.setAttribute('accept', 'image/*')
        var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window })
        fileInput.dispatchEvent(evt)
        return fileInput
    }
    
    private getFileToBase64(fileObj: any, fn: (FileToBase64Result) => void): void {
        zip.run(fileObj).then(success => {
            fn({
                full: success.base64,
                split: success.base64.split('base64,')[1]
            })
        })
    }
}