---
title: "从简入繁实现一个Promise"
date: "2021-05-11 21:20:43"
label: "Javascript&ES6&手写实现"
---

从简入繁实现一个Promise, [Reference from zhihu](https://zhuanlan.zhihu.com/p/183801144)

- [1 构建一个简单的Promise类](#1-构建一个简单的promise类)
  - [1.1 测试fulfilled](#11-测试fulfilled)
  - [1.2 测试rejected](#12-测试rejected)
- [2 进一步修改Promise，以使其支持异步操作](#2-进一步修改promise以使其支持异步操作)

# 1 构建一个简单的Promise类

```js
// 定义三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promiss {
	// 构造函数传入的是一个函数executor
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 当成功时调用此方法
        let resolve = value => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
            }
        }

        // 当失败时调用此方法
        let reject = error => {
            if (this.status === PENDING) {
                this.reason = error;
                this.status = REJECTED;
            }
        }

        try {
        	// 把resolve和reject函数传入executor以便分别在适当的场合调用
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }
	
	// then是promise最重要的函数
	// then接收两个参数，分别是fulfilled状态和rejeted状态执行的函数
    then (onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}
```

## 1.1 测试fulfilled
```js
let p = new Promiss((resolve, reject) => {
    resolve(1);
}).then(
    data => {
        console.log('ok!', data);
    },
    err => {
        console.log('oops! something error happend', err);
    }
);
```

控制台打印 `ok! 1`

## 1.2 测试rejected
```js
let p = new Promiss((resolve, reject) => {
    const a = 1;
    a = 0;
}).then(
    data => {
        console.log('ok!', data);
    },
    err => {
        console.log('oops! something error happend', err);
    }
);
```

控制台打印

```
oops! something error happend TypeError: Assignment to constant variable.
    at C:\Users\******\Promise.js:46:7
    ...
```

但其实这只是完成了同步代码的Promise，试一个异步操作。把executor中的代码换成一个计时器：

```js
setTimeout(() => {
    resolve(2000);
}, 2000);
```

并且给then函数添加else分支：

```js
then (onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status === REJECTED) {
            onRejected(this.reason);
        } else {
            console.log('status not change!');
        }
    }
```

这时候会立刻执行 `console.log('status not change!');` ，说明此时状态还没有发生改变而 `then` 就已经执行了。

所以如果当调用 `then` 方法时，当前状态是 `pending` ，我们需要先将成功和失败的回调分别存放起来，在 `executor()` 的异步任务被执行时，触发 `resolve` 或 `reject` ，依次调用成功或失败的回调。

# 2 进一步修改Promise，以使其支持异步操作

```javascript
// 定义三种状态
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promiss {
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        // 当成功时调用此方法
        let resolve = value => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = FULFILLED;
                // 当调用了这个方法后，去执行callback队列的函数
                this._onResolveCallbackQueue.forEach(fn => fn());
            }
        }

        // 当失败时调用此方法
        let reject = error => {
            if (this.status === PENDING) {
                this.reason = error;
                this.status = REJECTED;
                // 当调用了这个方法后，去执行callback队列的函数
                this._onRejectedCallbackQueue.forEach(fn => fn());
            }
        }
        // 新增这里，添加两个队列
        this._onResolveCallbackQueue = [];
        this._onRejectedCallbackQueue = [];
        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then (onFulfilled, onRejected) {
        if (this.status === PENDING) {
       		// 当当前的状态为PENDING时，说明executor中的异步操作还没有返回结果，因此先把函数执行包装成函数，放入队列中，等异步操作结束后再回来执行。
            this._onResolveCallbackQueue.push(() => {
                onFulfilled(this.value);
            });
            this._onRejectedCallbackQueue.push(() => {
                onRejected(this.reason);
            });
        }
        else if (this.status === FULFILLED) {
            onFulfilled(this.value);
        } else if (this.status === REJECTED) {
            onRejected(this.reason);
        }
    }
}
```
