import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin} from 'clean-webpack-plugin';

process.env.BABEL_ENV = 'build';

module.exports = (env, argv) => {
  const development = argv.mode === 'development';
  const production = argv.mode === 'production';
  const hashStrategy = production ? 'hash' : 'chunkhash';

  return {
    entry: {
      xinsert: ['@babel/polyfill', path.resolve(__dirname, 'ui/index.jsx')]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss'],
      modules: ['ui', 'node_modules'],
      alias: {
        '~/ui': path.resolve(__dirname, './ui'),
        '~/logic': path.resolve(__dirname, './logic')
      }
    },
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: `chunks/[name].[hash].js`,
      chunkFilename: `chunks/[name].[${ hashStrategy }].js`,
      publicPath: '/'
    },
    performance: {
      hints: false
    },
    optimization: {
      minimize: production,
      runtimeChunk: 'single',
      splitChunks: {
        automaticNameDelimiter: '.',
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new CleanWebpackPlugin({ quiet: true }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'ui/index.ejs'),
        inject: 'body',
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',
        chunkFilename: `[name].[${ hashStrategy }].css`,
      }),
      new CopyPlugin([
        {
          from: path.resolve(__dirname, 'ui/.htaccess'),
          to: path.resolve(__dirname, 'public')
        }
        // {
        //   from: path.resolve(__dirname, 'ui/assets/favicons'),
        //   to: path.resolve(__dirname, 'public')
        // },
        // {
        //   from: path.resolve(__dirname, 'ui/assets/xinsert.fb.jpg'),
        //   to: path.resolve(__dirname, 'public')
        // }
      ])
    ],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: 'eslint-loader',
          enforce: 'pre'
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /((?!m).)\.(s(a|c)ss|css)$/,
          loader: [
            development ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: false,
                sourceMap: development
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: development
              }
            },
            'postcss-loader'
          ]
        },
        // CSS Modules
        {
          test: /m\.(s(a|c)ss|css)$$/,
          loader: [
            development ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                ...(development && { localIdentName: '[name]__[local]___[hash:base64:5]' }),
                camelCase: true,
                sourceMap: development
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: development
              }
            },
            'postcss-loader'
          ]
        },
        {
          test: /\.(png|gif|jpe?g)$/i,
          use:
            [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[hash].[ext]'
                }
              },
              {
                loader: 'image-webpack-loader',
                options: {
                  gifsicle: {
                    interlaced: false
                  },
                  optipng: {
                    optimizationLevel: 7
                  }
                }
              }
            ]
        },
        {
          test: /((?!inline).{6})\.svg$/i,
          use:
            [
              {
                loader: 'file-loader',
                options: {
                  name: '[path][name].[hash].[ext]'
                }
              }
            ]
        },
        {
          test: /\.inline\.svg$/i,
          use:
            [
              {
                loader: 'svg-inline-loader'
              }
            ]
        }
      ]
    }
  }
};
