import path from 'path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackNotifier from 'webpack-notifier'
import HappyPack from 'happypack'
import CompressionPlugin from 'compression-webpack-plugin'

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
      entry: './src/index.js',
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
      .add(new HtmlWebpackPlugin({ template: template(this.dev) }))
      .add(new webpack.NamedModulesPlugin())
      .add(new WebpackNotifier({ title: 'webpack', alwaysNotify: true }))
      .add(new HappyPack(HappyPackOpt))
      .add(new webpack.optimize.CommonsChunkPlugin(CommonsChunkPluginOpt))
    if (this.dev)
      plugins
        .add(new webpack.HotModuleReplacementPlugin())
        .add(new webpack.NoEmitOnErrorsPlugin())
    if (this.prod)
      plugins
        .add(new webpack.optimize.UglifyJsPlugin())
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
      filename: 'bundle.js',
      libraryTarget: 'umd',
    }
  }

  get devServer() {
    return {
      host: 'localhost',
      port: 3000,
      historyApiFallback: true,
      hot: true,
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
      rules: [loaders.HappyPack()],
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
