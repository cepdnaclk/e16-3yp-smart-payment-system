export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'World Play - KCC',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/notifier.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // When this enable user will redirect to /login
  router: {
    middleware: ['auth']
  },

  axios: {
    baseURL: 'http://127.0.0.1:3000/api'
  },

  // Running port and host
  server: {
    port: 8023, // default: 3000
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
        },
        // tokenRequired: true,
        tokenType: 'Bearer'
      }
    }
  },

  build: {
  },

  bootstrapVue: {
    // If you want all bundle of bootstrap components and directives
    componentPlugins: [

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
      'BVToastPlugin'

    ],
    directivePlugins: ['VBPopoverPlugin', 'VBTooltipPlugin', 'VBScrollspyPlugin'],
    /*,
    // Or if you want specific set of components and directives ::For optimizing purpouse
    directives: ['VBModal', 'VBPopover', 'VBTooltip', 'VBScrollspy']
    */

  },
}
