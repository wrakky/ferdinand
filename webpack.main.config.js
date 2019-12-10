const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './packages/app/main.ts',
  // Put your normal webpack config below here
  module: {
    rules
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.svg'],
    symlinks: true
  }
};
