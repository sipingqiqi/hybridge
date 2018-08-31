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
