var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: "./src/bootstrap.tsx",
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "app.bundle.min.js",
        library: "app",
        libraryTarget: "umd"
    },
    mode: 'production',
    // disable sourcemaps for prod.
    // devtool: "eval-source-map",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // Handle .ts and .tsx file via ts-loader.
        { test: /\.tsx?$/, loader: "ts-loader" },
      ],
    }
  };