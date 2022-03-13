module.exports = {
    css: {
      loaderOptions: {
        sass: {
            prependData : `@import "@/sass/abstracts/_variables.scss";`
        }
      }
    }
  };