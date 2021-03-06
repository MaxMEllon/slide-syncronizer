const { flatten } = require('lodash')
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifier = require('webpack-notifier')
const HappyPack = require('happypack')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const loaders = {
  babel() {
    return {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader?cacheDirectory=true',
      },
    }
  },
  css() {
    return {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
      }),
    }
  },
  font() {
    return [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    ]
  },
  HappyPack() {
    return {
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      use: 'happypack/loader',
    }
  },
}

const minChunks = module => module.context && module.context.includes('node_modules')
const template = dev => (dev ? './templates/index.dev.html' : './templates/index.html')

class ConfigGenerator {
  constructor() {
    this.env = process.env.NODE_ENV
  }

  get dev() {
    return this.env === 'development'
  }

  get test() {
    return this.env === 'test'
  }

  get prod() {
    return this.env === 'production'
  }

  get entry() {
    return {
      entry: ['regenerator-runtime/runtime', './src/index.js'],
    }
  }

  get plugins() {
    const plugins = []
    plugins.add = arg => {
      Array.prototype.push.call(plugins, arg)
      return plugins
    }

    /* prettier-disable */
    /* eslint-disable */
    const CommonsChunkPluginOpt = { name: 'app', filename: 'vendor.bundle.js', minChunks }
    const HappyPackOpt = { loaders: [{ loader: 'babel-loader?cacheDirectory=true' }] }
    plugins
      .add(new Dotenv({ path: './.env' }))
      .add(new webpack.NamedModulesPlugin())
      .add(new WebpackNotifier({ title: 'webpack', alwaysNotify: true }))
      .add(new HappyPack(HappyPackOpt))
      .add(new webpack.HashedModuleIdsPlugin())
      .add(new webpack.optimize.CommonsChunkPlugin(CommonsChunkPluginOpt))
      .add(new OfflinePlugin({
        caches: {
          main: [
            '*.js',
            '*.css',
            '*.woff',
            '*.woff2',
            '*.eot',
            '*.svg',
          ],
        },
        externals: [
          'https://maxmellon.tokyo/dist/react-dom.production.min.js',
          'https://maxmellon.tokyo/dist/animate.min.css',
          'https://maxmellon.tokyo/dist/reset.css',
          'https://maxmellon.tokyo/dist/react.production.min.js',
          'https://maxmellon.tokyo/dist/lodash.min.js',
          'https://maxmellon.tokyo/dist/bluebird.min.js',
        ],
        AppCache: false,
        safeToUseOptionalCaches: true,
      }))
      .add(new ExtractTextPlugin({
        filename: 'bundle.[chunkhash].css',
        disable: false,
        allChunks:true
      }))
      .add(new HtmlWebpackPlugin({
        template: template(this.dev),
        cache: true,
        minify: {
          caseSensitive: true,
          collapseBooleanAttributes: true,
          collapseInlineTagWhitespace: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          minifyCSS: true,
        }
      }))
    if (this.dev)
      plugins
        .add(new webpack.HotModuleReplacementPlugin())
        .add(new webpack.NoEmitOnErrorsPlugin())
    if (this.prod)
      plugins
        .add(new webpack.optimize.UglifyJsPlugin({
          sourceMap: false,
          compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
          },
          mangle: {
            except: ['$super', '$', 'exports', 'require']
          },
          output: {
            comments: false
          }
        }))
        .add(new CompressionPlugin())
    return plugins
    /* prettier-enable */
    /* eslint-enable */
  }

  get devtool() {
    return this.test || this.dev ? 'inline-source-map' : ''
  }

  get output() {
    return {
      path: `${__dirname}/dist/`,
      filename: 'bundle.[chunkhash].js',
      libraryTarget: 'umd',
    }
  }

  get devServer() {
    return {
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      disableHostCheck: true,
      hot: true,
      noInfo: false,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false,
      },
    }
  }

  get resolve() {
    return {
      extensions: ['.js', '.jsx'],
      alias: {
        '~': path.resolve(__dirname, 'src'),
      },
    }
  }

  get module() {
    return {
      rules: flatten([loaders.css(), loaders.font(), loaders.HappyPack()]),
    }
  }

  get externals() {
    return {
      react: 'React',
      'react-dom': 'ReactDOM',
      bluebird: 'Promise',
      lodash: '_',
    }
  }

  getConfig() {
    return {
      cache: true,
      entry: this.entry,
      devtool: this.devtool,
      plugins: this.plugins,
      resolve: this.resolve,
      module: this.module,
      output: this.output,
      devServer: this.devServer,
      externals: this.externals,
    }
  }
}

module.exports = new ConfigGenerator().getConfig()
