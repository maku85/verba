export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s',
    title: 'Verba',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Raccolta di termini inconsueti della lingua italiana',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: ['@/assets/scss/theme.scss'],
  scss: { indentedSyntax: true },

  plugins: ['~/plugins/vue-masonry.js'],

  components: true,

  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

  modules: ['@nuxt/content', '@nuxtjs/pwa'],

  content: { fullTextSearchFields: ['word', 'meaning'] },

  pwa: {
    manifest: {
      name: 'Verba',
      lang: 'it',
      useWebmanifestExtension: false,
      theme_color: '#e6ecee',
    },
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: { disable: true },
  },

  build: {},

  router: {
    base: '/verba/',
  },
}
