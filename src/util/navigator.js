/**
 * @description 左上角返回按钮  仅native端实现
 * @param {string} pathName 想要返回的路由
 * @augments pathName 不为空 && query有值  跳转到目标路由, 把当前页面query带入
 */
function goBack(pathName) {
    const __gobackbtn = function (pathName) {
        //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
        // params 参数说明：
        // - 为空： 则去查步骤，返回逻辑上一步
        // - 有参，则直接跳转以参数为name的路由，不带query
        // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
        // - 默认行为 返回上一历史记录
        const app = window.app
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
    if (typeof window.__gobackbtn__hook === 'function') {
        window.__gobackbtn__hook().then(res => {
            __gobackbtn(pathName)
        })
    } else {
        __gobackbtn(pathName)
    }
}

module.exports = { goBack }