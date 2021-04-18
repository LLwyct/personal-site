const path = require('path');

exports.createPages = async ({graphql, actions}) => {
    const { data } = await graphql(`
      query {
        allMarkdownRemark {
          nodes {
            frontmatter {
              title
            }
          }
        }
      }
    `);

    data.allMarkdownRemark.nodes.forEach(node => {
        actions.createPage({
            path: "/articles/" + node.frontmatter.title,
            component: path.resolve('./src/templates/article-detail.js'),
            context: {title: node.frontmatter.title}
        });
    });
}