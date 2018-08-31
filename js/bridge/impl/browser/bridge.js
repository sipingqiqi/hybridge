'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
exports.saveImage = saveImage;
exports.getBank = getBank;
exports.caSign = caSign;
exports.getJob = getJob;
exports.getCustomer = getCustomer;
exports.closeWebview = closeWebview;
exports.takeUserImageMultiple = takeUserImageMultiple;
exports.callCameraMultiple = callCameraMultiple;
exports.shareShare = shareShare;
exports.wechatShare = wechatShare;
exports.showShareBtn = showShareBtn;
exports.showShareArr = showShareArr;
exports.showRiskArr = showRiskArr;
exports.nativeAjax = nativeAjax;
exports.showPosterDetail = showPosterDetail;
exports.sendSms = sendSms;
exports.shareShareEntry = shareShareEntry;
exports.goBack = goBack;

var _app = require('../../../data/app');

var _api = require('../../../data/api');

// import Zip from '../../../util/zip'
// const zip = new Zip()
var zip = {
    run: function run(obj) {
        return new Promise(function (resolve, reject) {
            resolve({
                base64: ''
            });
        });
    }
};
var __tid = 0;
function openSearch(type, hint, message) {
    return {
        status: true,
        value: '',
        callback: function callback() {}
    };
}
function toggleSearch(isHide) {}
function SetH5Header(n) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    if (isAndroid) {
        document.title = n;
    } else {
        var $body = document.body;
        document.title = n;
        /**
         * 设置一个空的占位iframe，每次调用时增加去除 可以强制刷新;
         */
        var $iframe = document.createElement('iframe');
        $body.appendChild($iframe);
        setTimeout(function (_) {
            $body.removeChild($iframe);
        });
    }
}
function leftMenu(n) {}
function toggleMenu(n, show) {}
function rightMenu(n) {}
function articleDetail(url, title, btnTxt) {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function viewPdf(url, title, btnTxt) {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function startAudioRec(isShow) {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function callCamera() {
    return new Promise(function (res, rej) {
        var fileObj = null;
        var fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
        fileInput.dispatchEvent(evt);
        fileInput.onchange = function (e) {
            if (fileInput.files.length > 0) {
                fileObj = fileInput.files[0];
                zip.run(fileObj).then(function (success) {
                    var base64 = success.base64.split('base64,')[1];
                    res(base64);
                    fileInput.remove();
                });
            }
        };
    });
}
function tailorCamera(n, bool, width, height) {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function callAddress() {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function idCardScan() {
    var __this = this;
    function getIdCard() {
        var _this = this;

        return new Promise(function (res, rej) {
            _this.callCamera().then(function (base64) {
                res(_app.app.vue.axios.post(_api.api['IDCARD'], { base64: base64 }));
            });
        });
    }
    return getIdCard();
}
function saveImage(base64String) {}
function getBank() {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function caSign(name, type, keyWord) {
    var __this = this;
    __this.clearTimer();
    _app.app.vue.$router.push('/h5SignIn');
    function sign() {
        return new Promise(function (resolve, reject) {
            __tid = window.setInterval(function (success) {
                if (_app.app.vue.$store.state.jsBridge.caSign.includes('base64')) {
                    __this.clearTimer();
                    resolve(_app.app.vue.$store.state.jsBridge.caSign);
                    _app.app.vue.$store.commit('clearCaSign');
                } else {
                    // reject('fail')
                }
            }, 30);
        });
    }
    return sign();
}
function getJob() {
    clearTimer();
    _app.app.vue.$router.push('/jobList');
    var getJob = function getJob() {
        return new Promise(function (res, rej) {
            __tid = window.setInterval(function (_) {
                if (_app.app.vue.$store.state.jsBridge.item) {
                    clearTimer();
                    res(_app.app.vue.$store.state.jsBridge.item);
                    _app.app.vue.$store.commit('clearItem');
                } else {}
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
function getCustomer() {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function closeWebview(n) {}
function takeUserImageMultiple(count) {
    var _this2 = this;

    this.clearTimer();
    var __this = this;
    var imgs = [];
    function getImg() {
        return new Promise(function (res, rej) {
            var fileInput = __this.getFile();
            fileInput.onchange = function () {
                if (fileInput.files.length > 0) {
                    __this.getFileToBase64(fileInput.files[0], function (obj) {
                        imgs.push(obj);
                        res(obj);
                    });
                }
                fileInput.remove();
            };
        });
    }
    var countArr = [];
    for (var i = 0; i < count; i++) {
        countArr.push(getImg());
    }
    var imgArr = Promise.all(countArr);
    imgArr.then(function (res) {
        console.log(res);
    });
    return new Promise(function (res, rej) {
        _this2.clearTimer();
        __tid = setInterval(function (_) {
            console.log(imgs);
            if (imgs.length == count) {
                _this2.clearTimer();
                res(imgs);
            }
        }, 30);
    });
}
function callCameraMultiple(count) {
    return this.takeUserImageMultiple(count);
}
function shareShare(type, url, imageUrl, title, desc, callback) {
    return new Promise(function (resolve, reject) {
        resolve('success');
    });
}
function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) {}
function showShareBtn(type, url, imageUrl, title, desc, callback) {}
function showShareArr(javascript, url, imageUrl, title, desc) {}
function showRiskArr(baseImg, fun1, baseImg2, fun2) {}
function nativeAjax(url, data, method) {}
function showPosterDetail(param, index) {}
function sendSms(telNum, content) {}
function shareShareEntry(type, url, title, desc, callback) {}
function goBack(pathName) {
    var __this = this;
    var __gobackbtn = function __gobackbtn(pathName) {
        //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
        // params 参数说明：
        // - 为空： 则去查步骤，返回逻辑上一步
        // - 有参，则直接跳转以参数为name的路由，不带query
        // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
        // - 默认行为 返回上一历史记录
        var _app$vue$$route = _app.app.vue.$route,
            meta = _app$vue$$route.meta,
            query = _app$vue$$route.query,
            planType = _app$vue$$route.planType;

        if (meta && typeof meta.prevent === 'function' && meta.prevent()) return;
        if (/\|query/.test(pathName)) {
            _app.app.vue.$router.push({ name: pathName.split('|')[0], query: query });
        } else if (pathName) {
            _app.app.vue.$router.push({ name: pathName });
        } else if (planType) {
            _app.app.vue.$router.go(-1);
        } else {
            _app.app.vue.$router.go(-1);
        }
    };
    // 如果有hook 则先执行hock
    if (typeof window['__gobackbtn__hook'] === 'function') {
        window['__gobackbtn__hook']().then(function (res) {
            __gobackbtn(pathName);
        });
    } else {
        __gobackbtn(pathName);
    }
}
function clearTimer() {
    if (__tid) {
        window.clearInterval(__tid);
        __tid = null;
    }
}
function getFile() {
    var fileObj = null;
    var fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', 'image/*');
    var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
    fileInput.dispatchEvent(evt);
    return fileInput;
}
function getFileToBase64(fileObj, fn) {
    zip.run(fileObj).then(function (success) {
        fn({
            full: success.base64,
            split: success.base64.split('base64,')[1]
        });
    });
}