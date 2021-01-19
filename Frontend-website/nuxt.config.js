
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: 'Smart-Payment-System' || process.env.npm_package_name ,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/notifier.js'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'bootstrap-vue/nuxt',
    
  ],

  // bootstrap-vue components used for this project
  bootstrapVue: {
    componentPlugins: [
      'Navbar',

      'FormSelectPlugin',

      'CardPlugin',

      'LayoutPlugin',
      'NavPlugin',
      'NavbarPlugin',

      'IconsPlugin',

      'FormGroupPlugin',
      'FormPlugin',
      'FormCheckboxPlugin',
      'FormInputPlugin',
      'FormRadioPlugin',

      'ToastPlugin',
      'TabsPlugin',
      'ModalPlugin',

      'MediaPlugin',

      'ButtonGroupPlugin',
      'ButtonPlugin',
      'ButtonToolbarPlugin',

      'AlertPlugin',
      'BadgePlugin',
      'CarouselPlugin',
      'CollapsePlugin',
      'DropdownPlugin',
      'ListGroupPlugin',
      'PopoverPlugin',
      'BVToastPlugin',
      'EmbedPlugin'
    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin']
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: 'http://127.0.0.1:3000/api'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    extend (config, ctx) {
    }
  },

  // Running port and host
  server: {
    port: 8001, // default: 3000
    host: '0.0.0.0' // default: localhost
  },

 // Nuxt authentication configuration to ensure user 
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'token' },
          user: { url: '/user', method: 'get', propertyName: 'user' },
          logout: { url: '/logout', method: 'delete' }
          // logout: false
        },
        // tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },
}
