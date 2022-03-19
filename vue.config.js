module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      scss: {
        data : `@import "~@/sass/variables.scss";`
      }
    }
  }

 
};
