exports.config = {
  bundles: [
    {
      /** Icons Components */
      components: [
        'svg-icons',
        'svg-icon'
      ]
    },
    {
      /** Main Components */
      components: [
        'main-app',
        'connected-router'
      ]
    },
    {
      /** Routing Components */
      components: [
        'enhanced-route',
        'connected-link',
        'render-redirect'
      ]
    },
    {
      /** Translations Components */
      components: [
        'translate-string'
      ]
    },
    {
      /** Login Page */
      components: [
        'login-page'
      ]
    },
    {
      /** Dashboard Page */
      components: [
        'dashboard-page'
      ]
    },
    {
      /** Projects Page */
      components: [
        'projects-page',
        'list-projects',
        'new-project',
        'view-project',
        'edit-project'
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
    globPatterns: [
      '**/*.{js,css,json,html,ico,png,jpeg}'
    ],
    globIgnores: [
      'build/app/svg/*.js'
    ]
  },
  globalStyle: [
    'src/styles/reset.css',
    'src/styles/colors.css'
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
