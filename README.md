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
* `option` - `javascript` - 全局方法名称
* `option` - `title` - 按钮文字



### 二、 以下说明暂未完成 TODO



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
