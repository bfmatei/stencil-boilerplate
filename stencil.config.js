exports.config = {
  buildEs5: true,
  buildStats: true,
  enableCache: false,
  generateDocs: false,
  hydratedCssClass: 'hydrated',
  logLevel: 'info',
  namespace: 'app',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        skipWaiting: true,
        clientsClaim: true,
        globPatterns: [
          '**/*.{js,css,json,html,ico,png,jpeg,svg,woff2}'
        ],
        globIgnores: [
          'build/app/svg/*.js'
        ]
      }
    }
  ],
  plugins: [
    require('@stencil/postcss')({
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
