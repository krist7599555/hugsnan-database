const pkg = require("./package");
const resolve = require("path").resolve;

export default {
  mode: "universal",
  // mode: "spa",
  srcDir: __dirname,
  rootDir: __dirname,
  modulesDir: resolve(__dirname, "node_modules"),
  server: {
    port: 3000, // default: 3000
    host: "0.0.0.0", // default: localhost,
    timing: false
  },
  transition: {
    name: "fade",
    mode: "out-in"
  },
  layoutTransition: {
    name: "layout",
    mode: "out-in"
  },
  storagePath: resolve(__dirname, "./storage"),
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
  dev: process.env.NODE_ENV !== "production",
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
    // {
    // src: "./plugins/vue-mavon-editor.ts",
    //   srr: false
    // }
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
    "@nuxtjs/style-resources",
    "@nuxtjs/proxy"
  ],
  styleResources: {
    scss: [resolve(__dirname, "assets/scss/main.scss")]
  },
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  // buefy: { css: false, materialDesignIcons: false },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    analyze: false,
    cache: true,
    devtools: true,
    extractCSS: true,
    loaders: {
      ts: {
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      }
    },
    parallel: true,
    hardSource: true,
    // or

    extend(config, ctx) {}
  },
  watch: ["server/**", "pages/**", "**.ts"],
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
  proxy: {
    "/api": "http://localhost:3001",
    ws: true
  }
};