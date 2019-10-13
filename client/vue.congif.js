// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module.rule('eslint').use('eslint-loader').options({
      fix: true,
    });
  },
  devServer: {
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
