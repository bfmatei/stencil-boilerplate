exports.config = {
  bundles: [
    {
      /** Shared Components */
      components: [
        'app-icon',
        'app-link',
        'app-loader',
        'app-route',
        'app-redirect',
        'app-text-input',
        'app-translate'
      ]
    },
    {
      /** Main Components */
      components: [
        'app-load',
        'app-main'
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
  globalStyle: [
    'src/styles/animations.css',
    'src/styles/colors.css',
    'src/styles/fonts.css',
    'src/styles/reset.css',
    'src/styles/sizes.css',
    'src/styles/z-index.css'
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
