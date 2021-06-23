---
title: "HTML原生文档加载事件 React or Vue生命周期 浏览器的渲染 三者之间顺序关系思考"
date: "2021-06-23 20:21:00"
label: "手写实现&跨域"
autonav: 1
---

- [简介](#简介)
- [代码实现](#代码实现)
  - [客户端](#客户端)
  - [服务端](#服务端)
  - [结果](#结果)

相信很多人都看过jsonp的相关知识，对jsonp的工作原理大致有所了解，不过眼看千遍不如手写一遍，我今天就手写实现一下jsonp。

# 简介

JSONP全称json with padding是解决跨域问题的策略之一。

该协议的一个要点就是允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，并构造出一个执行该函数的字符串，返回的字符串能直接作为js执行，这样客户端就可以定制自己的函数以处理返回的数据。

如果要理解jsonp很重要的一点是，用script标签发起的请求的 `response` 的 `content-type` 是`application/javascript` ，这样保证返回的字符串能当做js直接执行，就和一个js文件一样。

# 代码实现

## 客户端
```html
<!DOCTYPE html>
<html>
<body>
    hello, jsonp
    <script>
        function getInfo (data) {
            console.log(data);
        }
    </script>
    <script src="http://localhost:8080?callback=getInfo"></script>
</body>
</html>
```

第二个 `script` 中的内容表示向服务端请求数据，其中定义的函数是 `getInfo` ，我们服务端要做的就是，返回一个执行  `getInfo` 函数形式的字符串，比如 `"getInfo({"name": "张三"})"` ，并把数据作为参数放在括号中。这个字符串会被当做js执行，也就触发了第一个`script` 标签中的函数，并且执行函数中的内容，在函数中组织后续的逻辑即可。

## 服务端

这里我用了 `Node.js` 原生的 `http`库，做一个方便复刻的演示。

```js
const http = require("http");
const { URL } = require("url");

const server = http.createServer((req, res) => {
    const { searchParams } = new URL(req.url, "http://localhost");
    const funcName = searchParams.get("callback");
    if (funcName === "getInfo") {
        const data = {
            name: "张三",
            age: 24
        }
        res.writeHead(200, "ok", {
            "Content-Type": "application/javascript"
        })
        .end(funcName + `(${JSON.stringify(data)})`, "utf-8");
    }
})

server.listen(8080);
```

我们来主要关注一下中心函数体的内部逻辑。我们这里首先使用了 基于WHATWG标准的URL类，需要使用new 关键字来构造。

看看文档里的描述：

> new URL(input: str[, base: str])
> input 要解析的绝对或相对的输入 URL。 如果 input 是相对的，则需要 base。 如果 input 是绝对的，则忽略 base。

因此我随便构造了一个base给它用。

然后获取callback的函数名，如果该函数名与我们前端定义的接口一致，则把后端要传递的数据写入对象，并编成JSON格式，写入执行该函数形式的字符串。

别忘了写入 头部 内容类型 为 `application/javascript` 。最后用 `end` 方法返回给客户端。

## 结果

我们在浏览器中打开该页面，就可以在控制台看到日志打印的内容了。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210623201151664.png)
