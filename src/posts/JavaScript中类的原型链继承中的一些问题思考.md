---
title: "JavaScript中类的原型链继承中的一些问题思考"
date: "2021-05-25 22:02:00"
label: "JavaScript&原型继承"
---

- [1. 继承](#1-继承)
  - [1.1. 原型链继承](#11-原型链继承)

# 1. 继承

## 1.1. 原型链继承

说一下原型链继承把，这个方法其实让我纠结了好久，因为它与我在一篇官方的文章里讲的不一样。先直接看代码：

```js
function Animal (name) {
this.name = name || "Animal";
this.sleep = function sleep () {
console.log("sleeping");
}
}
Animal.prototype.eat = function (food) {
console.log(this.name + ' eating ' + food);
}
function Cat() {}
Cat.prototype = new Animal();
let cat = new Cat("mimi");
cat.name = "mimi";
cat.eat("fish");
```

这是一段比较经典的原型链继承方法但是要注意，如果倒数第二行不主动再次声明`name`为mimi的话，会打印Animal eating fish，也就是说构造函数中的参数`name=mimi`，是没有用的。

在一篇比较权威的js教程中提到，尽量不要去覆盖函数的`prototype`属性，而是在其上做插入。比如上述代码第七行那样。如果直接覆盖会失去其原型中的`constructor`属性，因为即使是一个空函数，它也有它的 `prototype` 属性，而这个空函数的 `prototype` 就是一个只包含 `constructor` 的对象，这个 `constructor` 就是这个函数本身，即 `F.prototype.constructor === F` 返回真。

但是这里的原型链继承中，使用了这种覆盖的方法。经测试，`Cat.prototype.constructor === Animal`。这就比较能看出来问题了。我个人理解是，`F`的`prototype`是`animal`对象，而其上是没有`constructor`的，所以去`animal`的原型上找，而animal的原型上的`constructor`就是`Animal`函数。所以我还是比较不太喜欢这种方法的。
