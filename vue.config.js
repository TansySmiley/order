const { VantResolver } = require('@vant/auto-import-resolver');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');

module.exports = {
  
};

module.exports = {
    //不检测
    lintOnSave: false,
    css: {
   
      loaderOptions: {
   
        postcss: {
   
          plugins: [
   
            require('postcss-pxtorem')({ rootValue: 37.5 , propList: ['*']}),
  
          ],
  
        },
   
      },
  
    },
    configureWebpack: {
        plugins: [
          //当 unplugin-vue-components 版本大于等于 0.26.0 时，使用以下写法
          AutoImport.default({ resolvers: [VantResolver()] }),
          Components.default({ resolvers: [VantResolver()] }),
        ],
      },
  
  };