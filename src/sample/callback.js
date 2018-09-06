const { global } = require('../global');

function onReady(n) {
  global.jsBridge.status.loadstatus = true
}

function onDataResult(type, data) {
  global.console.log('@method global.app2js_onDataResult:', type, data)

  if (global.debugYIAOXIAOFEI === true) {
    alert(JSON.stringify(data))
  }

  try {
    switch (type) {
      case 'takeUserImage':
        global.jsBridge.status.camera.value = data
        global.jsBridge.status.camera.status = true
        break
      case 'popUpAddressChooseView':
        global.jsBridge.status.address.value = data
        global.jsBridge.status.address.status = true
        break
      case 'requestScanCertificateCard':
        global.jsBridge.status.idCard.value = data
        global.jsBridge.status.idCard.status = true
        break
      case 'requestImportbankItem':
        global.jsBridge.status.bank.value = data
        global.jsBridge.status.bank.status = true
        break
      case 'requestOccupationDicItem':
        global.jsBridge.status.job.value = data
        global.jsBridge.status.job.status = true
        break
      case 'requestCAGestureSignData':
        global.jsBridge.status.sign.value = data
        global.jsBridge.status.sign.status = true
        break
      case 'requestImportCustomerItem':
        global.jsBridge.status.customer.value = data
        global.jsBridge.status.customer.status = true
        break
      case 'studyArticleDetail':
        global.jsBridge.status.viewPdf.value = data
        global.jsBridge.status.viewPdf.status = true
        break
      case 'appLocalShare':
        global.jsBridge.status.shareInvoke.value = data
        global.jsBridge.status.shareInvoke.status = true
        // alert(data)
        // global.AAA = data
        break
      case 'requestAudioRecording':
        global.jsBridge.status.audio.value = data
        global.jsBridge.status.audio.status = true
        // alert(data)
        break
      case 'takeUserImageMultiple':
        global.jsBridge.status.images.value = data
        global.jsBridge.status.images.status = true
        // bus.emit('takeUserImageMultiple', data)
        break

      case 'search':
        global.jsBridge.status.search.value = data
        global.jsBridge.status.search.status = true
        global.jsBridge.status.search.callback(data)
        break;
    }
  } catch (e) {
    global.console.error(e)
  }
}

function notifyCommandFromNative() { }

module.exports = {
  onReady, onDataResult, notifyCommandFromNative
}
