import React from 'react';
import { graphql } from 'gatsby';
import Card from '../../components/Card';
import Layout from '../../components/Layout';


export default function index({data}) {
    const allArticles = data?.allMarkdownRemark?.nodes;
    return (
        <Layout>
            <div><h2>Article List <span role="img" aria-label="articles">📘</span></h2></div>
            <div>
                {
                    allArticles.map(article => {
                        return <Card
                            title={article.frontmatter.title}
                            key={article.id}
                            labelstr={article.frontmatter.label}
                            date={article.frontmatter.date}
                        />
                    })
                }
            </div>
        </Layout>
    )
}


export const allArticles = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      nodes {
        frontmatter {
          date
          label
          title
        }
        id
      }
    }
  }
`;