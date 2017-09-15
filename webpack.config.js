var webpack = require("webpack");

module.exports = {
	resolve: {
		alias: {
			'angular': './src/lib/ionic/js/ionic.bundle.js',
		}
	},
	entry: [
		// "./src/lib/firebase/firebase.js",
		// "./src/lib/angularfire/dist/angularfire.min.js",
		// "./src/lib/ngstorage/ngStorage.min.js",
		"./src/js/keys.js",
		"./src/js/services",
		"./src/js/app.js",
		"./src/js/controllers.js",
		"./src/js/routes.js"
	],
	devtool: "source-map",
	output: {
		filename: "./src/bundle.js"
	},
	externals: [
		'angular'
	],
	// plugins: [
	// 	new webpack.optimize.UglifyJsPlugin({
	// 		minimize: true,
	// 		compress: false
	// 	})
	// ]
	// watch: true
};