const MakeBookmarklet = require("../MakeBookmarklet.js");

const o_package = require("../package.json");

module.exports = {
	"plugins": [
		new MakeBookmarklet({
			"f_encodeURIComponent": false,
			"s_banner": `v${o_package.version}`
		})
	]
};
