# w-js-bridge

import HyBridge from '@wangweiqi/hybridge';

// first execute
HyBridge.mount(new HyBridge.Native());

// every vue script
HyBridge.leftMenu({...});


# W-JS-BRIDGE 使用指南
> 该项目要和 Native 相配合，实现混合模式开发，调用 App 的原生功能，并且在纯 H5 环境下，兼容部份功能

## 安装 NPM 包
> npm install w-js-bridge --save

## 在 main.js 中添加引用
> import JsBridge from 'w-js-bridge'

## 将对象挂载到 window 对象
> JsBridge.mount()

## 环境感知
* 如果 window.HQAppJsInterface 对象存在，则认为是 APP 环境，提供全部功能支持；
* 如果 User Agent 含有 MicroMessenger 字符串，则认为是微信环境，提供 JS SDK 功能支持（暂无）；
* 若上述条件均不符合，则认为是纯 H5 环境，提供部份功能支持，其它功能返回空，不报错。

## 测试
```bash
npm pack
cd demo页面
npm i ../w-js-bridge/w-js-bridge-1.0.6.tgz

```
## h5实现

>  H5实现->(y/n无法实现或无需实现)

| 方法名                  | 说明                               | H5实现       |
| ----------------------- | ---------------------------------- | ------------ |
| cookie                  | 增删查cookie                       | n            |
| ostype                  | 获取操作系统                       | n            |
| token                   | 获取用户token                      | n            |
| HQAppGetH5Header        | app加载完成标识                    | n            |
| checkload               | app是否加载完成                    | n            |
| gobackbtn               | 左上角返回按钮                     | n            |
| openSearch              | 打开搜索界面                       | y            |
| toggleSearch            | 关闭搜索界面                       | y            |
| SetH5Header             | 设置app标题                        | y。ok        |
| leftMenu                | 设置左菜单                         | n            |
| toggleMenu              | 菜单切换显示                       | n            |
| rightMenu               | 设置右菜单                         | n            |
| articleDetail           | 读取展示pdf                        | n            |
| startAudioRec           | 录音                               | n            |
| viewPdf                 | 调用pdf                            | n            |
| dictionary              | 字典内容                           | n            |
| callCamera              | 调用照相机                         | y            |
| tailorCamera            | 照相机裁剪                         | y            |
| callAddress             | 地址选择                           | y            |
| idCardScan              | 身份证扫描                         | y            |
| getBank                 | 导入银行卡                         | y （没调用） |
| caSign                  | CA手写签名                         | y  ok        |
| getJob                  | 导入职业数据                       | n            |
| getCustomer             | 客户导入                           | n            |
| app2js_onDataResult     | 调用app功能的方法                  | n            |
| closeWebview            | 关闭当前webview                    | n            |
| callCameraMultiple      | 图片多选                           | y            |
| showShare               | 显示右上角的分享按钮               | n            |
| wechatShare             | 微信小程序分享                     | n            |
| showShareBtn            | 右上角显示分享图标，并完成分享操作 | n            |
| showShareArr            | 在右上角显示分享和搜索两个图标     | n            |
| showRiskArr             | 右上角设置两个图标                 | n            |
| clearRiskArr            | 清除右上角的图标                   | n            |
| nativeAjax              | 原生ajax请求                       | n            |
| showPosterDetail        | 海报详情                           | n            |
| sendSms                 | 发短信                             | n            |
| showShareEntry          | 设置分享数据，内部调用             | n            |
| showCustomerDetail      | 打开客户详情                       | n            |
| testShare               | 测试分享 还没用                    | n            |
| notifyCommandFromNative | 功能未知                           | n            |

## 实现顺序

```
1. 无交互功能
文件上传，图片多选上传，pdf，设置h5header，cookie，获取操作系统，获取token
2. 交互较少
打开搜索界面
3. 交互较多
以下可在vue项目，通过路由跳转组件的形式来实现。
暂无法纯jsBridge实现
海报，签名，裁剪，客户导入，导入职业信息，导入地址，
4. 无法实现
设置顶部菜单图标，分享，发短信
```

## 已实现的功能

| 名称                            | H5   | wx   |
| ------------------------------- | ---- | ---- |
| SetH5Header                     | OK   | ok   |
| callCamera                      | ok   | ok   |
| takeUserImageMultiple           | ok   | ok   |
| articleDetail（查看PDF）        | ok   | ok   |
| caSign（手写签名，vue组件实现） | ok   | ok   |
| gobackbtn                       | n    | n    |
| 职位(vue组件)                   | ok   | ok   |

> 调出摄像头，分享类功能，在wx版应该要用js-sdk实现
>
> wx版需实现使用录音功能

## 二版

> 较多的交互功能
>
> 动态添加样式文件？
