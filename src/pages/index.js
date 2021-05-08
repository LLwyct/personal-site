import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { css } from "@emotion/react";
import Card from '../components/Card';

export default function Home({ data }) {

    const lastedArticles = data?.allMarkdownRemark?.nodes;
    const selfintro = css`
      text-align: center;
      padding: 6em 0;
      display: flex;
      align-items: center;
      justify-content: center;
      @media only screen and (max-width: 640px) {
        & {
          padding: 3em 0;
        }
      }
    `;

    const articlelist_header = css`
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        p {
            text-decoration: underline;
        }
    `;

    return (
      <Layout>
          <section css={selfintro}>
        Hello, this is my blog, welcome to visit. I am currently a graduate student in computer science. I will share my learning and work experience here, and occasionally talk about my daily life and share my mood in life.
          </section>
          <section>
              <div css={articlelist_header}>
                  <h2 style={{}}> <span role="img" aria-label="here">🎈</span> Latest Article</h2>
                  <p style={{ fontWeight: 400 }}> <Link to="/articles"> READ MORE</Link></p>
              </div>
              <div>
                  {
                      lastedArticles.map(article => {
                          return (
                            <Card
                              title={article.frontmatter.title}
                              key={article.id}
                              labelstr={article.frontmatter.label}
                              date={article.frontmatter.date}
                              excerpt={article.excerpt}
                              timeToRead={article.timeToRead}
                            />
                          );
                      })
                  }
              </div>
          </section>
      </Layout>
    )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 5
    ) {
      nodes {
        excerpt(pruneLength: 120)
        frontmatter {
          date
          label
          title
        }
        timeToRead
        id
      }
    }
  }
`;