---
title: "我的Gatsby学习记录"
date: "2020-01-06 15:31:17"
label: "react&gatsby"
---

- [安装gatsby](#安装gatsby)
  - [创建全局css样式](#创建全局css样式)
- [part 4 Gatsby中的数据](#part-4-gatsby中的数据)
- [part 5 Source Plugins and Rendering Queried Data](#part-5-source-plugins-and-rendering-queried-data)
  - [5.1 什么是Graphiql](#51-什么是graphiql)
  - [5.2 源插件](#52-源插件)
  - [5.3 用Graphql的查询构建一个文件系统页面](#53-用graphql的查询构建一个文件系统页面)
- [part 6 transformer plugin转换插件](#part-6-transformer-plugin转换插件)
  - [6.1 这部分将讲述什么？](#61-这部分将讲述什么)
  - [6.2 转换插件transformer plugins](#62-转换插件transformer-plugins)
  - [6.3 Create a list of your site’s markdown files in](#63-create-a-list-of-your-sites-markdown-files-in)

这里附上我的一个gatsby的项目，是我看完文档以后，自己又写了一遍搭起来的：https://github.com/liwenchi123000/react-learning/tree/master/my-gatsby-site

# 安装gatsby
我一般会顺手安装一个emotion，真的好用。
```
cnpm install -g gatsby-cli
gatsby new <project-name> <starter>
gatsby new emotion-tutorial https://github.com/gatsbyjs/gatsby-starter-hello-world
cd <project-name>
cnpm i --save gatsby-plugin-emotion @emotion/react @emotion/styled
```
一般情况我只用@emotion/react，别忘了在config中添加插件
```js
module.exports = {
  plugins: [`gatsby-plugin-emotion`],
}
```
## 创建全局css样式
在根目录下创建`gatsby-browser.js`
```js
// gatsby-browser.js
import "./src/styles/global.css"
// or:
// require('./src/styles/global.css')
```

# part 4 Gatsby中的数据
这里介绍了**Graphql**，以及在**Gatsby**中它的两种使用方式

 1. 第一种**Page Query**：

```js
// src/pages/about.js
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => (
  <Layout>
    <h1>About {data.site.siteMetadata.title}</h1>
    <p>
      We're the only site running on your computer dedicated to showing the best
      photos and videos of pandas eating lots of food.
    </p>
  </Layout>
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
```
这种方式只能在页面级的文件中使用

 2. 第二种**StaticQuery**

```javascript
import React from "react"
import { css } from "@emotion/core"
import { useStaticQuery, Link, graphql } from "gatsby"

import { rhythm } from "../utils/typography"
export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
  	...
    <h1>{data.site.siteMetadata.title}</h1>
  )
}
```
这种方法适合在组件级的页面上使用
# part 5 Source Plugins and Rendering Queried Data
## 5.1 什么是Graphiql
在开启Gatsby服务之后可以在浏览器中输入 http://localhost:8000/___graphql 。Graphiql是一个Graphql的集成开发环境，你可做一些查询。
## 5.2 源插件
**网站中的数据可以来自任何地方: APIs, 数据库, CMSs, local files, etc.** 

**如果你想从特定的源头拉去数据，那么你就要安装对应的源插件（source plugin）。例如，文件系统源插件知道如何从文件系统拉取数据，WordPress插件知道如何从WordPress API拉取数据。**

接下来以文件系统源插件举例，看看它是如何工作的。

```bash
npm install --save gatsby-source-filesystem
```
编辑gatsby-config.js

```javascript
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    ...
  ],
}
```
接下来只要在左侧选择对应的项，就可以自动生成查询语句，以及右侧的查询结果。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106151242611.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)
## 5.3 用Graphql的查询构建一个文件系统页面
新建一个src/pages/my-files.js

```javascript
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>My Site's Files</h1>
        <table>
          <thead>
            <tr>
              <th>relativePath</th>
              <th>prettySize</th>
              <th>extension</th>
              <th>birthTime</th>
            </tr>
          </thead>
          <tbody>
            {data.allFile.edges.map(({ node }, index) => (
              <tr key={index}>
                <td>{node.relativePath}</td>
                <td>{node.prettySize}</td>
                <td>{node.extension}</td>
                <td>{node.birthTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          relativePath
          prettySize
          extension
          birthTime(fromNow: true)
        }
      }
    }
  }
`
```
先用Graphiql看一下查询结果

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106152848684.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)

在打开对应的页面http://localhost:8000/my-files/

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106152920868.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)

大功告成！

# part 6 transformer plugin转换插件

## 6.1 这部分将讲述什么？

在先前的章节中，我们介绍了如何用源插从某些数据源拉取数据，例如我们详细介绍了，如何利用文件插件来获得本地的文件的信息，但是我们获得的是文件本身的信息，那么我们如何获得文件原始内容的信息呢？以及获得原始内容之后，如何转换成我们想要的、便于我们使用的数据形式呢？

## 6.2 转换插件transformer plugins

接下来，我们会用我们经常用到的一种文件形式举例——markdown。

**第一步**

先在创建一个src/pages/sweet-pandas-eating-sweets.md
我们甚至可以在上一部分的文件页面看到我们创建的文件：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106154218582.png)

**第二步**
安装 *gatsby-transformer-remark*
```bash
npm install --save gatsby-transformer-remark
```

**第三步**
编辑 *gatsby-config.js*

```javascript
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
```
**第三步**
在Graphiql看一下效果，记得这里要重启服务

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106155120289.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)

## 6.3 Create a list of your site’s markdown files in

更改src/pages/index.js文件

```javascript
import React from "react"
import { graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
            border-bottom: 1px solid;
          `}
        >
          Amazing Pandas Eating Things
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              css={css`
                margin-bottom: ${rhythm(1 / 4)};
              `}
            >
              {node.frontmatter.title}{" "}
              <span
                css={css`
                  color: #bbb;
                `}
              >
                — {node.frontmatter.date}
              </span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
         query {
           allMarkdownRemark(
             sort: { fields: [frontmatter___date], order: DESC }
           ) {
             totalCount
             edges {
               node {
                 id
                 frontmatter {
                   title
                   date(formatString: "DD MMMM, YYYY")
                 }
                 excerpt
               }
             }
           }
         }
       `
```
效果如图：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200106160238859.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3N3YWxsb3dibGFuaw==,size_16,color_FFFFFF,t_70)