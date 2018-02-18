import path from 'path'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackNotifier from 'webpack-notifier'
import HappyPack from 'happypack'

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
  Happypack() {
    return {
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      use: 'happypack/loader',
    }
  },
}

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
    plugins
      .add(new Dotenv({ path: './.env' }))
      .add(
        new HtmlWebpackPlugin({
          template: this.dev ? './templates/index.dev.html' : './templates/index.html',
        }),
      )
      .add(new webpack.NamedModulesPlugin())
      .add(
        new WebpackNotifier({
          title: 'webpack',
          alwaysNotify: true,
        }),
      )
      .add(
        new HappyPack({
          loaders: [
            {
              loader: 'babel-loader?cacheDirectory=true',
            },
          ],
        }),
      )
    if (this.dev) {
      plugins.add(new webpack.HotModuleReplacementPlugin()).add(new webpack.NoEmitOnErrorsPlugin())
    }
    if (this.prod) {
      plugins.add(new webpack.optimize.UglifyJsPlugin())
    }
    return plugins
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
      rules: [loaders.Happypack()],
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
