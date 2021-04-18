---
title: "手把手教你使用conda来搞科研"
date: "2020-12-11 17:21:09"
label: "科研&conda"
---

与普通的python学习者不同，搞科研可能需要在许多不同的python环境下进行编码，因此我使用Anaconda3进行python的环境管理，一开始还不太会用，觉得很弱智，在学长指导一番后，发现用法和npm很像，很好上手。

# 准备
首先要先给conda换源，conda最好换清华的源。
然后给pip换源，因为conda底下很多包安装不了，需要用到pip，这里暂时先换成清华的源。

# 注意

在科研中常用的包有numpy、TensorFlow、Keras等，我发现豆瓣的源下载tf、keras很快很快，比清华源的速度不知道高多少，又快又稳定，因此在安装大型数据科学包时，建议使用豆瓣的镜像。

```bash
pip install --index-url https://pypi.douban.com/simple tensorflow
pip install --index-url https://pypi.douban.com/simple keras
```


# 安装Anaconda3
为什么不安装anacondamini？因为，在一开始使用的时候，很多东西都不太明白，虽然condamini更轻量化，但是对于刚入门使用的人来说，会有一定的压力

# conda常用命令
安装好Anaconda以后，就应该在anywhere执行conda命令了，初始会默认有一个base环境，可以把常用的包装在里面。

## 1. conda create -n \<name> python=<3.x>
这是一个最最常用的命令了，是用来创建一个环境。

- name指包名
- 3.x指python的版本

## 2. conda activate <name\>
进入指定的环境

## 3. conda install <name[=version]>
```bash
conda install keras=2.0
```
安装指定版本的包

## 4. conda list
查看当前环境有哪些包

## 5. conda info -e
查看有哪些环境？有时候会忘了自己的环境名

## 6. conda uninstall pkgname