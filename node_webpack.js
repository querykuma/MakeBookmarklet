const fs = require("fs");
const path = require("path");
const webpack = require("webpack");

const config = {
	// "mode": "development",
	"entry": path.resolve(__dirname, "src/index.js"),
	"output": {
		"filename": "node_output.js"
	}
};

/**
 * ファイルの中身をencodeURIComponentするかどうかのフラグです。
 */
const f_encodeURIComponent = false;

const main = () => {
	const compiler = webpack(config);

	compiler.run((err, stats) => {
		if (err) {
			console.log(err);
		}

		if (!stats) {
			throw new Error('statsがundefinedの可能性があります。');
		}

		const s_emitted_filenames = [...stats.compilation.emittedAssets.values()];
		const s_output_path = stats.compilation.options.output.path;
		const f_has_output = stats.compilation.emittedAssets.size;

		if (f_has_output) {
			console.log(`${s_emitted_filenames.join(', ')}を出力しました。`);
		} else {
			console.log('出力はありませんでした。');
		}

		compiler.close((closeErr) => {
			if (closeErr) {
				console.log(closeErr);
			}

			if (f_has_output) {
				for (let index = 0; index < s_emitted_filenames.length; index++) {
					const s_emitted_filename = s_emitted_filenames[index];

					if (!s_output_path) {
						throw new Error('s_output_pathがundefinedの可能性があります。');
					}

					const s_output_filepath = path.resolve(s_output_path, s_emitted_filename);

					// eslint-disable-next-line no-loop-func
					fs.stat(s_output_filepath, (err2, stats2) => {
						if (err2) { throw err2; }

						if (!stats2.isFile()) {
							console.log(`${s_emitted_filename} はファイルではありません。`);
							return;
						}

						fs.readFile(s_output_filepath, 'utf8', (err3, data) => {
							if (err3) { throw err3; }

							const s_content
								= f_encodeURIComponent
									? `javascript:${encodeURIComponent(data)}`
									: `javascript:${data}`;

							fs.unlink(s_output_filepath, (err4) => {
								if (err4) { throw err4; }

								fs.writeFile(s_output_filepath, s_content, 'utf8', (err5) => {
									if (err5) { throw err5; }
									console.log(`${s_emitted_filename} をbookmarkletにしました。`);
								});
							});
						});
					});
				}
			}
		});
	});
};
main();
