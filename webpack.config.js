const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let config = {
  entry: {
    'extended-uportal-footer': './src/extended-uportal-footer.ts',
    'extended-uportal-footer.min': './src/extended-uportal-footer.ts',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
    alias: {
      '@helpers': path.resolve(__dirname, 'src/helpers/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@mixins': path.resolve(__dirname, 'src/mixins/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@locales': path.resolve(__dirname, 'src/locales/'),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true,
    port: 8080,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['extended-uportal-footer'],
      template: './samples/index.html',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
        parallel: true,
        extractComments: false,
      }),
    ],
    sideEffects: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
  }

  if (argv.mode === 'production') {
    if (env.profiling) {
      config.plugins.push(new BundleAnalyzerPlugin());
    }
    if (env.fortest) config.devtool = 'source-map';
  }

  return config;
};
