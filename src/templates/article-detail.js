import React from 'react'
import Layout from '../components/Layout';
import {css} from '@emotion/react';
import styled from "@emotion/styled";
import Pill from '../components/Pill';
import {graphql} from 'gatsby';


export default function ArticleDetail({ data }) {
    const __html = data.markdownRemark?.html;
    const { title, label, date } = data.markdownRemark?.frontmatter;
    console.log(title);
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
      color: #6a737d66;
      font-size: 0.9em;
      text-align: center;
    `;
    
    const labels = label.split("&");
    return (
      <Layout>
        <h3>{title}</h3>
        <PillList>
          {labels.map((lb) => {
            return <Pill value={lb} key={lb} />;
          })}
        </PillList>
        <p css={datestyle}>{date}</p>
        <p css={headline}>· · ·  正文 · · ·</p>
        <section
          dangerouslySetInnerHTML={{ __html }}
          className="markdown-body"
        ></section>
      </Layout>
    );
}


export const query = graphql`
  query ArticlDetailQuery($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      html
      frontmatter {
        title
        label
        date
      }
    }
  }
`;