export function setCookie(name: string, value: string): void {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toUTCString()
}

export function getCookie(name: string): string {
    var arrStr = document.cookie.split("; ")
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=")
        if (temp[0] === name) {
            return unescape(temp[1])
        }
    }
    return null;
}

export function deleteCookie(name: string): void {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = getCookie(name)
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString()
    }
}

export function ostype(): string {
    return getCookie('hq_http_ostype');
}

export function token(): string {
    return getCookie('hq_http_usertoken');
}

declare var window: Window & {
  app: any,
  __gobackbtn__hook: any,
}

export function gobackbtn(pathName) {
  const __gobackbtn = function(pathName){
    //  路由是否拦截，由meta中的prevent的函数的返回值决定(如果有的话)
    // params 参数说明：
    // - 为空： 则去查步骤，返回逻辑上一步
    // - 有参，则直接跳转以参数为name的路由，不带query
    // - 有参，则为"***|query"形式，跳转到目标路由***,把当前页面query带入
    // - 默认行为 返回上一历史记录
    const app = window.app
    const {meta, query, planType} = app.$route
    if (meta && (typeof meta.prevent === 'function') && meta.prevent()) return
    if (/\|query/.test(pathName)) {
      app.$router.push({name: pathName.split('|')[0], query: query})
    } else if (pathName) {
      app.$router.push({name: pathName})
    } else if (planType) {
      app.$router.go(-1)
    } else {
      app.$router.go(-1)
    }
  }
  // 如果有hook 则先执行hock
  if (typeof window.__gobackbtn__hook === 'function'){
    window.__gobackbtn__hook().then(res => {
      __gobackbtn(pathName)
    })
  } else {
    __gobackbtn(pathName)
  }
}

export function nativeAjax(url: string, data: any, method: string): void {
  // 异步对象
  var ajax = new XMLHttpRequest()
  // get 跟post  需要分别写不同的代码
  if (method == 'get') {
    // get请求
    if (data) {
      // 如果有值
      url += '?'
      url += data
    } else {

    }
    // 设置 方法 以及 url
    ajax.open(method, url)
    // send即可
    ajax.send()
  } else {
    // post请求
    // post请求 url 是不需要改变
    ajax.open(method, url)

    // 需要设置请求报文
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

    // 判断data send发送数据
    if (data) {
      // 如果有值 从send发送
      ajax.send(data)
    } else {
      // 木有值 直接发送即可
      ajax.send()
    }
  }
  // 注册事件
  ajax.onreadystatechange = function () {
    // 在事件中 获取数据 并修改界面显示
    if (ajax.readyState == 4 && ajax.status == 200) {
      alert('bbbb')
    }
  }
}