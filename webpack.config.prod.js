const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: {
		// CamerasPage:'./src/CamerasPage.js',
		a: './src/components/neighborhoods/NeighborhoodsPage.js',
		b: './src/components/agents/AgentsPage.js',
	},

	output: {
		filename: '[contenthash][name].js',
		path: path.resolve(__dirname, 'assets', 'scripts'),
		publicPath: 'dist/assets/scripts/',
	},
	devtool: 'cheap-source-map', //for debugging..
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
