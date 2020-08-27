exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    {
      allStrapiPage {
        nodes {
          type
          index
          slug
        }
      }
    }
  `);

  data.allStrapiPage.nodes
    .slice()
    .sort((n1, n2) => n2.index - n1.index)
    .forEach((node, i) => {
      node.index = i;
      if (node.type === "content") {
        actions.createPage({
          path: node.slug,
          component: require.resolve("./src/templates/content-page.tsx"),
          context: {
            slug: node.slug,
          },
        });
      } else if (node.type === "cards") {
        actions.createPage({
          path: node.slug,
          component: require.resolve("./src/templates/deck-page.tsx"),
          context: {
            slug: node.slug,
          },
        });
      }
    });
};
