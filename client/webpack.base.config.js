var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const isProduction = process.env.NODE_ENV === 'production'
var webpack = require('webpack')

module.exports = {
  entry: path.resolve(__dirname, 'src/client-server.js'),
  mode: 'development',
  module: {
        rules: [
        {
          test: /\.vue$/,
	      loader:  'vue-loader',
	          options: {
		        loaders: {
		            'scss': [
		              'vue-style-loader',
		              'css-loader',
		              'sass-loader'
		            ],
		            'sass': [
		              'vue-style-loader',
		              'css-loader',
		              'sass-loader?indentedSyntax'
		            ]
		       }
	        }
        },
        {
        test: /\.scss$/,
        use: [
	          'vue-style-loader',
	          'css-loader',
	          'sass-loader'
	        ],
	    },
	    {
	        test: /\.sass$/,
	        use: [
	          'vue-style-loader',
	          'css-loader',
	          'sass-loader?indentedSyntax'
	        ],
	    },
        {
          test: /\.(less|css)$/,
          exclude: /node_modules/,
          use: [
              { loader: 'vue-style-loader' },
              { loader: 'css-loader' },
              { loader: 'less-loader' }
          ]
        },
      ]
  },
  devtool: '#eval-source-map',
  // Это сообщает что в серверной сборке следует использовать экспорты в стиле Node
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: path.resolve(__dirname, 'dist'),
    filename: 'build.js'
  },

  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  }
};

if (isProduction) {
  module.exports.devtool = '#source-map'
  module.exports.mode = 'production';
}