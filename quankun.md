### 一、基于 qiankun 的微前端架构实践

### 构建主应用基座
>如何使用 qiankun 如何搭建主应用基座

1. 将普通的项目改造成 qiankun 主应用基座，需要进行三步操作：
    - 创建微应用容器 - 用于承载、渲染显示微应用；
    - 注册微应用 - 设置微应用激活条件，微应用地址等等；
    - 启动 qiankun；

### 接入微应用
>接入不同技术栈的微应用，，完成微前端架构的从 0 到 1

1. 把不同技术栈 Vue、React、Angular、Jquery...等没有weboack脚手架 的微应用都已经接入到主应用基座中
    - 注册微应用 - 在主应用中注册微应用，进入指定路由时加载对应微应用
    - 配置微应用 - 我们在 Vue 的入口文件 main.js 中，导出 qiankun 主应用所需要的三个生命周期钩子函数
      1. webpack 默认的 publicPath 为 "" 空字符串，会基于当前路径来加载资源。我们在主应用中加载微应用时需要重新设置 publicPath，这样才能正确加载微应用的相关资源
      1. 微应用的挂载函数
          - 在主应用中运行时将在 mount 生命周期钩子函数中调用，可以保证在沙箱内运行
          - 微应用独立运行时，直接执行 render 函数挂载微应用
      1. bootstrap
          - 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
          - 通常我们可以在这里做一些全局变量的初始化
      1. mount
          - 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
      1. unmount
          - 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例

      1. 在配置好了入口文件 main.js 后，还需要配置 webpack，使 main.js 导出的生命周期钩子函数可以被 qiankun 识别获取
          ```
          //在 vue.config.js配置 webpack
          output: {
            // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: "VueMicroApp",
            // 将你的 library 暴露为所有的模块定义下都可运行的方式
            libraryTarget: "umd",
            // 按需加载相关，设置为 webpackJsonp_VueMicroApp 即可
            jsonpFunction: `webpackJsonp_VueMicroApp`,
          },
          ```
----
如果是多个 html 的多页应用 - MPA，则需要在服务器（或反向代理服务器）中通过 referer 头返回对应的 html 文件，或者在主应用中注册多个微应用（不推荐）

### 介绍
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2020/5/8/171f3c48e142a180~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.png)

生命周期篇；
IE 兼容篇；
生产环境部署篇；
性能优化、缓存方案篇；

