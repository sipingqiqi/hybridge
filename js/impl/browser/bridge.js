'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = require('../../data/app');

var _api = require('../../data/api');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

var BrowserBridge = function () {
    function BrowserBridge() {
        _classCallCheck(this, BrowserBridge);
    }

    _createClass(BrowserBridge, [{
        key: 'clearTimer',
        value: function clearTimer() {
            if (__tid) {
                window.clearInterval(__tid);
                __tid = null;
            }
        }
    }, {
        key: 'getFile',
        value: function getFile() {
            var fileObj = null;
            var fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/*');
            var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
            fileInput.dispatchEvent(evt);
            return fileInput;
        }
    }, {
        key: 'getFileToBase64',
        value: function getFileToBase64(fileObj, fn) {
            zip.run(fileObj).then(function (success) {
                fn({
                    full: success.base64,
                    split: success.base64.split('base64,')[1]
                });
            });
        }
    }, {
        key: 'openSearch',
        value: function openSearch(type, hint, message) {
            return new Promise(function (resolve) {
                resolve({
                    status: true,
                    value: '',
                    callback: function callback() {}
                });
            });
        }
    }, {
        key: 'toggleSearch',
        value: function toggleSearch(isHide) {}
    }, {
        key: 'SetH5Header',
        value: function SetH5Header(n) {
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
    }, {
        key: 'leftMenu',
        value: function leftMenu(n) {}
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(n, show) {}
    }, {
        key: 'rightMenu',
        value: function rightMenu(n) {}
    }, {
        key: 'articleDetail',
        value: function articleDetail(url, title, btnTxt) {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'viewPdf',
        value: function viewPdf(url, title, btnTxt) {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'startAudioRec',
        value: function startAudioRec(isShow) {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'callCamera',
        value: function callCamera() {
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
    }, {
        key: 'tailorCamera',
        value: function tailorCamera(bool, width, height) {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'callAddress',
        value: function callAddress() {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'idCardScan',
        value: function idCardScan() {
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
    }, {
        key: 'saveImage',
        value: function saveImage(base64String) {}
    }, {
        key: 'getBank',
        value: function getBank() {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'caSign',
        value: function caSign(name, type, keyWord) {
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
    }, {
        key: 'getJob',
        value: function getJob() {
            this.clearTimer();
            _app.app.vue.$router.push('/jobList');
            var getJob = function getJob() {
                var _this2 = this;

                return new Promise(function (res, rej) {
                    __tid = window.setInterval(function (_) {
                        if (_app.app.vue.$store.state.jsBridge.item) {
                            _this2.clearTimer();
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

    }, {
        key: 'getCustomer',
        value: function getCustomer() {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'closeWebview',
        value: function closeWebview(n) {}
    }, {
        key: 'takeUserImageMultiple',
        value: function takeUserImageMultiple(count) {
            var _this3 = this;

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
                _this3.clearTimer();
                __tid = setInterval(function (_) {
                    console.log(imgs);
                    if (imgs.length == count) {
                        _this3.clearTimer();
                        res(imgs);
                    }
                }, 30);
            });
        }
    }, {
        key: 'callCameraMultiple',
        value: function callCameraMultiple(count) {
            return this.takeUserImageMultiple(count);
        }
    }, {
        key: 'showShare',
        value: function showShare(type, url, imageUrl, title, desc, callback) {
            return new Promise(function (resolve, reject) {
                resolve('success');
            });
        }
    }, {
        key: 'wechatShare',
        value: function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) {}
    }, {
        key: 'showShareBtn',
        value: function showShareBtn(type, url, imageUrl, title, desc, callback) {}
    }, {
        key: 'showShareArr',
        value: function showShareArr(javascript, url, imageUrl, title, desc) {}
    }, {
        key: 'showRiskArr',
        value: function showRiskArr(baseImg, fun1, baseImg2, fun2) {}
    }, {
        key: 'nativeAjax',
        value: function nativeAjax(url, data, method) {}
    }, {
        key: 'showPosterDetail',
        value: function showPosterDetail(param, index) {}
    }, {
        key: 'sendSms',
        value: function sendSms(telNum, content) {}
    }, {
        key: 'shareShareEntry',
        value: function shareShareEntry(type, url, title, desc, callback) {}
    }, {
        key: 'goBack',
        value: function goBack(pathName) {
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
    }, {
        key: 'onReady',
        value: function onReady() {}
    }, {
        key: 'onDataResult',
        value: function onDataResult(type, data) {}
    }, {
        key: 'notifyCommandFromNative',
        value: function notifyCommandFromNative() {}
    }]);

    return BrowserBridge;
}();

exports.default = BrowserBridge;