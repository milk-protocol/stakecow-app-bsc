
export default {
  mode: 'spa',
  head: {
    title: "StakeCow.com - First yield farm on Binance Smart Chain.",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Let's get milked" },
      { hid: 'keywords', name: 'keywords', content: 'Dapp, DeFi, Staking, Token, MILK' },
      { name: 'twitter:title', content: 'StakeCow.com' },
      { name: 'twitter:description', content: "Let's get milked" },
      { name: 'twitter:image', content: '/cow.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@StakeCow' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/cow.png' },
      { rel: 'shortcut icon', href: '/cow.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap-vue/dist/bootstrap-vue.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/bootstrap_vue',
    '@/plugins/i18n_vue',
    '@/plugins/web3_utils',
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
