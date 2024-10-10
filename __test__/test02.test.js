/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const o_package = require("../package.json");

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

test("webpack s_banner is object", (done) => {
	let s_command = "npx webpack -c __test__/webpack.config3.js";
	let s_result = cp.execSync(s_command).toString();
	console.log(s_result);

	expect_file_content_equal("index_min.js", "expect3-1.txt");
	expect_file_content_equal("index2_min.js", "expect3-2.txt");
	done();
});
