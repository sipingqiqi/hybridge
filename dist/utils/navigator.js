'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gobackbtn = gobackbtn;
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