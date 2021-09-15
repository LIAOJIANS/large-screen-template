
const path = require('path')

const mockServer = () => {
  return require('./mock/index.js')
}

module.exports = {
  devServer: (configFunction) => {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.hot = true
      config.port = '3000'
      config.noInfo = false
      config.overlay = {
        warnings: true,
        errors: true
      }
      config.before = mockServer()
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      }

      return config
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js|ts|tsx)$/,
        include: [
          path.resolve(__dirname, '../components'),
          path.resolve(__dirname, '../example')
        ],
        exclude: [/node_modules/],
        use: ['eslint-loader'],
        enforce: 'pre'
      }
    ]
  }
}
