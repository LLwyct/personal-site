import React from "react"
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { css } from "@emotion/react";
import Card from '../components/Card';

export default function Home({ data }) {

    const lastedArticles = data?.allMarkdownRemark?.nodes;
    const selfintro = css`
        text-align: center;
        height: 400px;
        display: flex;
        align-items: center;
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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias minima culpa ratione dolores incidunt ipsam mollitia? Aperiam quasi nisi dignissimos? Amet quod quos quas eaque ipsa non molestiae quo rerum quidem! Repellendus saepe a, ab alias ipsum minima, obcaecati aliquam neque pariatur delectus tempore libero!
            </section>
            <section>
                <div css={articlelist_header}>
                    <h2 style={{}}> <span role="img" aria-label="here">🎈</span> Latest Article</h2>
                    <p style={{ fontWeight: 400 }}> <Link to="/"> READ MORE</Link></p>
                </div>
                <div>
                    {
                        lastedArticles.map(article => {
                            return <Card 
                                title={article.frontmatter.title}
                                key={article.id}
                                labelstr={article.frontmatter.label}
                                date={article.frontmatter.date}
                            />
                        })
                    }
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query MyQuery {
        allMarkdownRemark {
            nodes {
                frontmatter {
                    title
                    date
                    label
                }
                id
            }
        }
    }
`;