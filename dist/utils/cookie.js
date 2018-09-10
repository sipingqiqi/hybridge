"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCookie = setCookie;
exports.getCookie = getCookie;
exports.deleteCookie = deleteCookie;
exports.ostype = ostype;
exports.token = token;
exports.gobackbtn = gobackbtn;
exports.nativeAjax = nativeAjax;
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString();
}
function getCookie(name) {
    var arrStr = document.cookie.split("; ");
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=");
        if (temp[0] === name) {
            return unescape(temp[1]);
        }
    }
    return null;
}
function deleteCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
    }
}
function ostype() {
    return getCookie('hq_http_ostype');
}
function token() {
    return getCookie('hq_http_usertoken');
}
function gobackbtn(pathName) {
    var __gobackbtn = function __gobackbtn(pathName) {
        //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
        // params 参数说明：
        // - 为空： 则去查步骤，返回逻辑上一步
        // - 有参，则直接跳转以参数为name的路由，不带query
        // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
        // - 默认行为 返回上一历史记录
        var app = window.app;
        var _app$$route = app.$route,
            meta = _app$$route.meta,
            query = _app$$route.query,
            planType = _app$$route.planType;

        if (meta && typeof meta.prevent === 'function' && meta.prevent()) return;
        if (/\|query/.test(pathName)) {
            app.$router.push({ name: pathName.split('|')[0], query: query });
        } else if (pathName) {
            app.$router.push({ name: pathName });
        } else if (planType) {
            app.$router.go(-1);
        } else {
            app.$router.go(-1);
        }
    };
    // 如果有hook 则先执行hock
    if (typeof window.__gobackbtn__hook === 'function') {
        window.__gobackbtn__hook().then(function (res) {
            __gobackbtn(pathName);
        });
    } else {
        __gobackbtn(pathName);
    }
}
function nativeAjax(url, data, method) {
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