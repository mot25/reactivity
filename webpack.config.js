/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const os = require('os');
const path = require('path');
const glob = require('glob');
const pathFileDynamic = path => {
  const isWindows = os.platform() === 'win32';
  const pathObj = {};
  glob.sync(path).forEach(path => {
    const key = isWindows
      ? path.match(/\\([^\\]+)\.ts/)[1]
      : path.split('/').at(-1).split('.ts')[0];
    const value = './' + path.split('\\').join('/').toString();
    pathObj[key] = value;
  });
  return pathObj;
};
module.exports = {
  mode: 'development',
  entry: pathFileDynamic('./src/**/*.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', { targets: 'es5' }]]
          }
        }
      }
    ]
  }
};
