const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const o_package = require("./package.json");

const config = {
	// "mode": "development",
	"entry": path.resolve(__dirname, "src/index.js"),
	"output": {
		"filename": "node_output.js"
	}
};
const f_encodeURIComponent = true;
const s_banner = `v${o_package.version}`;

const main = (config_arg, f_encodeURIComponent_arg, s_banner_arg) => new Promise((resolve, reject) => {
	const compiler = webpack(config_arg);

	compiler.run((err, stats) => {
		if (err) {
			console.log(err);
			reject(err);
			return;
		}

		if (!stats) {
			reject(new Error("statsがundefinedの可能性があります。"));
			return;
		}

		const s_emitted_filenames = [...stats.compilation.emittedAssets.values()];
		const s_output_path = stats.compilation.options.output.path;
		const f_has_output = stats.compilation.emittedAssets.size;

		if (f_has_output) {
			console.log(`${s_emitted_filenames.join(", ")}を出力しました。`);
		} else {
			reject(new Error("出力はありませんでした。"));
			return;
		}

		compiler.close((closeErr) => {
			if (closeErr) {
				reject(closeErr);
				return;
			}

			if (f_has_output) {
				for (let index = 0; index < s_emitted_filenames.length; index++) {
					const s_emitted_filename = s_emitted_filenames[index];

					if (!s_output_path) {
						reject(new Error("s_output_pathがundefinedの可能性があります。"));
						return;
					}

					const s_output_filepath = path.resolve(s_output_path, s_emitted_filename);

					// eslint-disable-next-line no-loop-func
					fs.stat(s_output_filepath, (err2, stats2) => {
						if (err2) {
							reject(err2);
							return;
						}

						if (!stats2.isFile()) {
							reject(new Error(`${s_emitted_filename} はファイルではありません。`));
							return;
						}

						fs.readFile(s_output_filepath, "utf8", (err3, data) => {
							if (err3) {
								reject(err3);
								return;
							}

							const s_preceding = `javascript:${s_banner_arg ? `/* ${s_banner_arg} */` : ""}`;

							const s_content
								= f_encodeURIComponent_arg
									? `${s_preceding}${encodeURIComponent(data)}`
									: `${s_preceding}${data}`;

							fs.unlink(s_output_filepath, (err4) => {
								if (err4) {
									reject(err4);
									return;
								}

								fs.writeFile(s_output_filepath, s_content, "utf8", (err5) => {
									if (err5) {
										reject(err5);
										return;
									}

									console.log(`${s_emitted_filename} をbookmarkletにしました。`);
									resolve();
								});
							});
						});
					});
				}
			}
		});
	});
});

/**
 * このように記述するのはJestからテストしやすくするため。
 */
if (require.main === module) {
	// このファイルをrequireから呼び出さした場合、このブロックは実行されない。
	main(config, f_encodeURIComponent, s_banner);
}

module.exports = main;
