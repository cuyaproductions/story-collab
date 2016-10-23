const path = require('path');

module.exports = {
  entry: "./client/src/scripts/index.js",
  output: {
    path: "./client/public/scripts",
    filename: "app.bundle.js",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'client/src/scripts')
      }
    ]
  }
}
