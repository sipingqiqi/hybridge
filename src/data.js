let data = {
    status: {
        loadstatus: false
    }
}

let obj = {
    status: false,
    value: ''
}

let names = [
    'camera', 'idCard', 'address', 'bank', 'job', 'customer', 'sign', 'viewPdf', 'shareInvoke', 'audio', 'search', 'images'
]

names.forEach(name => {
    data.status[name] = Object.assign({}, obj);
})

data.status.camera.index = 1;
data.status.search.callback = () => {};

module.exports = { 
    data: data
};