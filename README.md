# HyBridge 使用指南



## 如何安装

```bash
npm install @wangweiqi/hybridge --save
```



## 如何使用

### Vue.js 项目

在 main.js 文件中，添加如下代码：
```javascript
import * as HyBridge from '@wangweiqi/hybridge'
......
Vue.use(HyBridge)
```

在组件文件中，使用 this.$bridge 属性来调用方法：
```html
<script>
export default {
  name: "recognizee-info",
  methods: {
    onClick() {
      this.$bridge.SetH5Header('标题文字');
    }
  }
}
</script>
```

### 普通 web 项目

在初始化阶段，添加如下代码：
```javascript
import * as HyBridge from '@wangweiqi/hybridge'
......
switch(HyBridge.os()) {
  case 'ios':
    HyBridge.mount(new HyBridge.IOS());
    break;
  case 'android':
    HyBridge.mount(new HyBridge.ANDROID());
    break;
  default:
    HyBridge.mount(new HyBridge.BROWSER());
    break;
}
```

在需要调用方法的代码中，添加如下引用即可：
```javascript
import { SetH5Header } from '@wangweiqi/hybridge';
......
document.addEventListener('click', function(e) {
  SetH5Header('标题文字');
}, false);
```



## 方法说明

### 一、标题栏
#### 设置标题文字
```typescript
SetH5Header(title: string): void
```
* `title` - 标题文字



#### 设置标题栏左侧按钮
```typescript
leftMenu(option: MenuOption): void
```
* `option` - 按钮选项
* `MenuOption` - `javascript` - 全局方法名称
* `MenuOption` - `title` - 按钮文字



### 二、分享
#### 显示分享按钮，用户点击弹出分享提示
```typescript
showShareBtn(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void
```
* `type` - 分享类型，本接口固定使用 ShareType.DEFAULT
* `ShareType` - `DEFAULT` - 弹出提示，由用户选择分享类型
* `url` - 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
* `imageUrl` - 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
* `title` - 分享预览标题
* `desc` - 可选，分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
* `callback` - 可选，分享完成时的回调函数名，要求为全局函数，入参表明用户是否成功完成分享操作
* `Promise<string>` - 返回 JSON 字符串，标识用户分享结果，即：分享成功、分享失败、用户取消



#### 显示搜索和分享两个按钮，用户点击弹出分享提示
```typescript
showShareArr(javascript: string, url: string, imageUrl: string, title: string, desc: string): void
```
* `javascript` - 回调函数名，用户点击搜索将调用此全局函数
* `url` - 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
* `imageUrl` - 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
* `title` - 分享预览标题
* `desc` - 分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示



#### 代码直接调用分享功能，不弹出提示
```typescript
showShare(type: ShareType, url: string, imageUrl: string, title: string, desc: string, callback: string): void
```
* `type` - 分享类型
* `ShareType` - `DEFAULT` - 仍然弹出提示，由用户选择分享类型
* `ShareType` - `WX_FRIEND` - 分享到微信好友
* `ShareType` - `WX_TIMELINE` - 分享到微信朋友圈
* `ShareType` - `QQ_FRIEND` - 分享到 QQ 好友
* `ShareType` - `QQ_ZONE` - 分享到 QQ 空间
* `ShareType` - `WEIBO` - 分享到微博
* `url` - 分享内容的链接地址，要求以 http(s):// 开头的完整 URL 地址
* `imageUrl` - 分享预览小图标地址，要求以 http(s):// 开头的完整 URL 地址，图标不大于 30KB
* `title` - 分享预览标题
* `desc` - 可选，分享内容的描述文字，只有分享到好友才会显示，分享到朋友圈不显示
* `callback` - 可选，分享完成时的回调函数名，要求为全局函数，入参表明用户是否成功完成分享操作
* `Promise<string>` - 返回 JSON 字符串，标识用户分享结果，即：分享成功、分享失败、用户取消



### N、 以下说明暂未完成 TODO



## H5 方法实现对照表

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
