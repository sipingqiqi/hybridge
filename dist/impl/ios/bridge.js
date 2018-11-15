'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _bridge = require('../../interface/bridge');

var _data = require('../../data/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
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
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var tid;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        console.log('HyBridge Ready: Checking bridge if it\'s ready ...');
                        tid = 0;
                        return _context.abrupt('return', new _promise2.default(function (resolve) {
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
    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        console.log('HyBridge Execute: ' + method + ', ' + params);
                        noReturned ? console.log('Hybridge Callback: ' + name) : console.log('Hybridge Callback: none');
                        return _context2.abrupt('return', new _promise2.default(function (resolve) {
                            if (noReturned) {
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

                    case 3:
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

    return __awaiter(this, void 0, void 0, /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return ready();

                    case 2:
                        _context3.next = 4;
                        return execute(method, params, name, noReturned);

                    case 4:
                        return _context3.abrupt('return', _context3.sent);

                    case 5:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, this);
    }));
}

var IOSBridge = function () {
    function IOSBridge() {
        (0, _classCallCheck3.default)(this, IOSBridge);
    }

    (0, _createClass3.default)(IOSBridge, [{
        key: 'openSearch',
        value: function openSearch(type, hint, message) {
            call('openSearch', (0, _stringify2.default)({ type: type, hint: hint, message: message }));
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
            call('onJSInvokeResult', (0, _stringify2.default)({ type: '1', title: title }));
        }
    }, {
        key: 'leftMenu',
        value: function leftMenu(option) {
            call('setActionBarBackItem', (0, _stringify2.default)(option));
        }
    }, {
        key: 'toggleMenu',
        value: function toggleMenu(position, show) {
            call('showActionBarPanel', (0, _stringify2.default)({ type: position.toString(), show: show }));
        }
    }, {
        key: 'rightMenu',
        value: function rightMenu(option) {
            if ((0, _typeof3.default)(option.params) === 'object') {
                option.params = (0, _stringify2.default)(option.params);
            }
            call('setWebViewMenu', (0, _stringify2.default)(option));
        }
    }, {
        key: 'articleDetail',
        value: function articleDetail(url) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var buttonTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            call('studyArticleDetail', (0, _stringify2.default)({ url: url, title: title, buttonTitle: buttonTitle }));
        }
    }, {
        key: 'viewPdf',
        value: function viewPdf(url) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
            var buttonTitle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

            return call('studyArticleDetail', (0, _stringify2.default)({ url: url, title: title, buttonTitle: buttonTitle }), 'viewPdf', false);
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
        value: function idCardScan(option) {
            var obj = (0, _assign2.default)({ isOCR: false, isHideMessage: false }, option);
            return call('requestScanCertificateCard', (0, _stringify2.default)({
                isOCR: obj.isOCR,
                hiddenMessage: obj.isHideMessage
            }), 'idCard', false);
        }
    }, {
        key: 'getBank',
        value: function getBank() {
            return call('requestScanBankCard', '', 'bank', false);
        }
    }, {
        key: 'caSign',
        value: function caSign(name, type, serialized) {
            var obj = {
                name: name, type: type.toString(), params: serialized
            };
            return call('requestCAGestureSignData', (0, _stringify2.default)(obj), 'sign', false);
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
        value: function closeWebview() {
            var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _bridge.CloseType.CLOSE;

            call('closeWebview', n.toString());
        }
    }, {
        key: 'goNativeHome',
        value: function goNativeHome() {
            this.closeWebview(_bridge.CloseType.CLOSE_AND_HOME);
        }
    }, {
        key: 'showShare',
        value: function showShare(type, url, imageUrl, title) {
            var desc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
            var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

            return call('appLocalShare', (0, _stringify2.default)({ type: type, url: url, imageUrl: imageUrl, title: title, desc: desc, callback: callback }), 'shareInvoke', false);
        }
    }, {
        key: 'wechatShare',
        value: function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) {
            call('setAppMinProgramShareData', (0, _stringify2.default)({
                webPageUrl: webPageUrl, path: path, imageUrl: imageUrl, title: title, desc: desc, callback: callback
            }));
        }
    }, {
        key: 'showShareBtn',
        value: function showShareBtn(type, url, imageUrl, title) {
            var desc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '';
            var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : '';

            call('setAppLocalShareData', (0, _stringify2.default)({ type: type.toString(), url: url, imageUrl: imageUrl, title: title, desc: desc, callback: callback }));
        }
    }, {
        key: 'showShareArr',
        value: function showShareArr() {
            var javascript = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
            var url = arguments[1];
            var imageUrl = arguments[2];
            var title = arguments[3];
            var desc = arguments[4];

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
            call('setWebViewMenus', (0, _stringify2.default)(obj));
        }
    }, {
        key: 'showRiskArr',
        value: function showRiskArr(icon1, callback1, icon2, callback2) {
            var icons = [{
                type: 'image', title: icon1, javascript: callback1
            }, {
                type: 'image', title: icon2, javascript: callback2
            }];
            call('setWebViewMenus', (0, _stringify2.default)(icons));
        }
    }, {
        key: 'clearRiskArr',
        value: function clearRiskArr() {
            call('setWebViewMenus', (0, _stringify2.default)([]));
        }
    }, {
        key: 'callCamera',
        value: function callCamera() {
            return call('takeUserImage', (0, _stringify2.default)({ isCut: false }), 'camera', false);
        }
    }, {
        key: 'tailorCamera',
        value: function tailorCamera(isCut, width, height) {
            return call('takeUserImage', (0, _stringify2.default)({ isCut: isCut, width: width, height: height }), 'camera', false);
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
        key: 'showPosterDetail',
        value: function showPosterDetail(param, index) {
            call('showPosterDetail', (0, _stringify2.default)({ posterListStr: param, position: index }));
        }
    }, {
        key: 'sendSms',
        value: function sendSms(telephones, content) {
            call('sendSms', (0, _stringify2.default)({ mobiles: telephones, message: content }));
        }
    }, {
        key: 'findDictTable',
        value: function findDictTable(type) {
            return new _promise2.default(function (resolve) {
                resolve('{}');
            });
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