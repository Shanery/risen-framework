// User Variables
const publicPath = "/"

const path = require('path');

let entry_point = process.env.ENTRY_POINT;
let entry_points = {
  index: {
    entry: './src/main.ts',
    template: './public/index.html',
  },
  docs: {
    entry: './src/docs/docs.ts',
    template: './public/docs.html',
  },
};
let pages;

// Set Pages as single entry point
if (entry_point && (entry_point = entry_point.split(' '))) {
  pages = {};
  entry_point.forEach((point) => {
    if (entry_point.length == 1) {
      pages.index = entry_points[point];
    } else {
      pages[point] = entry_points[point];
    }
  });
}
// Build All pages
else {
  pages = entry_points;
}

module.exports = {
  // Base URL
  publicPath: process.env.NODE_ENV === 'production' ?
    publicPath : '/',

  pages,


  // Remove Vendor
  chainWebpack: config => {

    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']

    function addStyleResource(rule) {
      rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [
            path.resolve(__dirname, './src/styles/common.styl'),
          ],
        })
    }
    
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },

  filenameHashing: true,

  lintOnSave: true,
}
