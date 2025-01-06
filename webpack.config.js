/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

let firstRun = true;
const isProd = process.env.NODE_ENV === 'production';

const babelOptions = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: 'last 2 versions, ie 11',
        modules: false,
      },
    ],
  ],
};

const config = {
  mode: isProd ? 'production' : 'development',
  context: path.resolve(__dirname, './src'),
  entry: './index.ts',

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: babelOptions,
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // {
      //   test: /\.fnt$/i,
      //   type: 'asset/source',  
      // },      
      // {
      //   test: /\.xml$/i,
      //   type: 'asset/source',
      // },      
      // {
      //   test: /\.(png|jpg|jpeg|svg|gif|webp|mp4|mp3|woff|woff2|ttf|eot|json)$/, 
      //   type: 'asset/resource',
      //   exclude: [
      //       path.resolve(__dirname, 'src/assets'), 
      //   ],
      // },      
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      manifest: 'apt.webmanifest',
      inject: true,
      title: 'Adr-enaline Phaser Template',
      appMountId: 'app',
      filename: 'index.html',
      inlineSource: '.(js|css)$',
      minify: false,
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: 'assets',
            to: 'assets',
          },
        ],
      }),
    new webpack.DefinePlugin( {
        "process.env": JSON.stringify(dotenv.parsed)
      }),
    {
      apply: (compiler) => {
          compiler.hooks.watchRun.tap('SkipSWOnWatch', (compilation) => {
              if (!firstRun) {
                  console.log('Skipping service worker generation on watch...');
              }
              firstRun = false;
          });
      },
    },      
    new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
        mode: 'development',
    })          
  ],

  devServer: {
    static: {
        directory: path.join(__dirname, "dist")
      },
    port: 5001
  },
};

module.exports = config;