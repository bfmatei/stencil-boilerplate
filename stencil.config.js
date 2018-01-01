exports.config = {
  bundles: [
    {
      components: [
        'main-app',
        'connected-router'
      ]
    },
    {
      components: [
        'enhanced-route',
        'connected-link',
        'render-redirect'
      ]
    },
    {
      components: [
        'login-page'
      ]
    },
    {
      components: [
        'dashboard-page'
      ]
    },
    {
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
