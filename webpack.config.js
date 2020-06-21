const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		// CamerasPage:'./src/CamerasPage.js',
		ApartmentsPage: './src/components/neighborhoods/NeighborhoodsPage.js',
		AgentsPage: './src/components/agents/AgentsPage.js',
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'assets', 'scripts'),
		publicPath: 'dist/assets/scripts/',
	},
	devtool: 'cheap-module-eval-source-map', //for debugging..
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{ useBuiltIns: 'usage', corejs: { version: 3 } },
							],
						],
						plugins: [['@babel/plugin-proposal-class-properties']],
					},
				},
			},
		],
	},
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
