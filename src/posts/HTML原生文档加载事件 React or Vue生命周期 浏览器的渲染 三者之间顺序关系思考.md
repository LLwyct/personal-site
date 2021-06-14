---
title: "HTML原生文档加载事件 React&Vue生命周期 浏览器的渲染 三者之间顺序关系思考"
date: "2021-06-14 16:27:00"
label: "前端&浏览器&React&Vue"
autonav: 1
---

- [正文](#正文)
- [与Vue的关系](#与vue的关系)
- [与React类组件的关系](#与react类组件的关系)
- [与React函数组件的关系](#与react函数组件的关系)
- [我的理解](#我的理解)
- [结合浏览器渲染机制](#结合浏览器渲染机制)

事件的起因是这样的：

我有一个为自己的博客增加暗模式的需求，需要把用户的选择保存在loaclstorage里，但是要把内容发布到github Pages里需要在node环境下编译，就会出现找不到window，localstorage等对象，如果要解决这一问题就需要把逻辑写到useEffect里。

但问题就随之而来了，经过后续的测试发现，useEffect的回调函数是在文档的onload事件之后的，那么就会发生样式闪烁的问题，因为，onLoad事件发生之前浏览器就已经开始绘制了，如果这时候再切换主题颜色，就有比较明显的样式装换。比如用户当前默认是暗模式，就只能先载入白色背景，等到onload之后再切换为黑色背景。

不过经过后续的测试

- 类组件的componentDidMount是发生在onLoad事件之前的，
- 而函数组件有useEffect来模拟的componentDidMount是发生在onLoad之后的，所以说不能迷信函数组件哈哈😂。

但是当时就像拿函数组件练手，所以一直解决不了，就只能把逻辑写到外部js里，但是在gatsby.js中是把index.html隐藏起来了，如果想要在全局添加js脚本需要额外创建html.js进行注入。但是在传统react里面其实还是比较方便的，可以直接在public文件夹下改。

虽然我没有尝试替换为类组件，但是我还是觉得会有闪烁，最好还是挂载相关逻辑到原生HTML中，在body标签顶行。


# 正文

这里要感谢B站Up主 [山地人](https://space.bilibili.com/390120104) 的帮助。

俗话说的好，实践是检验真理的唯一标准。网上有很多文章讲过Vue、React的生命周期，或者是HTML文档的加载顺序这两个问题，但是我还真没有见过有人把这两个问题放在一起讨论。首先已知onLoad，会发生在所有script脚本执行完毕以后，即使该脚本是defer或async。

直接上测试结果，我还在之前讨论的基础上引入了**DOMContentLoaded事件**以及**浏览器渲染机制**的关系。具体的代码及演示见山地人的博客：[https://www.idev365.com/frontend/zsxq/12.load-a-page/](https://www.idev365.com/frontend/zsxq/12.load-a-page/)

# 与Vue的关系

```html
<html>
  <head>
    <script>
      console.log("script1 [开始]")
      window.onload=function(){
          console.log("onload [完成]")
      }      
      document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded finish!"))
      console.log("script1 [结束]")
    </script>
    <script src="https://unpkg.com/vue@next"></script>
  </head>
  <body>
    <div id="root"></div>
    <script>
      console.log("vue [开始]")
      Vue.createApp({
          template: '<div>Hello Vue 3.0</div>',
          beforeCreate(){ console.log("[app] before create") },
          created(){ console.log("[app] created") },
          beforeMount(){ console.log("[app] before mount") },
          mounted(){ console.log("[app] mounted") },
          beforeUnmount(){ console.log("[app] before unmount") },
          unmounted(){ console.log("[app] unmounted") }
      }).mount("#root")
      console.log("vue [结束]")
    </script>
  </body>
</html>
```

结果如下：

```
script1 [开始]
script1 [结束]
vue [开始]
[app] before create
[app] created
[app] before mount
[app] mounted
vue [结束]
DOMContentLoaded finish!
onload [完成]
```

# 与React类组件的关系
```html
<html>
  <head>
    <script>
      console.log("script1 [开始]")
      window.onload=function(){
          console.log("onload [完成]")
      }
      document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded finish!"))
      console.log("script1 [结束]")
    </script>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      console.log("react [开始]")
      class Hello extends React.Component {
        constructor(props) {
          super(props);
          console.log("[hello] constructor")
        }
        componentDidMount() {
          console.log("[hello] componentDidMount")
        }
        componentDidUpdate(prevProps, prevState, snapshot){
          console.log("[hello] componentDidUpdate")
        }
        componentWillUnmount(){
          console.log("[hello] componentWillUnmount")
        }
        render() {
          console.log("[hello] render")
          return <h1>Hello React</h1>;
        }
      }
      ReactDOM.render(
        <Hello />,
        document.getElementById('root')
      );
      console.log("react [结束]")
    </script>
  </body>
</html>
```

```
script1 [开始]
script1 [结束]
DOMContentLoaded finish!
react [开始]
[hello] constructor
[hello] render
[hello] componentDidMount
react [结束]
onload [完成]
```

# 与React函数组件的关系
```html
<html>
  <head>
    <script>
      console.log("script1 [开始]")
      window.onload=function(){
          console.log("onload [完成]")
      }
      document.addEventListener("DOMContentLoaded", () => console.log("DOMContentLoaded finish!"))
      console.log("script1 [结束]")
    </script>
    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      console.log("react [开始]")
      const { useEffect } = React
      function Hello(){
        console.log("[hello] [开始]")
        useEffect(function(){
          console.log("[hello] [in useEffect]")
        })
        console.log("[hello] [render]")
        return <h1>Hello React</h1>;
      }
      ReactDOM.render(
        <Hello />,
        document.getElementById('root')
      );
      console.log("react [结束]")
    </script>
  </body>
</html>
```

```
script1 [开始]
script1 [结束]
DOMContentLoaded finish!
react [开始]
[hello] [开始]
[hello] [render]
react [结束]
onload [完成]
[hello] [in useEffect]
```

# 我的理解

先说说观察到的事实：

- 可以看到除了React的函数组件，每一种方式都是onLoad事件在最后才触发，都是等待其他脚本执行完毕。
- **一个比较奇怪的现象是**，对于Vue来说，DOMContentLoaded事件居然触发的时间点这么晚？换言之就是Vue脚本的执行居然优先级这么高？这一点是我目前无法想通的。

# 结合浏览器渲染机制

上面的测试并没有解决实际问题，因为真正要落实到的是解决样式变化问题（我觉得和样式闪烁还不是同一个问题，有些许的区别），于是我研究了一番performance工具。

我发现真实的浏览器渲染规则和八股文中的区别还是很大的。比如Chrome真正的渲染其实分为了好几个阶段。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210614160034937.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)

比如上图就告诉了我们一些信息，首先：
- DCL表示DOMContentLoaded事件
- L代表onLoad事件
- FP代表first paint首次绘制
- FCP代表first contentful paint
- LCP代表largest contentful paint

因此我相信，在DCL的时候，页面的主题颜色以及整体框架就已经被渲染出来了，如果这时候再去等待后续的主题改变必定会造成样式闪烁的问题。并且结果或许的实践发现，不论是将样式变换放在onLoad事件还是DOMContentLoaded事件，都会造成一定的闪烁问题。并且浏览器会根据HTML的复杂程度自动选择不同的渲染顺序。可以看到这次DCL就发生在L之前。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210614161546946.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)

因此最好的方法还是要放在body标签的顶行。这样是不会发生闪烁的。