"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._findDictionary = exports.findDictionary = exports.getDictionary = exports.setAllDictionary = exports.setDictionary = exports.KVtoNV = exports.dictionary = undefined;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dictionary = {};
function KVtoNV(item) {
    var _this = this;

    if (Array.isArray(item)) {
        return item.map(function (node) {
            return _this.KVtoNV(node);
        });
    } else {
        return (0, _assign2.default)({}, item, { value: item.key, name: item.value });
    }
}
function setDictionary(type) {
    return new _promise2.default(function (resolve, reject) {
        if (window.findDictTable) {
            window.findDictTable(type).then(function (json) {
                var dict = JSON.parse(json);
                dictionary[dict.name] = KVtoNV(dict.item);
                resolve(dict);
            });
        } else {
            reject('Cannot find function: window.findDictTable()');
        }
    });
}
function setAllDictionary() {
    var types = [
    // "occupation",        // 职业列表
    // "area",              // 全国地址字典数据类型
    "post_type", "preserve", "sales_channel", "relation", "bankcode", "benefit_type", "card_type", "citizenship", "cover", "degree", "coverage_state", "gender", "insure_state", "marriage", "nation", "payment", "policy_channel", "occupation_level" // 职业等级列表
    ];
    if (window.findDictTable) {
        types.map(function (type) {
            window.findDictTable(type).then(function (json) {
                var dict = JSON.parse(json);
                dictionary[dict.name] = KVtoNV(dict.item);
            });
        });
    }
}
function getDictionary(type) {
    return new _promise2.default(function (resolve, reject) {
        setDictionary(type).then(function (obj) {
            if (obj) {
                resolve(obj);
            } else {
                reject("Cannot get dictionary: " + type);
            }
        });
    });
}
function findDictionary(target, query) {
    function find(target, key, value) {
        if ((typeof target === "undefined" ? "undefined" : (0, _typeof3.default)(target)) !== 'object') {
            return null;
        }
        if (Array.isArray(target)) {
            var ret = null;
            target.forEach(function (v) {
                ret = ret === null ? find(v, key, value) : ret;
            });
            return ret;
        } else {
            return target[key] === value ? target : null;
        }
    }
    var keys = (0, _keys2.default)(query);
    return keys.length > 0 ? find(target, keys[0], query[keys[0]]) : null;
}
function _findDictionary(target, query) {
    function find(target, key, value) {
        if ((typeof target === "undefined" ? "undefined" : (0, _typeof3.default)(target)) !== 'object') {
            return null;
        }
        if (Array.isArray(target)) {
            var ret = null;
            target.forEach(function (v) {
                ret = ret === null ? find(v, key, value) : ret;
            });
            return ret;
        } else {
            return target[key].indexOf(value) ? target : null;
        }
    }
    var keys = (0, _keys2.default)(query);
    return keys.length > 0 ? find(target, keys[0], query[keys[0]]) : null;
}
// function find(list: Array<any> | any, invoke: (item, key, list) => boolean): any {
//   return Array.isArray(list) ? list.find(invoke) : Object.keys(list).find(key => invoke(list[key], key, list));
// }
// function findDict(list: Array<any> | any, by: any): any {
//   return find(list, item => Object.keys(by).every(key => item[key] === by[key]));
// }
exports.dictionary = dictionary;
exports.KVtoNV = KVtoNV;
exports.setDictionary = setDictionary;
exports.setAllDictionary = setAllDictionary;
exports.getDictionary = getDictionary;
exports.findDictionary = findDictionary;
exports._findDictionary = _findDictionary;