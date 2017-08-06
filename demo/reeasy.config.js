const webpack = require('webpack')

module.exports = {
	rootPath: 'src/app.tsx',
	selector: '#root',
	webpack: config => {

		config.module.loaders.unshift({
			test: /\.tsx?$/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [
							['env', { "modules": false }],
							'react'
						],
						plugins: [
							[
								"transform-runtime",
								{
									"helpers": false,
									"polyfill": false,
									"regenerator": true,
									"moduleName": "babel-runtime"
								}
							]
						]
					}
				},
				{
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: 'demo/tsconfig.json',
						silent: true
					}
				}
			]
		})

		config.module.loaders.push({
			test: /\.(css|less)$/,
			loader: 'style-loader!css-loader!less-loader'
		})

		config.module.loaders.push({
			test: /\.(png|jpg|gif|ico)$/,
			loader: 'file-loader?outputPath=images/&name=[name].[ext]&publicPath=/'
		})

		config.module.loaders.push({
			test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
			loader: 'file-loader?outputPath=fonts/&name=[name].[ext]&publicPath=/'
		})

		config.plugins.push(new webpack.ProgressPlugin())

		return config
	}
}