const { defineConfig } = require("@vue/cli-service");
const Version = new Date().getTime();
const webpack = require("webpack");
const context = process.env.VUE_APP_BASE_API

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  //配置 运行和打包时的文件路径
  publicPath: './',
  outputDir:'dist',
  // 放置生成的静态资源 (js、css、img、fonts)的目录，资源放的目录 。 (相对于 outputDir)
  assetsDir: "static",
  // 指定生成的 index.html 的输出路径，也可以是一个绝对路径。index的路劲和名字 (相对于 outputDir 的)
  indexPath: 'index.html',
  productionSourceMap: false,
  devServer: {
    proxy: {
      [context]: {
        target: 'http://182.43.50.128:8081/',
        ws: true,
        changeOrigin: true, //是否跨域
      },

    }
  }
});
