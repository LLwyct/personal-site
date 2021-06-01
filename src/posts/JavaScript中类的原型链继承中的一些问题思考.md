---
title: "JavaScript中类的原型链继承中的一些问题思考"
date: "2021-05-25 22:02:00"
label: "JavaScript&原型继承"
autonav: 1
---

- [1 继承](#1-继承)
  - [1.1 原型链继承](#11-原型链继承)
  - [1.2 构造继承](#12-构造继承)
  - [1.3 实例继承、拷贝继承](#13-实例继承拷贝继承)
  - [1.4 组合继承](#14-组合继承)
  - [1.5 寄生组合继承](#15-寄生组合继承)
- [2 instanceof](#2-instanceof)
- [3 isPrototypeOf](#3-isprototypeof)

# 1 继承

## 1.1 原型链继承

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
// 上面的部分是通用代码

function Cat() {}
Cat.prototype = new Animal();
let cat = new Cat("mimi");
cat.name = "mimi";
cat.eat("fish");
```

这是一段比较经典的原型链继承方法但是要注意，如果倒数第二行不主动再次声明`name`为mimi的话，会打印Animal eating fish，也就是说构造函数中的参数`name=mimi`，是没有用的。

在一篇比较权威的js教程中提到，尽量不要去覆盖函数的`prototype`属性，而是在其上做插入。比如上述代码第七行那样。如果直接覆盖会失去其原型中的`constructor`属性，因为即使是一个空函数，它也有它的 `prototype` 属性，而这个空函数的 `prototype` 就是一个只包含 `constructor` 的对象，这个 `constructor` 就是这个函数本身，即 `F.prototype.constructor === F` 返回真。

但是这里的原型链继承中，使用了这种覆盖的方法。经测试，`Cat.prototype.constructor === Animal`。这就比较能看出来问题了。我个人理解是，`F`的`prototype`是`animal`对象，而其上是没有`constructor`的，所以去`animal`的原型上找，而animal的原型上的`constructor`就是`Animal`函数。所以我还是比较不太喜欢这种方法的。

而且这种方法有一个致命的缺点，就是如果父类的属性是引用类型，由于将父类的实例置给了子类的原型，因此不同的子类实例会使用同一个原型，引用类型会共享，一个改动，其他跟着一起变。

## 1.2 构造继承

> 使用父类的构造函数来**增强**子类实例，等同于复制父类的实例给子类（没有用到原型）。

```js
function Cat(name) {
	Animal.call(this);
	this.name = name; 
}

let cat = new Cat("mimi");
cat.sleep()
// > mimi is sleeping
cat.eat("fish");
// > Uncaught TypeError: cat.eat is not a function
```

> 特点，可以实现多继承。
> 缺点：**只能继承父类实例的属性和方法，不能继承父类原型上的属性和方法**。每个子类都有父类实例函数的副本，影响性能。

核心代码是 `Animal.call(this)`，创建子类实例时调用父类构造函数，于是子类的每个实例都会将SuperType中的属性复制一份。

我的理解，这种方法实际上没有用到原型，因为这里是用的`Animal()`函数去执行。所以，相当于借用Animal去创建了一个cat实例，而cat对象是没有原型链的。因此 `cat.__proto__.__proto__ === Object.prototype`。否则，应该是 `cat.__proto__.__proto__ === Animal.prototype`。

## 1.3 实例继承、拷贝继承
不常用，略

## 1.4 组合继承
> 相当于原型链继承和构造继承的组合体。通过调用父类构造函数，继承父类的属性并保留传参的优点，然后将父类实例作为子类原型，实现函数复用。

```js
function Cat (name) {
	Animal.call(this);
	this.name = name || 'Tom';
}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat;
let cat = new Cat("mimi");
cat.sleep(); // mimi is sleeping
cat.eat("fish");// mimi eating fish
```

先说原型链继承，从名字就可以听出来，这种继承方法是有原型链在里面的，因此解决了构造继承中没有原型的问题，然后可以看到与构造继承相比，主动声明了Cat的原型，并且在原型链继承的基础上主动插入了被覆盖的构造函数constructor。

特点：可以继承实例属性/方法，也可以继承原型属性/方法。

缺点：

- 第一次调用new Animal()：给Animal.prototype写入属性name。
- 第二次调用new Cat("mimi")：给cat写入属性name。

实例对象cat上的属性就屏蔽了其原型对象Cat.prototype的同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法。

## 1.5 寄生组合继承

> 通过寄生方式，砍掉父类的实例属性，这样在调用两次父类的构造时就不会初始化两次实例方法/属性。

```js
function Cat (name) {
	Animal.call(this);
	this.name = name || 'Tom';
}

Cat.prototype = Object.create(Animal.prototype);

// Object.create's polyfill
let Super = function () {};
Super.prototype = Animal.prototype;
Cat.prototype = new Super();
//

Cat.prototype.constructor = Cat;

let cat = new Cat("mimi");
cat.sleep(); // mimi is sleeping
cat.eat("fish");// mimi eating fish
```

这是最成熟的方法，也是现在库实现的方法

可以看到这里用了一个空的函数在中间作为传递者，在组合继承中，子类Cat的原型就会创建一个Animal实例，由于Animal有可能内部有很多东西，那么就会需要很大内存，但其实这里是不需要的，因此这里使用一个空的函数作为中间传递者，这样创建cat实例的时候，就只需要一个空函数对象，节约了内存的。


# 2 instanceof

判断class的原型是否在obj的原型链上

```js
obj instanceof class
```
# 3 isPrototypeOf
从名字就可以看出来用于判断前者是否是后者的原型链上的原型

```js
Function.prototype.isPrototypeOf(obj)
Child.prototype.isPrototypeOf(child1)
Parent.prototype.isPrototypeOf(child1)
```