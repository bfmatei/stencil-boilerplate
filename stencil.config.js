exports.config = {
  buildEs5: false,
  buildStats: true,
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
    require('./plugins/postcss')({
      plugins: [
        require('postcss-import')({
          skipDuplicates: true,
          path: [
            'src/styles/'
          ]
        }),
        require('postcss-url')(),
        require('postcss-cssnext')(),
        require('postcss-reporter')()
      ]
    })
  ]
};

exports.devServer = {
  root: 'www',
  address: '0.0.0.0',
  httpPort: 3333,
  liveReloadPort: 35729
};
