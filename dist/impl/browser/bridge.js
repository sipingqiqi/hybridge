import { app } from '../../data/app';
import { api } from '../../data/api';
const zip = {
    run(obj) {
        return new Promise((resolve, reject) => {
            resolve({
                base64: ''
            });
        });
    }
};
let __tid = 0;
export default class BrowserBridge {
    clearTimer() {
        if (__tid) {
            window.clearInterval(__tid);
            __tid = null;
        }
    }
    getFile() {
        let fileObj = null;
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
        fileInput.dispatchEvent(evt);
        return fileInput;
    }
    getFileToBase64(fileObj, fn) {
        zip.run(fileObj).then(success => {
            fn({
                full: success.base64,
                split: success.base64.split('base64,')[1]
            });
        });
    }
    openSearch(type, hint, message) {
        return {
            status: true,
            value: '',
            callback: function () { }
        };
    }
    toggleSearch(isHide) { }
    SetH5Header(n) {
        const u = navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
        if (isAndroid) {
            document.title = n;
        }
        else {
            var $body = document.body;
            document.title = n;
            /**
             * 设置一个空的占位iframe，每次调用时增加去除 可以强制刷新;
             */
            var $iframe = document.createElement('iframe');
            $body.appendChild($iframe);
            setTimeout(_ => {
                $body.removeChild($iframe);
            });
        }
    }
    leftMenu(n) { }
    toggleMenu(n, show) { }
    rightMenu(n) { }
    articleDetail(url, title, btnTxt) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    viewPdf(url, title, btnTxt) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    startAudioRec(isShow) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    callCamera() {
        return new Promise((res, rej) => {
            let fileObj = null;
            let fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/*');
            var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
            fileInput.dispatchEvent(evt);
            fileInput.onchange = function (e) {
                if (fileInput.files.length > 0) {
                    fileObj = fileInput.files[0];
                    zip.run(fileObj).then(success => {
                        let base64 = success.base64.split('base64,')[1];
                        res(base64);
                        fileInput.remove();
                    });
                }
            };
        });
    }
    tailorCamera(bool, width, height) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    callAddress() {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    idCardScan() {
        let __this = this;
        function getIdCard() {
            return new Promise((res, rej) => {
                this.callCamera().then(base64 => {
                    res(app.vue.axios.post(api['IDCARD'], { base64 }));
                });
            });
        }
        return getIdCard();
    }
    saveImage(base64String) { }
    getBank() {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    caSign(name, type, keyWord) {
        let __this = this;
        __this.clearTimer();
        app.vue.$router.push('/h5SignIn');
        function sign() {
            return new Promise((resolve, reject) => {
                __tid = window.setInterval(success => {
                    if (app.vue.$store.state.jsBridge.caSign.includes('base64')) {
                        __this.clearTimer();
                        resolve(app.vue.$store.state.jsBridge.caSign);
                        app.vue.$store.commit('clearCaSign');
                    }
                    else {
                        // reject('fail')
                    }
                }, 30);
            });
        }
        return sign();
    }
    getJob() {
        this.clearTimer();
        app.vue.$router.push('/jobList');
        let getJob = function () {
            return new Promise((res, rej) => {
                __tid = window.setInterval(_ => {
                    if (app.vue.$store.state.jsBridge.item) {
                        this.clearTimer();
                        res(app.vue.$store.state.jsBridge.item);
                        app.vue.$store.commit('clearItem');
                    }
                    else {
                    }
                }, 30);
            });
        };
        return getJob();
    }
    // return new Promise<string>((resolve, reject) => {
    //     resolve('success')
    //     app.vue.$router.push('/jobList')
    // })
    // }
    getCustomer() {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    closeWebview(n) { }
    takeUserImageMultiple(count) {
        this.clearTimer();
        let __this = this;
        let imgs = [];
        function getImg() {
            return new Promise((res, rej) => {
                const fileInput = __this.getFile();
                fileInput.onchange = function () {
                    if (fileInput.files.length > 0) {
                        __this.getFileToBase64(fileInput.files[0], obj => {
                            imgs.push(obj);
                            res(obj);
                        });
                    }
                    fileInput.remove();
                };
            });
        }
        let countArr = [];
        for (let i = 0; i < count; i++) {
            countArr.push(getImg());
        }
        let imgArr = Promise.all(countArr);
        imgArr.then(res => {
            console.log(res);
        });
        return new Promise((res, rej) => {
            this.clearTimer();
            __tid = setInterval(_ => {
                console.log(imgs);
                if (imgs.length == count) {
                    this.clearTimer();
                    res(JSON.stringify(imgs));
                }
            }, 30);
        });
    }
    callCameraMultiple(count) {
        return this.takeUserImageMultiple(count);
    }
    showShare(type, url, imageUrl, title, desc, callback) {
        return new Promise((resolve, reject) => {
            resolve('success');
        });
    }
    wechatShare(webPageUrl, path, imageUrl, title, desc, callback) { }
    showShareBtn(type, url, imageUrl, title, desc, callback) { }
    showShareArr(javascript, url, imageUrl, title, desc) { }
    showRiskArr(baseImg, fun1, baseImg2, fun2) { }
    nativeAjax(url, data, method) { }
    showPosterDetail(param, index) { }
    sendSms(telNum, content) { }
    shareShareEntry(type, url, title, desc, callback) { }
    goBack(pathName) {
        const __this = this;
        const __gobackbtn = function (pathName) {
            //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
            // params 参数说明：
            // - 为空： 则去查步骤，返回逻辑上一步
            // - 有参，则直接跳转以参数为name的路由，不带query
            // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
            // - 默认行为 返回上一历史记录
            const { meta, query, planType } = app.vue.$route;
            if (meta && (typeof meta.prevent === 'function') && meta.prevent())
                return;
            if (/\|query/.test(pathName)) {
                app.vue.$router.push({ name: pathName.split('|')[0], query: query });
            }
            else if (pathName) {
                app.vue.$router.push({ name: pathName });
            }
            else if (planType) {
                app.vue.$router.go(-1);
            }
            else {
                app.vue.$router.go(-1);
            }
        };
        // 如果有hook 则先执行hock
        if (typeof window['__gobackbtn__hook'] === 'function') {
            window['__gobackbtn__hook']().then(res => {
                __gobackbtn(pathName);
            });
        }
        else {
            __gobackbtn(pathName);
        }
    }
    onReady() { }
    onDataResult(type, data) { }
    notifyCommandFromNative() { }
}
