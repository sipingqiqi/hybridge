'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _data = require('../../data/data');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var sleep = 100;
var events = {
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
    'takeUserImageMultiple': 'images'
};
function ready() {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var tid;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('HyBridge Ready: Checking bridge if it\'s ready ...');
                        tid = 0;
                        return _context.abrupt('return', new Promise(function (resolve) {
                            if (_data.data.status.loadstatus) {
                                setTimeout(function () {
                                    console.log('HyBridge Ready: Checked.');
                                    resolve('success');
                                }, 0);
                            } else {
                                tid = setInterval(function () {
                                    if (_data.data.status.loadstatus) {
                                        clearInterval(tid);
                                        console.log('HyBridge Ready: Checked.');
                                        resolve('success');
                                    }
                                }, sleep);
                            }
                        }));

                    case 3:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
function execute(method, params, name, noReturned) {
    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('HyBridge Execute: ' + method + ', ' + params + ', ' + name + ', ' + noReturned);
                        return _context2.abrupt('return', new Promise(function (resolve) {
                            if (noReturned) {
                                //window.HQAppJSInterface[method](...params);
                                if (window.webkit && window.webkit.messageHandlers) {
                                    var handler = window.webkit.messageHandlers[method];
                                    handler && handler.postMessage && handler.postMessage(params);
                                }
                                resolve(null);
                                return;
                            }
                            var tid = 0;
                            var d = _data.data.status[name];
                            d.value = '';
                            d.status = false;
                            //window.HQAppJSInterface[method](...params);
                            if (window.webkit && window.webkit.messageHandlers) {
                                var _handler = window.webkit.messageHandlers[method];
                                _handler && _handler.postMessage && _handler.postMessage(params);
                            }
                            tid = setInterval(function () {
                                if (d.status) {
                                    clearInterval(tid);
                                    resolve(d.value);
                                }
                            }, sleep);
                        }));

                    case 2:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this);
    }));
}
function call(method, params) {
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var noReturned = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    return __awaiter(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        console.log('HyBridge Call: ' + method + ', ' + params + ', ' + name + ', ' + noReturned);
                        _context3.next = 3;
                        return ready();

                    case 3:
                        _context3.next = 5;
                        return execute(method, params, name, noReturned);

                    case 5:
                        return _context3.abrupt('return', _context3.sent);

                    case 6:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
}

var IOSBridge = function () {
    function IOSBridge() {
        _classCallCheck(this, IOSBridge);
    }

    _createClass(IOSBridge, [{
        key: 'openSearch',
        value: function openSearch(type, hint, message) {
            call('openSearch', JSON.stringify({ type: type, hint: hint, message: message }));
            return _data.data.status.search;
        }
    }, {
        key: 'toggleSearch',
        value: function toggleSearch(isHide) {
            call('hideSearchBox', isHide);
        }
    }, {
        key: 'SetH5Header',
        value: function SetH5Header(title) {
            call('onJSInvokeResult', JSON.stringify({ type: '1', title: title }));
        }
    }, {
        key: 'leftMenu',
        value: function leftMenu(option) {
            call('setActionBarBackItem', JSON.stringify(option));
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(position, show) {
            call('showActionBarPanel', JSON.stringify({ type: position.toString(), show: show }));
        }
    }, {
        key: 'rightMenu',
        value: function rightMenu(option) {
            if (_typeof(option.params) === 'object') {
                option.params = JSON.stringify(option.params);
            }
            call('setWebViewMenu', JSON.stringify(option));
        }
    }, {
        key: 'articleDetail',
        value: function articleDetail(url) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var buttonTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            call('studyArticleDetail', JSON.stringify({ url: url, title: title, buttonTitle: buttonTitle }));
        }
    }, {
        key: 'viewPdf',
        value: function viewPdf(url) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var buttonTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            return call('studyArticleDetail', JSON.stringify({ url: url, title: title, buttonTitle: buttonTitle }), 'viewPdf', false);
        }
    }, {
        key: 'startAudioRec',
        value: function startAudioRec(show) {
            return call('requestAudioRecording', show, 'audio', false);
        }
    }, {
        key: 'callAddress',
        value: function callAddress() {
            return call('popUpAddressChooseView', '', 'address', false);
        }
    }, {
        key: 'idCardScan',
        value: function idCardScan() {
            return call('requestScanCertificateCard', '', 'idCard', false);
        }
    }, {
        key: 'getBank',
        value: function getBank() {
            return call('requestScanBankCard', '', 'bank', false);
        }
    }, {
        key: 'caSign',
        value: function caSign(name, type, keyword) {
            var obj = {
                name: name, type: type, params: { keyword: keyword }
            };
            return call('requestCAGestureSignData', JSON.stringify(obj), 'sign', false);
        }
    }, {
        key: 'getJob',
        value: function getJob() {
            return call('requestOccupationDicItem', '', 'job', false);
        }
    }, {
        key: 'getCustomer',
        value: function getCustomer() {
            return call('requestImportCustomerItem', '', 'customer', false);
        }
    }, {
        key: 'closeWebview',
        value: function closeWebview(n) {
            call('closeWebview', n);
        }
    }, {
        key: 'showShare',
        value: function showShare(type, url, imageUrl, title, desc, callback) {
            return call('appLocalShare', JSON.stringify({ type: type, url: url, imageUrl: imageUrl, title: title, desc: desc, callback: callback }), 'shareInvoke', false);
        }
        // wechatShare(webPageUrl: string, path: string, imageUrl: string, title: string, desc: string, callback: string): void {
        //   return instance.wechatShare(webPageUrl, path, imageUrl, title, desc, callback);
        // }

    }, {
        key: 'showShareBtn',
        value: function showShareBtn(type, url, imageUrl, title, desc, callback) {
            call('setAppLocalShareData', JSON.stringify({ type: type, url: url, imageUrl: imageUrl, title: title, desc: desc, callback: callback }));
        }
    }, {
        key: 'showShareArr',
        value: function showShareArr(javascript, url, imageUrl, title, desc) {
            var obj = [{
                title: '搜索',
                javascript: javascript
            }, {
                title: '分享',
                attachData: {
                    typeSet: ['1'],
                    url: url,
                    imageUrl: imageUrl,
                    title: title,
                    desc: desc,
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

    }, {
        key: 'callCamera',
        value: function callCamera() {
            return call('takeUserImage', JSON.stringify({ isCut: false }), 'camera', false);
        }
    }, {
        key: 'tailorCamera',
        value: function tailorCamera(isCut, width, height) {
            return call('takeUserImage', JSON.stringify({ isCut: isCut, width: width, height: height }), 'camera', false);
        }
    }, {
        key: 'takeUserImageMultiple',
        value: function takeUserImageMultiple() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return call('takeUserImageMultiple', count, 'images', false);
        }
    }, {
        key: 'callCameraMultiple',
        value: function callCameraMultiple() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

            return call('takeUserImageMultiple', count, 'images', false);
        }
    }, {
        key: 'nativeAjax',
        value: function nativeAjax(url, data, method) {
            // 异步对象
            var ajax = new XMLHttpRequest();
            // get 跟post  需要分别写不同的代码
            if (method == 'get') {
                // get请求
                if (data) {
                    // 如果有值
                    url += '?';
                    url += data;
                } else {}
                // 设置 方法 以及 url
                ajax.open(method, url);
                // send即可
                ajax.send();
            } else {
                // post请求
                // post请求 url 是不需要改变
                ajax.open(method, url);
                // 需要设置请求报文
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                // 判断data send发送数据
                if (data) {
                    // 如果有值 从send发送
                    ajax.send(data);
                } else {
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
    }, {
        key: 'showPosterDetail',
        value: function showPosterDetail(param, index) {
            call('showPosterDetail', JSON.stringify({ posterListStr: param, position: index }));
        }
    }, {
        key: 'sendSms',
        value: function sendSms(telephones, content) {
            call('sendSms', JSON.stringify({ mobiles: telephones, message: content }));
        }
    }, {
        key: 'shareShareEntry',
        value: function shareShareEntry(type, url, title, desc, callback) {
            call('setAppLocalShareData', JSON.stringify({ type: type, url: url, title: title, desc: desc, callback: callback }));
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            _data.data.status.loadstatus = true;
        }
    }, {
        key: 'onDataResult',
        value: function onDataResult(eventType, eventData) {
            console.log('@method window.app2js_onDataResult:', eventType, eventData);
            if (eventType === 'search') {
                var item = _data.data.status['search'];
                item.status = true;
                item.value = eventData;
                item.callback(JSON.parse(eventData));
                return;
            }
            var name = events[eventType];
            if (name) {
                var _item = _data.data.status[name];
                if (_item) {
                    _item.status = true;
                    _item.value = eventData;
                }
            }
        }
    }, {
        key: 'notifyCommandFromNative',
        value: function notifyCommandFromNative() {}
    }]);

    return IOSBridge;
}();

exports.default = IOSBridge;