/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const o_package = require("../package.json");
const node_webpack = require("../node_webpack");

/**
 * ファイルの中身の一致をテストする。
 * @param {string} s_file1
 * @param {string} s_file2
 */
let expect_file_content_equal = (s_file1, s_file2) => {
	const s_filepath1 = path.join(__dirname, "../dist", s_file1);
	const s_filepath2 = path.join(__dirname, s_file2);

	const s_content1 = fs.readFileSync(s_filepath1, "utf8");
	const s_content2 = fs.readFileSync(s_filepath2, "utf8");

	expect(s_content1).toEqual(s_content2.replace(/__REPLACE__/u, `v${o_package.version}`));
};

test("node_webpack.js production f_encodeURIComponent=false", async () => {
	try {
		const f_encodeURIComponent = false;
		const s_banner = `v${o_package.version}`;
		await node_webpack({
			"mode": "production",
			"entry": path.resolve(__dirname, "../src/index.js"),
			"output": {
				"filename": "node_output.js"
			}
		}, f_encodeURIComponent, s_banner);

	} catch (error) {
		console.log(error);
	}

	expect_file_content_equal("node_output.js", "main_expect.txt");
});

test("webpack production f_encodeURIComponent=false", (done) => {
	let s_command = "npx webpack --mode production -c __test__/webpack.config_test1.js";
	let s_result = cp.execSync(s_command).toString();
	console.log(s_result);

	expect_file_content_equal("main.js", "main_expect.txt");
	done();
});
