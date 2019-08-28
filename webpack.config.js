module.exports = {
    entry: __dirname + '/client/index.jsx',
    module: {
      rules: [
        { 
          test: [/\.jsx$/],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        }
      ]
    },
    devServer:{
      historyApiFallback: {
        index:'build/index.html'
      }
    },
     output: {
      filename: 'bundle.js',
      path: __dirname + '/client/public'
    }
  };