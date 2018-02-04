module.exports = function () {
  const postcss = require('postcss')([
    require('postcss-import')({
      skipDuplicates: true,
      path: [
        'src/styles/'
      ]
    }),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    require('postcss-reporter')()
  ]);

  return {
    name: 'postcss-loader',
    transform(sourceText, importee) {
      if (importee.indexOf('.pcss') !== -1) {
        const promise = new Promise((resolve) => {
          postcss
            .process(sourceText, {
              from: importee
            })
            .then((data) => {
              resolve(data.css);
            })
        });

        return promise;
      } else {
        return Promise.resolve({
          code: sourceText
        });
      }
    }
  };
}
