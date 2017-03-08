
# v2ex

> A vue.js project for V2EX

## 预览图
> 首页

![首页](http://ol1kqeyve.bkt.clouddn.com/index.gif)
> 主题

![主题](http://ol1kqeyve.bkt.clouddn.com/zhuti.gif)
> 关于

![关于](http://ol1kqeyve.bkt.clouddn.com/about.gif)

## 已实现的功能清单
1. 首页不同主题tab切换
2. 文章列表模块
3. 主题列表和主题搜索
4. 关于V2EX信息和清除本地缓存
5. 数据本地化
6. 上拉加载和下拉刷新
7. 欢迎页和Loading模块

## 在线预览
>扫一扫

![](http://i1.piimg.com/567571/d10efe65cd3d4fec.png)
[点击](http://cmh.leolei.cn/vue)
## 注意！注意！注意！
> 本地运行会有跨域问题。按照如下配置可通过node解决跨域问题。但是这个不行，已亲测豆瓣API可以实现跨域，不知道是不是V2EX提供的api是情况。本地开发解决跨域终极方法（仅仅适用于开发环境）--安装谷歌插件 Allow-Control-Allow-Origin: * 即可

```
dev: {
  env: require('./dev.env'),
  port: 8088,
  autoOpenBrowser: false,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
      '/api':{
          target:'http://www.v2ex.com/api',
          changeOrigin:true,
          pathRewrite:{
              '^/api':''
          }
      }
  },
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
