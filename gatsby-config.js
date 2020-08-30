module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL:
          process.env.STRAPI_URL || `https://japanese-cms.danielnoon.info`,
        queryLimit: 1000,
        contentTypes: [`flashcard-deck`, `page`],
      },
    },
    // `gatsby-plugin-transition-link`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Japanese 101 Resources`,
        short_name: `JPResources`,
        start_url: `/`,
        background_color: `#d92a51`,
        theme_color: `#3b184b`,
        display: `standalone`,
        icon: `src/images/logo/logo.png`,
        icons: [
          {
            src: "icons/icon-512x512.png",
            purpose: "maskable",
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
