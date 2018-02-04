exports.config = {
  buildEs5: false,
  buildStats: true,
  bundles: [
    {
      /** Shared Components */
      components: [
        'app-form-text-input',
        'app-form-checkbox',
        'app-form-submit',
        'app-form',
        'app-icon',
        'app-link',
        'app-loader',
        'app-logo',
        'app-redirect',
        'app-rich-editor-content',
        'app-rich-editor-label',
        'app-rich-editor-menu-bar',
        'app-rich-editor-menu-item',
        'app-rich-editor',
        'app-route',
        'app-text-input',
        'app-translate'
      ]
    },
    {
      /** Main Components */
      components: [
        'app-load',
        'app-main',
        'app-splash'
      ]
    },
    {
      /**
       * Public Modules
       *
       * These should be placed separately from the main components.
       */
      components: [
        'app-login'
      ]
    },
    {
      /** Private Module */
      components: [
        'app-private-module',
        'app-header',
        'app-menu'
      ]
    },
    {
      /** Common Private Modules */
      components: [
        'app-dashboard'
      ]
    },
    {
      /** Projects Module */
      components: [
        'app-projects',
        'app-projects-list',
        'app-project-new',
        'app-project-view',
        'app-project-edit'
      ]
    }
  ],
  collections: [
    {
      name: '@stencil/router'
    },
    {
      name: '@stencil/redux'
    }
  ],
  emptyDist: false,
  emptyWWW: true,
  enableCache: true,
  generateDistribution: false,
  generateDocs: false,
  generateWWW: true,
  globalStyle: [
    'src/styles/animations.css',
    'src/styles/colors.css',
    'src/styles/fonts.css',
    'src/styles/reset.css',
    'src/styles/sizes.css',
    'src/styles/typography.css',
    'src/styles/z-index.css'
  ],
  hydratedCssClass: 'hydrated',
  logLevel: 'info',
  namespace: 'app',
  serviceWorker: {
    skipWaiting: true,
    clientsClaim: true,
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpeg,svg,woff2}'
    ],
    globIgnores: [
      'build/app/svg/*.js'
    ]
  },
  plugins: [
    require('./plugins/postcss')()
  ]
};

exports.devServer = {
  root: 'www',
  verbose: true,
  watchGlob: 'src/**/**',
  address: '0.0.0.0',
  httpPort: 3333,
  liveReloadPort: 35729
};
