import React from 'react'
import Layout from '../components/Layout';
import { css } from '@emotion/react';
import styled from "@emotion/styled";
import Pill from '../components/Pill';
import { graphql } from 'gatsby';
import "katex/dist/katex.min.css";

function searchHeader(body, headerList) {
  if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(body.tagName)) {
    headerList.push(body)
    return;
  }
  if (body.children.length !== 0) {
    for (let node of body.children) {
      searchHeader(node, headerList);
    }
  }
  return;
}

export default function ArticleDetail({ data }) {

  const { title, label, date, autonav } = data.markdownRemark?.frontmatter;
  const __html = data.markdownRemark?.html;
  const timeToRead = data.markdownRemark?.timeToRead;
  const labels = label.split("&");
  

  // 模拟的是Didmounted
  React.useEffect(() => {
    if (!autonav) return;
    const headerList = [];
    const markdownBody = document.querySelector(".markdown-body");
    const markdownNavLinkContent = document.querySelector(".markdown-body ul:first-child");
    let markdownNavLinks = markdownNavLinkContent.querySelectorAll('a');
    searchHeader(markdownBody, headerList);
    if (markdownNavLinks.length <= headerList.length) {
      for (let i = 0; i < markdownNavLinks.length; ++i) {
        headerList[i].setAttribute('id', markdownNavLinks[i].getAttribute('href').slice(1));
      }
    }
  }, []);

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }

  return (
    <Layout>
      <script
        src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"
        async
      ></script>
      <h3>{title}</h3>
      <PillList>
        {labels.map((lb) => {
          return <Pill value={lb} key={lb} />;
        })}
      </PillList>
      <p css={datestyle}>
        <span>{date}</span>
        <span style={{marginLeft: "2rem"}}>阅读量: {timeToRead}</span>
      </p>
      <p css={headline}>· · · 正文 · · ·</p>
      <div>
        <section
          dangerouslySetInnerHTML={{ __html }}
          className="markdown-body"
        ></section>
      </div>
      <div css={fixedScroller} onClick={scrollToTop}>
        TOP
      </div>
    </Layout>
  );
}

const datestyle = css`
  color: grey;
  font-size: 0.8em;
  margin: 1em 0;
`;

const PillList = styled.div`
  div + div {
    margin-left: 15px;
  }
`;

const headline = css`
  color: #6a737d;
  font-size: 0.9em;
  text-align: center;
`;

const fixedScroller = css`
  width: 3em;
  height: 3em;
  border-radius: 10px;
  cursor: pointer;
  position: fixed;
  bottom: 5em;
  right: 5em;
  background: var(--Suspension-bg-color);
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 640px) {
    & {
      bottom: 2em;
      right: 2em;
    }
  }
`;

export const query = graphql`
  query ArticlDetailQuery($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        label
        date
        autonav
      }
      timeToRead
    }
  }
`;