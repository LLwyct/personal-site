---
title: "this的绑定机制 以及 手写实现call、apply、bind"
date: "2021-06-01 13:59"
label: "Javascript&手写实现"
autonav: 1
---

- [前言](#前言)
- [this的四种绑定](#this的四种绑定)
  - [1 默认绑定](#1-默认绑定)
  - [2 隐式绑定](#2-隐式绑定)
  - [3 硬绑定、显式绑定](#3-硬绑定显式绑定)
  - [4 构造函数绑定](#4-构造函数绑定)
- [手写实现](#手写实现)
  - [`call(obj, p1, p2, …)`](#callobj-p1-p2-)
  - [`apply(obj, [p1, p2, …])`](#applyobj-p1-p2-)
  - [`bind(obj, p1, p2)(p3,p4,…)`](#bindobj-p1-p2p3p4)

# 前言

> `call apply bind` 他们都是为了把对象绑定到这个函数的this上。

其实我在这之前一直是这样理解的——"把this绑定到函数上"，毕竟传进来的参数是this，其实这么理解是正向的，但是一直感觉很难理解。直到今天看了一个视频，他这么反着一说，我突然有点茅塞顿开的感觉。其实仔细想一想，`call，apply，bind` 这三个函数执行的主体都是函数（函数中的this理解为占位符，他们只在执行该函数时才有明确的指向，因此我们需要清楚的知道，在某一时刻这个this到底表示的是什么，这也是JavaScript的一个难点。）而传入的参数是对象（只不过大多数时候，这个对象会是this）因此说把对象绑定到this上反而比较合适。

这里要深刻理解还需要掌握this指向的绑定机制。大多数情况下，this的指向对于初学者都是一个难题，this可以理解为占位符，它为了能够使代码更加可复用从而不代表任何事物，因此需要了解this的绑定，绑定了才有指向。绑定的四种模式，分别是默认绑定，隐式绑定，硬绑定，构造函数绑定。

# this的四种绑定
## 1 默认绑定
默认绑定一般是指函数中的this，多用于回调函数，由于回调函数无执行主体，此时的this一般无指向undefined或为window。不过在setTimeout下比较特殊，都为window。

## 2 隐式绑定
这个是最常见的，哪个对象调用该函数，该函数中的this就指向谁。

## 3 硬绑定、显式绑定
就是用call、apply、bind进行this绑定，这里不但可以固定住this，也可以固定后续的参数，以后不管在哪里用，都不会改变。

## 4 构造函数绑定
new 函数绑定是比较抽象的一个，new 执行这个函数时的this指向new 实例化的对象。
```js
function Person () {
	this.name = 'Bob';
}
let bob = new Person();
```

上面的例子中，在new的时候，执行 `Person` 构造函数，在这个执行的过程中。`this` 指向 `bob` 对象。

# 手写实现
## `call(obj, p1, p2, …)`

先来看call，这里要注意call和apply的区别，call的参数是不收集成数组的，默认展开的。

```js
Function.prototype.myCall = function (obj, ... rest) {
	obj = obj ? obj : window;
	const key = Symbol("tempFn");
	obj[key] = this;
	const result = obj[key](... rest)
	delete obj[key]
	return result;
}

function add () {
	return this.a + this.b;
}

let obj = {
	a: 1,
	b: 3
}
```


当我们使用函数调用call的时候，比如 `add.call()` ，是不是相当于一个隐式绑定？因此`myCall`函数中的`this`其实就是要借用的函数`add`。我们希望由`obj`代替`add`函数中的`this`，所以我们这里可以构建成一个`obj.add()`的隐式绑定，,这样`add`函数中的`this`就绑定到了`obj`上。我们可以把这个函数，先复制给希望绑定到的对象——第一个参数`obj`身上。调用完了以后再删掉。这里为了不覆盖原有的属性，这里使用绝对不会重复的`symbol`类型。

```js
obj.myCall(obj) // 4
```

##  `apply(obj, [p1, p2, …])`

再来看看apply，异曲同工。

```js
Function.prototype.myApply = function (obj, rest) {
	obj = obj ? obj : window;
	const key = Symbol("tempFn");
	obj[key] = this;
	rest = rest ? rest : [];
	const result = obj[key](...rest);
	delete obj[key];
	return result;
}
```

## `bind(obj, p1, p2)(p3,p4,…)`

这里的 `bind` 其实是柯里化的，因此如果你有无限长的参数列表，无论从哪里断开分别传给第一次调用和第二次调用都是一样的。

这里要注意与 `call, apply`不同之处。bind返回的是一个函数，那么函数就可以使用构造函数生成实例。并且具体表现在以下两点：

1. **原生bind在构造函数new执行函数时this会丢失**，如果不做特殊处理，this不会丢失。
2. **new生成的实例有原型链**，new执行的函数可以读取到原型链上的属性。

```js
function add (p1, p2, p3) {
	this.p3 = p3;
	console.log(this.name)
	console.log(this.age);
	console.log(p1 + p2);
	console.log(this.p3);
}
// undefined 21 72 2
add.prototype.age = 21;

let obj = {
	a: 1,
	b: 3,
	name: 'Bob'
}

Function.prototype.myBind = function (obj, ...rest) {
	const callFn = this;
	const reFn = function (...secondRest) {
		if (this instanceof reFn) {
			return callFn.call(this, ...rest, ...secondRest);
		}
		return callFn.call(obj, ...rest, ...secondRest);
	}
	reFn.prototype = Object.create(add.prototype);
	return reFn;
}

let fn = add.myBind(obj, 5);
let ans = new fn(67, 2);
```

我们之前提到过构造函数绑定，this此时是函数的实例，因此 `this instanceof reFn` 此时应该是 `True`。所以此时把 `add` 函数绑定到`this` 上。否则，就绑定到希望绑定的`obj`上。由于还需要实现原型链，我们令返回的函数的原型属性为 `add` 的原型对象，这样就完成了原型链。

对于原型链的处理也可以采用老方法：

```js
Function.prototype.myBind = function (obj, ...rest) {
	const callFn = this;
	const reFn = function (...secondRest) {
		if (this instanceof reFn) {
			return callFn.call(this, ...rest, ...secondRest);
		}
		return callFn.call(obj, ...rest, ...secondRest);
	}
	function tempFn () {}
	tempFn.prototype = this.prototype;
	reFn.prototype = new tempFn();
	return reFn;
}
```