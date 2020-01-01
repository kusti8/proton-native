const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const spawn = require('child_process').spawn;

module.exports = (env, argv) => {
  const config = {
    mode: 'production',
    entry: ['./index.js'],
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.out.js',
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: { cacheDirectory: true, cacheCompression: false },
          },
        },
        {
          test: /\.(png|jpe?g|gif|svg|bmp)$/i,
          use: [{ loader: 'file-loader' }],
        },
        {
          test: /\.node/i,
          use: [{ loader: 'node-loader' }, { loader: 'file-loader' }],
        },
      ],
    },
    plugins: [
      {
        apply: compiler => {
          let instance = null;
          compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
            if (instance) {
              return;
            }
            instance = spawn('npm', ['run', 'webpackRun']);
            instance.stdout.on('data', function(data) {
              console.log(data.toString());
            });

            instance.stderr.on('data', function(data) {
              console.log(data.toString());
            });

            instance.on('exit', function(code) {
              console.log('child process exited with code ' + code.toString());
              process.exit(code);
            });
          });
        },
      },
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    },
    externals: [
      nodeExternals({
        whitelist: ['webpack/hot/dev-server', 'webpack/hot/poll?100'],
      }),
    ],
  };

  if (argv.mode === 'development') {
    config.mode = 'development';
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.devtool = 'source-map';
    config.watch = true;
    config.stats = 'errors-only';
    config.entry.unshift('webpack/hot/poll?100');
  }

  return config;
};
