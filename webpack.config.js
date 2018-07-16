var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
      'app': "./src/bootstrap.tsx"
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].bundle.js",
        library: "app",
        libraryTarget: "umd"
    },
    mode: 'development',
    // Enable sourcemaps for debugging webpack's output.
    devtool: "eval-source-map",
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // Handle .ts and .tsx file via ts-loader.
        { test: /\.tsx?$/, loader: "ts-loader" },
        {
            test: /\.(html)$/,
            use: {
              loader: 'html-loader',
              options: {
                attrs: [':data-src']
              }
            }
        }
      ],
    },
    watchOptions: {
      poll: true
    }
  };