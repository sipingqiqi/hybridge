const Zip = require('../util/zip');
const zip = new Zip();

window.__tid = null;

// TODO: goNativeHome / saveImage / clearRiskArr

/**
 * 打开搜索界面 (暂未实现)
 * @param {string} type - 搜索历史的 ID 值
 * @param {string} hint - 键盘上方的提示文字
 * @param {string} message - 搜索框内部的提示文字
 */
function openSearch(key, hint, message) { }

/**
 * 关闭搜索界面 (暂未实现)
 * @param {Boolean} isHide   - 是否关闭搜索框, true:隐藏 ; false: 显示
 */
function toggleSearch(isshow) { }

/**
 * 设置app标题
 * @param {string} n - 标题文字
 */
function SetH5Header(n) {
    const u = navigator.userAgent
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 //android终端或者uc浏览器
    if (isAndroid) {
        document.title = n
    } else {
        var $body = document.body
        document.title = n
        /**
         * 设置一个空的占位iframe，每次调用时增加去除 可以强制刷新;
         */
        var $iframe = document.createElement('iframe')
        $body.appendChild($iframe)
        setTimeout(_ => {
            $body.removeChild($iframe)
        })
    }
}

/**
 * 左边标题 （暂无）
 * @param {object} n - object.title, object.javascript 调用时传入的参数
 */
function leftMenu(n) { }

/**
 * 控制左右标题显示隐藏 （暂无）
 * @param {string} n 隐藏哪个bar对应的value值,1:左边 ; 2:右边 ; 3:全部 
 * @param {Boolean} show 显示还是隐藏,true:显示 ; false:隐藏
 */
function toggleMenu(n) { }

/**
 * 左边标题
 * @param {object} n  调用时传入的参数
 */
function rightMenu(n) { }

/**
 * 查看 PDF 文档，同 viewPdf 方法
 * @param {string} url - 打开的地址
 * @param {string} title - 数据的标题，暂无实现
 * @param {string} btnTxt - 按钮上的文字，暂未实现
 */
function articleDetail(url, title, btnTxt) {
    viewPdf(url, title, btnTxt);
}

/**
 * 查看 PDF 文档
 * @param {string} url - 打开的地址,主要有图片、PDF、视频三类数据
 * @param {string} title - 数据的标题，暂无实现
 * @param {string} btnTxt - 按钮上的文字，暂未实现
 */
function viewPdf(url, title, btnTxt) {
    window.open(url) // 安卓下载pdf ios可以查看
}

/**
 * 启动录音功能 h5无法实现
 * @param {Boolean} isShow native录音显示隐藏, true:显示; false:隐藏 
 */
function startAudioRec(isShow) { }

function callCamera(n) {
    return new Promise((res, rej) => {
        let fileObj = null;
        let fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window });
        fileInput.dispatchEvent(evt);
        fileInput.onchange = function (e) {
            fileObj = e.path[0].files[0]
            zip.run(fileObj).then(success => {
                let base64 = success.base64.split('base64,')[1]
                res(base64, n);
                fileInput.remove()
            })
        }
    })
}

/**
 * 照相机-裁剪
 * @param {*} n
 * @param {*} bool
 * @param {*} width
 * @param {*} height
 */
function tailorCamera(n, bool, width, height) { }

/**
 * 呼叫地址选择
 */
function callAddress() { }

/**
 * 呼叫身份证扫描
 */
function idCardScan() { 
    function getIdCard () {
        return new Promise((res,rej) => {
            callCamera().then(base64=>{
                res(this.app.axios.post(window.API.IDCARD,{base64}))
            })
        })
    }
    return getIdCard()
}

/**
 * 导入银行卡
 */
function getBank() {
    return new Promise ((res,rej) => {
        callCamera().then(base64=>{
            res(this.app.axios.post(window.API.BANK,{base64}))
        })
    })
 }

/**
 * 启动CA手写签名
 * @param {string} name 
 * @param {*} type 
 * @param {*} keyWord 
 */
function caSign(name, type, keyWord) {
    clearTimer()
    window.app.$router.push('/h5SignIn')
    let sign = function () {
        return new Promise((resolve, reject) => {
            window.__tid = window.setInterval(success => {
                if (window.app.$store.state.jsBridge.caSign.includes('base64')) {
                    clearTimer()
                    resolve(window.app.$store.state.jsBridge.caSign)
                    window.app.$store.commit('clearCaSign')
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return sign()
}

/**
 * 导入职业数据
 */
function getJob() {
    clearTimer()
    window.app.$router.push('/jobList')
    let getJob = function () {
      return new Promise ((res,rej)=>{
        window.__tid = window.setInterval( _ => {
          if (window.app.$store.state.jsBridge.item) {
            clearTimer()
            res(window.app.$store.state.jsBridge.item)
            window.app.$store.commit('clearItem')
          } else {
          }
        }, 30)
      })
    }
    return getJob()
}

/**
 * 客户导入
 */
function getCustomer() { }

/**
 * 关闭webview （空方法）
 * @param {number} n
 */
function closeWebview() { }

/**
 * 多选不一定这么玩，先写到这
 * @param {限定数量} count 
 */
function takeUserImageMultiple(count = 1) {
    clearTimer()
    let imgs = []
    function getImg() {
        return new Promise((res, rej) => {
            const fileInput = getFile()
            fileInput.onchange = function (e) {
                let fileObj = e.path[0].files[0]
                fileInput.remove()
                getFileToBase64(fileObj, obj => {
                    imgs.push(obj)
                    res(obj)
                })
            }
        })
    }
    let countArr = []
    for (let i = 0; i < count; i++) {
        countArr.push(getImg())
    }
    let imgArr = Promise.all(countArr)
    imgArr.then(res => {
        console.log(res)
    })
    return new Promise((res, rej) => {
        clearTimer()
        window.__tid = setInterval(_ => {
            console.log(imgs);
            if (imgs.length == count) {
                clearTimer()
                res(imgs)
            }
        }, 30)
    })
}

function callCameraMultiple(count = 1) {
    return takeUserImageMultiple(count);
}

/**
 * 指定显示右上角的分享按钮 无法实现
 */
function shareShare(type, url, imageUrl, title, desc, callback) { }

/**
 * 微信小程序分享
 * @param {string} webPageUrl 兼容低版本的网页链接
 * @param {string} path 小程序页面路径
 * @param {string} imageUrl
 * @param {string} title
 * @param {string} desc 描述
 * @param {callback} callback
 */
function wechatShare(webPageUrl, path, imageUrl, title, desc, callback) { }

/**
 * 右上角显示分享图标，并完成分享操作
 * @param { number;number } type
 1 = 未指定，app会默认弹出分享对话框供用户选择
 2 = 微信好友
 3 = 微信朋友圈
 4 = QQ好友
 5 = QQ空间
 6 = 微博
 如果要type之间用分号；隔开
 * @param {string} url 地址
 * @param {string} imageUrl 分享展示的图片
 * @param {string} title 标题
 * @param {string} desc 描述
 * @param {callback} callback
 */
function showShareBtn(type, url, imageUrl, title, desc, callback) { }

/**
 * 在右上角显示分享和搜索两个图标；
 * 图标,是根据 title 上的文字对应显示的，
 * 如：搜索、分享
 * window.showShareArr(null, this.sharelink, this.shareimg, this.sharetitle, this.sharedsc)
 * @param {callback} fun 搜索的回调传null则无搜索
 * @param {string} url 分享的地址 
 * @param {string} imageUrl 图标图片的地址
 * @param {string} title 对应图标的文字
 * @param {string} desc 分享描述文字
 */
function showShareArr(fun, url, imageUrl, title, desc) { }

/**
 * 右上角设置两个图标 ?
 * 类型为base64，大小限定50*50
 * @param {base64} baseImg 图1
 * @param {callback} fun1 
 * @param {base64} baseImg2 图2
 * @param {callback} fun2 
 * 执行函数，无返回值无mock有回调
 */
function showRiskArr(baseImg, fun1, baseImg2, fun2) { }

/**
 * 原生ajax请求
 * @param {string} url url
 * @param {object} data 参数
 * @param {string} method 请求方式
 */
function nativeAjax(url, data, method) { }

/**
 * 打开海报详情界面,点击显示大图数组可分享
 * 调用该方法,将海报url列表和要展示的海报的索引作为参数传入；
 * 
 * @param {Array} param 海报url列表
 * [{"type":"1","subType":"1","adId":"1","url":"http://test.html"}]
 * @param {number} index 海报索引
 * 执行函数，无返回值无mock
 */
function showPosterDetail(param, index) { }

/**
 * 发短信 打开短信编辑界面
 * @param {number} telNum 电话号码
 * @param {string} content 发送的内容
 * 执行函数，无返回值无mock
 */
function sendSms(telNum, content) { }

/**
 * 设置分享数据，内部调用,设置分享数据的
 * 貌似没看见调用的地方
 * @param { number;number } type 
 1 = 未指定，app会默认弹出分享对话框供用户选择
 2 = 微信好友
 3 = 微信朋友圈
 4 = QQ好友
 5 = QQ空间
 6 = 微博
 如果要type之间用分号；隔开
 * @param {string} url 地址
 * @param {string} title title
 * @param {string} desc 描述
 * @param {callback} callback 
 * 执行函数，有回调无mock
 */
function shareShareEntry(type, url, title, desc, callback) { }

/**
 * 打开客户详情
 * 三个参数都是通过接口获取
 * @param {string} customerId 客户id
 * @param {string} wechatNo open_id
 * @param {string} wechatNickName 昵称
 * 执行函数，无返回值无mock
 */
function showCustomerDetail(customerId, wechatNo, wechatNickName) { }

// 以下为内部方法

function clearTimer() {
    if (window.__tid) {
        window.clearInterval(window.__tid)
        window.__tid = null
    }
}

function getFile(multiple) {
    let fileObj = null
    let fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', 'image/*')
    var evt = new MouseEvent("click", { bubbles: false, cancelable: true, view: window })
    fileInput.dispatchEvent(evt)
    return fileInput
}

function getFileToBase64(fileObj, fn) {
    zip.run(fileObj).then(success => {
        fn({
            full: success.base64,
            split: success.base64.split('base64,')[1]
        })
    })
}

module.exports = {
    openSearch, toggleSearch,
    SetH5Header, leftMenu, toggleMenu, rightMenu,
    articleDetail, viewPdf,
    callCamera, tailorCamera, callAddress, idCardScan,
    getBank, caSign, getJob, getCustomer, closeWebview,
    takeUserImageMultiple, callCameraMultiple, startAudioRec,
    shareShare, wechatShare, showShareBtn, showShareArr, showRiskArr,
    nativeAjax, showPosterDetail, sendSms, shareShareEntry, showCustomerDetail
}