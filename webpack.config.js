const slsw = require("serverless-webpack");

module.exports = {
  devtool: 'cheap-module-source-map',
  mode: 'development',
  target: 'node',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    fallback: {},
  },
  entry: slsw.lib.entries,
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  stats: 'minimal',
};