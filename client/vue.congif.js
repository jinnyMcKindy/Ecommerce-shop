// vue.config.js
module.exports = {
  //assetsDir: process.env.NODE_ENV === 'production' ? '/Ecommerce-shop/' : '',
  devServer: {
    port: 8080,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
};
