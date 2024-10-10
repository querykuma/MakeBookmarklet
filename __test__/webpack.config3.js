const path = require("path");
const MakeBookmarklet = require("../MakeBookmarklet.js");
const o_package = require("../package.json");

module.exports = {
	"mode": "production",
	"context": path.resolve(__dirname, "../src"),
	"entry": {
		"index": "./index.js",
		"index2": "./index2.js"
	},
	"output": {
		"filename": "[name]_min.js",
		"path": path.resolve(__dirname, "../dist")
	},
	"plugins": [
		new MakeBookmarklet({
			"f_encodeURIComponent": false,
			"s_banner": {
				"index": `v${o_package.version}`,
				"index2": "v0.1.2"
			}
		})
	]
};
