const { resolve } = require("path")
const pkg = require("./package")

const baseURL =
  process.env.NODE_ENV == "production"
    ? "https://data.hugsnan.ml"
    : "http://localhost:3000"
const storagePath =
  process.env.NODE_ENV == "production"
    ? "/root/filesharing/hugsnan"
    : resolve(__dirname, "./storage")

module.exports = {
  /*
  Krist Custom
  */
  storagePath,
  env: {
    baseURL
  },

  mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [resolve(__dirname, "./assets/scss/github-markdown.css")],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: resolve(__dirname, "./plugins/vue-mavon-editor"), ssr: false },
    resolve(__dirname, "./plugins/vue-moment"),
    resolve(__dirname, "./plugins/vue-fortawesome"),
    resolve(__dirname, "./plugins/vue-buefy")
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    // Doc: https://buefy.github.io/#/documentation
    "nuxt-buefy",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources"
  ],
  styleResources: {
    scss: [resolve(__dirname, "assets/scss/main.scss")]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    proxy: true
    // baseURL
    // See https://github.com/nuxt-community/axios-module#options
  },
  watch: ["pages/**"],
  mongo: {
    host: "localhost",
    port: 27017,
    db: "hugsnan",
    authSource: "admin",
    max: 100,
    min: 1,
    acquireTimeoutMillis: 10000,
    idleTimeoutMillis: 30000
  },
  buildDir: resolve(__dirname, "dist-frontend"),
  // buildDir: resolve(__dirname, "dist-frontend"),
  /*
   ** Build configuration
   */
  build: {
    transpile: ["es2015"],
    babel: {
      babelrc: true
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    }
  }
}
