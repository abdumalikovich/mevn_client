const path = require('path')

module.exports = {
	publicPath: '/',
	filenameHashing: false,
	outputDir: path.resolve(__dirname, '../server/public'),
	devServer: {
		proxy: 'http://localhost:3001'
	},
}

if(process.env.NODE_ENV === 'production') {
	module.exports.devServer.proxy = 'https://wepro.uz';
	module.exports.pluginOptions.layouts.preloader = true;
}
