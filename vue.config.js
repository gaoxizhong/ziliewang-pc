const Version = new Date().getTime();
const webpack = require("webpack");
const defaultSettings = require('./src/settings.js');
const scssVariables = require('./src/styles/variables.scss.js'); // 引入全局scss
const name = defaultSettings.title || 'ziliewang vue-cli'; // page title


// const context = process.env.VUE_APP_BASE_API;
module.exports = {
  // transpileDependencies: true,
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
    port: 8088,  // 开发端口
    open: true, // 编译完自动打开页面
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api': {
        target: 'http://59.110.24.172:8997/',
        ws: true,
        changeOrigin: true, //是否跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      },

    }
  },
  configureWebpack: {
    name: name, // 页面标题
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `static/js/[name].${Version}.js`,
      chunkFilename: `static/js/[name].${Version}.js`
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(scssVariables)
          .map(k => `\$${k.replace('_', '-')}: ${scssVariables[k]};`)
          .join('\n')
      }
    },
    // 是否使用css分离插件 ExtractTextPlugin
    extract: {
      // 修改打包后css文件名
      filename: `static/css/[name].${Version}.css`,
      chunkFilename: `static/css/[name].${Version}.css`
    }
  },

  chainWebpack(config) {
		// img的文件名修改
	    config.module
	      .rule('images')
	      .use('url-loader')
	      .tap(options => {
	        options.name = `static/img/[name].${Version}.[ext]`
	        options.fallback = {
	          loader: 'file-loader',
	          options: {
	            name: `static/img/[name].${Version}.[ext]`
	          }
	        }
	        return options
	      })
	}

};
