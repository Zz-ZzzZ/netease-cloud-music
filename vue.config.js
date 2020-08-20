module.exports = {
  productionSourceMap: false,
  // global scss
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/style/mixin.scss";
          @import "@/style/variable.scss";
        `
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000/",
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          // 重写路径
          "^/api": ""
        }
      }
    }
  }
};
