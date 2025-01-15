const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: false,
  mode: 'production',
  entry: './src/cli.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'cli.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFormat: false,
  },
  target: 'node',
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          'echo "#!/usr/bin/env node" | cat - dist/cli.js > temp && mv temp dist/cli.js && chmod +x dist/cli.js',
        ],
        blocking: true,
        parallel: false,
      },
    }),
  ],
};
