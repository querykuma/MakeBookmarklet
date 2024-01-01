/* eslint-disable no-sync */
const fs = require("fs");
const path = require("path");
const cp = require('child_process');

/**
 * ファイルの中身の一致をテストする。
 * @param {string} s_file1
 * @param {string} s_file2
 */
let expect_file_content_equal = (s_file1, s_file2) => {
	const s_filepath1 = path.join(__dirname, '../dist', s_file1);
	const s_filepath2 = path.join(__dirname, s_file2);

	const s_content1 = fs.readFileSync(s_filepath1, 'utf8');
	const s_content2 = fs.readFileSync(s_filepath2, 'utf8');

	expect(s_content1).toEqual(s_content2);
};

test('node_webpack.js', (done) => {
	let s_command = `node ${path.resolve(__dirname, '../node_webpack.js')}`;
	let s_result = cp.execSync(s_command).toString();
	console.log(s_result);

	expect_file_content_equal('node_output.js', 'main_expect.txt');
	done();
});

test('webpack production', (done) => {
	let s_command = 'npx webpack --mode production';
	let s_result = cp.execSync(s_command).toString();
	console.log(s_result);

	expect_file_content_equal('main.js', 'main_expect.txt');
	done();
});
