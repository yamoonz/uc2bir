module.exports = {
  siteMetadata: {
    title: `Dinamik Otomotiv`,
    description: `Dinamik Otomotiv B2B`,
    siteUrl: `https://b2b-dinamik-oto-v2.azurewebsites.net/`,
  },
  plugins: [
    `gatsby-transformer-json`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-zopfli',
      options: {
        extensions: ['css', 'html', 'js', 'svg'],
        compression: {
          numiterations: 25
        }
      }
    },
    /*
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`100`,`300`,`400`,`500`,`700`, `900`]
          },
        ],
      },
    },
    */
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/data/`,
        name: `data`,
        typeName: ({ node, object, isArray }) => object.level,
      },
    },
    {
      resolve: 'gatsby-plugin-svgr',
      options: {
        svgoConfig: {
          pretty: true,
          multipass: true,
          plugins: [
            { removeViewBox: false },
            { removeAttrs: { attrs: '(width|height)' } },
          ],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images_background`,
        path: `${__dirname}/src/statics/background/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Dinamik Oto`,
        short_name: `Dinamik OTO`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#02aab0`,
        display: `standalone`,
        icon: 'src/images/favicon.png',
      },
    },
  ],
};