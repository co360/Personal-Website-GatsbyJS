
const {
    NODE_ENV,
    URL: NETLIFY_SITE_URL = 'https://www.rodneymcquain.com',
    DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
    CONTEXT: NETLIFY_ENV = NODE_ENV
} = process.env;
const isNetlifyProduction = NETLIFY_ENV === 'production';
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL;

module.exports = {
    siteMetadata: {
        title: `Rodney McQuain`,
        description: `Computer science student, software engineer, and competitive Super Smash Bros. Melee player.`,
        author: `Rodney McQuain`,
        siteUrl: siteUrl,
        image: `code.jpg`,
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-transformer-remark`,
        `gatsby-plugin-react-helmet`,
        `gatsby-transformer-json`,
        `gatsby-plugin-catch-links`,
        `gatsby-plugin-typescript`,
        `gatsby-plugin-tslint`,
        `gatsby-plugin-netlify`,
        {
            resolve: `gatsby-plugin-sass`,
            postCssPlugins: [
                require(`postcss-preset-env`)({ stage: 2 }),
            ],
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Rodney McQuain: Personal Site`,
                short_name: `Rodney McQuain`,
                start_url: `/`,
                background_color: `#222`,
                theme_color: `#222`,
                display: `standalone`,
                icon: `src/assets/svg/round-square-logo.svg`,
            }
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [
                    `*/blog-posts/*`
                ]
            }
        },
        `gatsby-plugin-sitemap`,
        {
            resolve: `gatsby-plugin-robots-txt`,
            options: {
                resolveEnv: () => NETLIFY_ENV,
                env: {
                    production: {
                        policy: [{ userAgent: '*' }]
                    },
                    'branch-deploy': {
                        policy: [{ userAgent: '*', disallow: ['/'] }],
                        sitemap: null,
                        host: null
                    },
                    'deploy-preview': {
                        policy: [{ userAgent: '*', disallow: ['/'] }],
                        sitemap: null,
                        host: null
                    },
                },
            },
        },
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: "UA-155137763-1",
                head: true,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/data`,
                name: `data`
            },
        },
        { 
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/src/pages`,
                name: `pages`,
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    `gatsby-remark-autolink-headers`,
                    `gatsby-remark-prismjs`,
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 1200,
                        },
                    },
                    {
                        resolve: `gatsby-remark-copy-linked-files`,
                        options: {
                            ignoreFileExtensions: [`png`, `jpg`, `jpeg`],
                        },
                    },
                ],
            },
        },
    ],
}
