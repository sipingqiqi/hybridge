
let __tid = null;
let timeid;

const checkload = function () {
    return new Promise((resolve, reject) => {
        if (!window.jsBridge.status.loadstatus) {
            let tid = window.setInterval(() => {
                if (window.jsBridge.status.loadstatus) {
                    window.clearInterval(tid)
                    // alert('checkload success')
                    resolve('success')
                } else {
                    // reject('fail')
                }
            }, 50)
        } else {
            resolve('success')
        }
    })
}

// 打开搜索界面
const openSearch = function (type, hint, message) {
    hint = hint || "请输入你要搜索的关键字";

    if (window.HQAppJSInterface) {
        window.HQAppJSInterface.openSearch(type, hint, message);
    }

    return window.jsBridge.status.search
}

// 关闭搜索界面
const toggleSearch = function (isshow) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.hideSearchBox(isshow)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

// 设置标题
const SetH5Header = function (n) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.onJSInvokeResult(1, n) // 1 title
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}


const leftMenu = function (n) { // left menu
    let param = JSON.stringify(n)
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.setActionBarBackItem(param)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const toggleMenu = function (n, show) { // hide menu tring param 隐藏左右bar按钮 1 左 2右  3全部
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            // alert('toggleMenu n=' + n + 'show=' + show)
            window.HQAppJSInterface.showActionBarPanel(n, show)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const rightMenu = function (n) { // set 右按钮
    let param = JSON.stringify(n)
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.setWebViewMenu(param)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const articleDetail = function (url, title, btnTxt) {  // app 只读pdf
    if (!title) {
        title = ''
    }
    if (!btnTxt) {
        btnTxt = ''
    }
    return checkload().then(success => {
        if (window.HQAppJSInterface) {
            return window.HQAppJSInterface.studyArticleDetail(url, title, btnTxt)
        }
        return null
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const startAudioRec = function (isShow) {  // app 启动录音
    clearTimer()
    let startAudio = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.audio.status = false
            window.jsBridge.status.audio.value = ''
            window.HQAppJSInterface.requestAudioRecording(isShow)
            window.__tid = window.setInterval(success => {
                // alert(window.jsBridge.status.audio.status)
                if (window.jsBridge.status.audio.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.audio.value)
                    window.jsBridge.status.audio.status = false
                    window.jsBridge.status.audio.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return startAudio()
    })
}

const viewPdf = function (url, title, btnTxt) {  // app 调用pdf video image 带阅读并同意功能
    clearTimer()
    let vPDF = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.viewPdf.status = false
            window.jsBridge.status.viewPdf.value = ''
            window.HQAppJSInterface.studyArticleDetail(url, title, btnTxt)
            window.__tid = window.setInterval(success => {
                // alert('job=' + window.jsBridge.status.bank.status)
                console.log(window.jsBridge.status.viewPdf.status)
                if (window.jsBridge.status.viewPdf.status) {
                    // debugger
                    clearTimer()
                    // alert('job start=' + window.jsBridge.status.bank.status)
                    // alert(window.jsBridge.status.bank.value)
                    resolve(window.jsBridge.status.viewPdf.value)
                    window.jsBridge.status.viewPdf.status = false
                    window.jsBridge.status.viewPdf.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return vPDF()
    })
}



// 呼叫app 照相机

const callCamera = function (n) {
    clearTimer()
    let camera = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.index += 1
            window.jsBridge.status['camera' + window.jsBridge.status.index] = {
                status: false,
                value: ''
            }
            window.jsBridge.status.camera.status = false
            window.jsBridge.status.camera.value = ''
            window.HQAppJSInterface.takeUserImage()

            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.camera.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.camera.value, n)
                    window.jsBridge.status.camera.status = false
                    window.jsBridge.status.camera.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return camera()
    })
}

// 呼叫app 照相机-裁剪
const tailorCamera = function (n, bool, width, height) {
    clearTimer()
    let camera = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.index += 1
            window.jsBridge.status['camera' + window.jsBridge.status.index] = {
                status: false,
                value: ''
            }
            window.jsBridge.status.camera.status = false
            window.jsBridge.status.camera.value = ''
            window.HQAppJSInterface.takeUserImage(bool, width, height)

            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.camera.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.camera.value, n)
                    window.jsBridge.status.camera.status = false
                    window.jsBridge.status.camera.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return camera()
    })
}

// // 呼叫app 相机返回
// window.HQAppUploadResult = function (data) {
//   window.jsBridge.status.camera = true
// }
// window.onJSInvokeResult = function (argument) {
//   document.body.innerHTML += argument.name
// }
// 呼叫地址选择
const callAddress = function () {
    clearTimer()
    let address = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.address.status = false
            window.jsBridge.status.address.value = ''
            window.HQAppJSInterface.popUpAddressChooseView()
            window.__tid = window.setInterval(success => {
                // alert('address=' + window.jsBridge.status.address.status)
                if (window.jsBridge.status.address.status) {
                    clearTimer()
                    // alert('address start=' + window.jsBridge.status.address.status)
                    // alert(window.jsBridge.status.address.value)
                    resolve(window.jsBridge.status.address.value)
                    window.jsBridge.status.address.status = false
                    window.jsBridge.status.address.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return address()
    })
}
// 响应地址选择
// window.onAreaChooseResult = function (data) {
//   window.jsBridge.status.address = true
// }
// // HqGotoPrevStep
// window.HqGotoPrevStep = function () { // app bar left menu click callback
// }
// 呼叫身份证扫描
const idCardScan = function () {
    clearTimer()
    let idcard = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.idCard.status = false
            window.jsBridge.status.idCard.value = ''
            window.HQAppJSInterface.requestScanCertificateCard()
            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.idCard.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.idCard.value)
                    window.jsBridge.status.idCard.status = false
                    window.jsBridge.status.idCard.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return idcard()
    })
}
// save image
const saveImage = function (base64String) {
    if (typeof base64String !== 'string') {
        alert('只支持base64字串')
        return
    }
    window.HQAppJSInterface.savePictureToAlbum(base64String)
}

// 导入银行卡
const getBank = function () {
    clearTimer()
    let bank = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.bank.status = false
            window.jsBridge.status.bank.value = ''
            window.HQAppJSInterface.requestScanBankCard()
            window.__tid = window.setInterval(success => {
                // alert('job=' + window.jsBridge.status.bank.status)
                if (window.jsBridge.status.bank.status) {
                    clearTimer()
                    // alert('job start=' + window.jsBridge.status.bank.status)
                    resolve(window.jsBridge.status.bank.value)
                    window.jsBridge.status.bank.status = false
                    window.jsBridge.status.bank.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return bank()
    })
}

// 启动CA手写签名
const caSign = function (name, type, keyWord) {
    clearTimer()
    // let arr = []
    // if (arguments.length > 0) {
    //   Array.from(arguments[]).forEach((item) => {
    //     arr.push(item)
    //   })
    // }
    // let params = arr.join(';')
    let sign = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.sign.status = false
            window.jsBridge.status.sign.value = ''
            window.HQAppJSInterface.requestCAGestureSignData(name, type, keyWord)
            window.__tid = window.setInterval(success => {
                // alert('job=' + window.jsBridge.status.bank.status)
                if (window.jsBridge.status.sign.status) {
                    clearTimer()
                    // alert('job start=' + window.jsBridge.status.bank.status)
                    // alert(window.jsBridge.status.bank.value)
                    resolve(window.jsBridge.status.sign.value)
                    window.jsBridge.status.sign.status = false
                    window.jsBridge.status.sign.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return sign()
    })
}

// 导入职业数据
const getJob = function () {
    clearTimer()
    let job = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.job.status = false
            window.jsBridge.status.job.value = ''
            window.HQAppJSInterface.requestOccupationDicItem()
            window.__tid = window.setInterval(success => {
                // alert('job=' + window.jsBridge.status.job.status)
                if (window.jsBridge.status.job.status) {
                    clearTimer()
                    // alert('job start=' + window.jsBridge.status.job.status)
                    // alert(window.jsBridge.status.job.value)
                    resolve(window.jsBridge.status.job.value)
                    window.jsBridge.status.job.status = false
                    window.jsBridge.status.job.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return job()
    })
}

// 客户导入
const getCustomer = function () {
    clearTimer()
    let customer = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.customer.status = false
            window.jsBridge.status.customer.value = ''
            window.HQAppJSInterface.requestImportCustomerItem()
            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.customer.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.customer.value)
                    window.jsBridge.status.customer.status = false
                    window.jsBridge.status.customer.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return customer()
    })
}

// 3.2 关闭webview
// H5调用
// closeWebview(String type)
// h5调用closeWebview关闭当前webview，参数type：
// 1 – 关闭webview并返回到app首页
// 2 – 只关闭webview
const closeWebview = function (n = 2) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.closeWebview(n)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const goNativeHome = function () {
    window.closeWebview(1)
}

// 图片多选，count表示最大选择数量, count小于等于1，则默认为1
const takeUserImageMultiple = function (count = 1) {
    return checkload().then(() => {
        return new Promise(resolve => {
            if (window.HQAppJSInterface) {
                window.HQAppJSInterface.takeUserImageMultiple(count)
            }
            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.images.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.images.value)
                    window.jsBridge.status.images.status = false
                    window.jsBridge.status.images.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    })
}

const callCameraMultiple = takeUserImageMultiple

// window share
// 调用描述：
// H5调用appLocalShare让APP显示分享对话框(分享按钮在H5实现)
// 2)H5调用setAppLocalShareData设置APP分享数据，从而将APP的分享按钮显示出来

// 接口细节：
/** type值的定义描述：
 1 = 未指定，app会默认弹出分享对话框供用户选择
 2 = 微信好友
 3 = 微信朋友圈
 4 = QQ好友
 5 = QQ空间
 6 = 微博
如果要type之间用分号；隔开，比如要分享到微信好友和朋友圈，可将type设置为：
“2;3”
 **/
// 指定显示右上角的分享按钮(右上角分享按钮事件)
const showShare = function (type, url, imageUrl, title, desc, callback) {
    imageUrl = imageUrl || shareBackupIcon
    clearTimer()
    if (!callback || typeof window[callback] !== 'function') {
        callback = 'callback_' + parseInt(Math.random() * 1e16)
        window[callback] = function () { }
    }
    let share = function () {
        return new Promise((resolve, reject) => {
            window.jsBridge.status.shareInvoke.status = false
            window.jsBridge.status.shareInvoke.value = ''
            if (window.HQAppJSInterface) {
                window.HQAppJSInterface.appLocalShare(type, url, imageUrl, title, desc, callback)
            }
            window.__tid = window.setInterval(success => {
                if (window.jsBridge.status.shareInvoke.status) {
                    clearTimer()
                    resolve(window.jsBridge.status.shareInvoke.value)
                    window.jsBridge.status.shareInvoke.status = false
                    window.jsBridge.status.shareInvoke.value = ''
                } else {
                    // reject('fail')
                }
            }, 30)
        })
    }
    return checkload().then(function (data) {
        return share()
    })
}

// window.wechatShare 微信小程序分享
// webPageUrl:兼容低版本的网页链接
// path:小程序页面路径
const wechatShare = function (webPageUrl, path, imageUrl, title, desc, callback) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.setAppMinProgramShareData(webPageUrl, path, imageUrl, title, desc, callback)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

// String type，String url, String imageUrl, String title, String desc， String callback
// 点击显示分享菜单（页面中分享按钮事件）
const showShareBtn = function (type, url, imageUrl, title, desc, callback) {
    imageUrl = imageUrl || shareBackupIcon
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.setAppLocalShareData(type, url, imageUrl, title, desc, callback)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

// 指定显示右上角的搜索和分享
const showShareArr = function (fun, url, imageUrl, title, desc) {
    imageUrl = imageUrl || shareBackupIcon
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            let array = []
            fun && array.push({ title: "搜索", javascript: fun })
            array.push({ title: "分享", attachData: { typeSet: ["1"], url: url, imageUrl: imageUrl, title: title, desc: desc, callback: 'shareCallback' } })
            window.HQAppJSInterface.setWebViewMenus(JSON.stringify(array))
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

// 指定显示右上角的自定义图像和自定义搜索框
const showRiskArr = function (baseImg, fun1, baseImg2, fun2) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            let array = []
            array[0] = { type: 'image', title: baseImg, javascript: fun1 }
            array[1] = { type: 'image', title: baseImg2, javascript: fun2 }
            window.HQAppJSInterface.setWebViewMenus(JSON.stringify(array))
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const clearRiskArr = function () {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            let array = []
            window.HQAppJSInterface.setWebViewMenus(JSON.stringify(array))
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

// 原生ajax请求
const nativeAjax = function (url, data, method) {
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
            // console.log(ajax.responseText);

            // 将 数据 让 外面可以使用
            // return ajax.responseText;

            // 当 onreadystatechange 调用时 说明 数据回来了
            // ajax.responseText;

            // 如果说 外面可以传入一个 function 作为参数 success
            // success(ajax.responseText)
            alert('bbbb')
        }
    }
}

// 显示详情页大图数组分享
const showPosterDetail = function (param, index) {
    window.HQAppJSInterface.showPosterDetail(JSON.stringify(param), index)
}

// 发短信
const sendSms = function (telNum, content) {
    window.HQAppJSInterface.sendSms(JSON.stringify(telNum), content)
}

const showShareEntry = function (type, url, title, desc, callback) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.setAppLocalShareData(type, url, title, desc, callback)
        }
    }, fail => {
        console.log(fail)
    }).catch(error => {
        console.log(error)
        throw new Error(error)
    })
}

const showCustomerDetail = function (customerId, wechatNo, wechatNickName, imageUrl) {
    checkload().then(success => {
        if (window.HQAppJSInterface) {
            window.HQAppJSInterface.showCustomerDetail(customerId, wechatNo, wechatNickName, imageUrl);
        }
    }, fail => {
        console.log(fail);
    }).catch(e => {
        console.log(e);
        throw new Error(e);
    })
}

// 以下为内部方法
function clearTimer() {
    if (window.__tid) {
        window.clearInterval(window.__tid)
        window.__tid = null
    }
}


// 获取数据字典内容
window.dictionary = {}
let dictionary = [
  // "occupation",        // 职业列表
  // "area",              // 全国地址字典数据类型
  "post_type",         // 保单寄送类型
  "preserve",          // 保全类型
  "sales_channel",      // 销售渠道
  "relation",         // 家庭关系
  "bankcode",          // 银行卡列表
  "benefit_type",      // 受益人类型
  "card_type",         // 证件类型
  "citizenship",       // 国家列表
  "cover",             // 封面类型
  "degree",            // 学历列表
  "coverage_state",    // coverage_state
  "gender",            // 性别
  "insure_state",      // 保单状态
  "marriage",          // 婚姻情况列表
  "nation",            // 民族
  "payment",           // 支付类型
  "policy_channel",    // 保险渠道
  "occupation_level"  // 职业等级列表
]

function KVtoNV (n) {
  // let newObj = {}
  if (typeof n == 'object') {
    if (Array.isArray(n)) {
      return n.map(function (v, i, arr) {
        return KVtoNV(v)
      })
    } else {
      let newN = {}
      Object.keys(n).map(function (v, i, arr) {
        if (v == "key") {
          newN.value = KVtoNV(n[v])
        } else if (v == "value") {
          newN.name = KVtoNV(n[v])
        } else {
          newN[v] = KVtoNV(n[v])
        }
      })
      return newN
    }
  } else {
    return n
  }
}
window.KVtoNV = KVtoNV
window.setDictionary = function (n) { // 获取字典
  let setDic = function () {
    return new Promise((resolve, reject) => {
      if (window.HQAppJSInterface) {
        let stringJson = JSON.parse(window.HQAppJSInterface.getDicDataByType(n))
        window.dictionary[stringJson.name] = KVtoNV(stringJson.item)
        resolve(stringJson)
      } else {
        reject('fail')
      }
    })
  }
  return window.checkload().then(function (data) {
    return setDic()
  })
}
window.setAllDictionary = function () {
  window.checkload().then(success => {
    if (window.HQAppJSInterface) {
      dictionary.map(function (v, i, arr) { // 如果localStorage 无
        let stringJson = JSON.parse(window.HQAppJSInterface.getDicDataByType(v))
        window.dictionary[stringJson.name] = KVtoNV(stringJson.item)
      })
    }
  }, fail => {
    console.log(fail)
  }).catch(e => {
    console.log(e)
    throw new Error(e)
  })
}
window.setAllDictionary()

// 查询字典后返回数据
window.getDictionary = function (n) {
  var dir = function () {
    return new Promise((resolve, reject) => {
      if (window.dictionary[n]) {
        resolve(window.dictionary[n])
      } else {
        reject('fail')
      }
    })
  }

  return window.setDictionary(n).then(function (data) {
    return dir()
  })
}
// 查询字典后返回数据
// window.getDictionary('payment').then(success => {
//   let a = window.findDictionary(success, {value: '01'})  // {name: '男'}
//   console.log(a)
// }, fail => {
//   console.log(fail)
// }).catch(e => console.log(e))
window.findDictionary = function (target, n) { // 查字典  n.name || n.value
  let k = Object.keys(n)[0]
  let va = n[k]
  let seled = null
  function findObject (o) {
    if (typeof o == 'object') {
      if (Array.isArray(o)) {
        o.find(function (v, i, arr) {
          return findObject(v)
        })
      } else {
        if (o[k] == va) {
          seled = o
        }
      }
    }
  }
  findObject(target)
  return seled
}

// 模糊匹配 (这代码有bug， o[k].indexOf可能是不存在的)
window._findDictionary = function (target, n) { // 查字典  n.name || n.value
  let k = Object.keys(n)[0]
  let va = n[k]
  let seled = null
  function findObject (o) {
    if (typeof o == 'object') {
      if (Array.isArray(o)) {
        o.find(function (v, i, arr) {
          return findObject(v)
        })
      } else {
        if (o[k].indexOf(va) != -1) {
          seled = o
        }
      }
    }
  }
  findObject(target)
  return seled
}

/**
 * 查找函数，让对象类型的list也可以像数组类型的list一样查找
 * @param list {array|object}
 * @param invoke {function} 查找的判定函数
 * @returns {any} 查找结果
 */
const find = function (list, invoke) {
  return Array.isArray(list) ? list.find(invoke) : Object.keys(list).find(key => invoke(list[key], key, list))
}

/**
 * 在一个列表中查找一个项。如果它的键值对包含和<@param by>中指定的键值对，则认为查找成功
 * @param list 查找的列表
 * @param by 查找的限定
 * @returns {any} 查找的结果
 */
const findDict = (list, by) => {
  return find(list, item => Object.keys(by).every(key => item[key] === by[key]))
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