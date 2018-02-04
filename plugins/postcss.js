module.exports = function (config) {
  const postcss = require('postcss')(config.plugins);

  return {
    name: 'postcss-loader',
    usePlugin(id) {
      return /(.css|.pcss)$/i.test(id);
    },
    async transform(sourceText, id, context) {
      if (!this.usePlugin(id)) {
        return null;
      }

      const renderOpts = Object.assign({}, config.options || {});

      renderOpts.data = sourceText;

      const results = {};

      const pathParts = id.split('.');
      pathParts.pop();
      pathParts.push('css');
      results.to = pathParts.join('.');

      if (sourceText.trim() === '') {
        results.code = '';

        return results;
      }

      const cacheKey = context.cache.createKey(this.name, renderOpts);
      const cachedContent = await context.cache.get(cacheKey);

      if (cachedContent != null) {
        results.code = cachedContent;

        return results;
      }

      results.code = await new Promise((resolve) => {
        postcss
          .process(sourceText, {
            from: id,
            to: results.id
          })
          .then(async (data) => {
            const css = data.css;

            await context.fs.writeFile(results.id, css, { inMemoryOnly: true });

            resolve(css);
          })
          .catch((err) => {
            resolve(`/**  postcss error${err && err.message ? ': ' + err.message : ''}  **/`);
          });
      });

      await context.cache.put(cacheKey, results.code);

      return results;
    }
  };
}
