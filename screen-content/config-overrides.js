  
const { name } = require('./package.json');

// const {
//   setWebpackPublicPath
// } = require('customize-cra')

module.exports = {
  webpack: function override(config, env) {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    config.output.jsonpFunction = `webpackJsonp_${name}`;
    // config.override.p
    // setWebpackPublicPath('/screen-content')
    return config;
  },
  devServer: (configFunction) => {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.open = false;
      config.hot = false;
      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};