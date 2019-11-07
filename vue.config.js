module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/sass/_variables.sass"; @import "@/assets/sass/_mixins.sass";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/toggler_v2/'
    : '/'
};
