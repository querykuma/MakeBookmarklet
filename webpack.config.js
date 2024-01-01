const MakeBookmarklet = require('./MakeBookmarklet.js');

module.exports = {
	"plugins": [
		/**
		 * f_encodeURIComponentはファイルの中身をencodeURIComponentするかどうかのフラグです。
		 */
		new MakeBookmarklet({
			"f_encodeURIComponent": false
		})
	]
};
