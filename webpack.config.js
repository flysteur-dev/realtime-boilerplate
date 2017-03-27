const path = require('path');

const config = {
	entry: './src/public/js/app.js',
	output: {
		path: path.resolve(__dirname, 'dist/public/js'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, 
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['react']
					}
				}
			}
		]
	}
}

module.exports = config;