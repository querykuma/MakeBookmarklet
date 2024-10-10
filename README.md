# MakeBookmarklet

MakeBookmarkletはブックマークレットを出力するwebpackのプラグインです。

## 機能

- 「javascript:」のラベルを出力ファイルの先頭に挿入します。
- 任意のコメント（s_banner）を出力ファイルの先頭に挿入します。

## 使い方

MakeBookmarklet.jsを適切なフォルダに配置し、webpack.config.jsのpluginsに次のように書いてください。webpackを実行するときにMakeBookmarklet.jsを呼び出します。

```javascript
const MakeBookmarklet = require('./MakeBookmarklet.js');

module.exports = {
	"plugins": [
		new MakeBookmarklet({
			"f_encodeURIComponent": false,
			"s_banner": "hoge"
		})
	]
};
```

`npx webpack`のコマンドでwebpackを実行すればブックマークレットを出力します。

## オプション

new MakeBookmarkletの引数でオプションを指定できます。

### f_encodeURIComponent

オプション**f_encodeURIComponent**をfalseにするとブックマークレットの中身をencodeURIComponentしません。f_encodeURIComponentの初期値はtrueです。

production modeのときは必須ではありませんが、development modeのときはencodeURIComponentが必須になります。

### s_banner

オプション**s_banner**に空文字列以外の文字列を指定すると出力ファイルの先頭にコメントを挿入します。出力ファイルは「javascript:/* hoge */(()=>{})();」の形式になります。s_bannerの初期値は空文字列です。

複数ファイルに対して異なるs_bannerをつけるため、v1.2.0からs_bannerにオブジェクトを指定できるようになりました。

次の例は、"src/index.js"にs_banner "v1.2.3"、"src/index2.js"にs_banner "v0.1.2"を指定しています。

```javascript
const path = require("path");
const MakeBookmarklet = require("./MakeBookmarklet.js");

module.exports = {
	"mode": "production",
	"context": path.resolve(__dirname, "src"),
	"entry": {
		"index": "./index.js",
		"index2": "./index2.js"
	},
	"output": {
		"filename": "[name]_min.js",
		"path": path.resolve(__dirname, "dist")
	},
	"plugins": [
		new MakeBookmarklet({
			"f_encodeURIComponent": false,
			"s_banner": {
				"index": "v1.2.3",
				"index2": "v0.1.2"
			}
		})
	]
};
```
