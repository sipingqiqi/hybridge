function setCookie(name, value) {
    var Days = 30
    var exp = new Date()
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000)
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}

function getCookie(name) {
    var arrStr = document.cookie.split("; ")
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split("=")
        if (temp[0] == key) {
            return unescape(temp[1])
        }
    }
}

function deleteCookie(name) {
    var exp = new Date()
    exp.setTime(exp.getTime() - 1)
    var cval = window.cookie.set(name)
    if (cval != null) {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()
    }
}

function ostype() {
    return window.cookie.get('hq_http_ostype');
}

function token() {
    return window.cookie.get('hq_http_usertoken');
}

module.exports = {
    setCookie, getCookie, deleteCookie, ostype, token
}