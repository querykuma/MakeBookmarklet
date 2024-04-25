# MakeBookmarklet

MakeBookmarkletはwebpackでブックマークレットを出力するプログラムです。

## 機能

- 「javascript:」のラベルを出力ファイルの先頭につけます。
- 任意のコメントを出力ファイルの先頭につけます。

## 準備

package.jsonのdevDependenciesにあるnpmのパッケージ（主にwebpackとwebpack-cli）をインストールします。

```shell
npm install
```

## 主なファイル

主なファイルは2つです。MakeBookmarklet.jsとnode_webpack.jsです。

### MakeBookmarklet.js

MakeBookmarklet.jsはwebpackのプラグインです。

#### 使い方

MakeBookmarklet.jsをフォルダに配置してからwebpack.config.jsのpluginsに次のように書いてください。

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

オプション**f_encodeURIComponent**をfalseにするとブックマークレットの中身をencodeURIComponentしません。f_encodeURIComponentの初期値はtrueです。

production modeのときは必要ありませんが、development modeのときはencodeURIComponentが必要になります。

オプション**s_banner**に空文字列以外を指定すると「javascript:/* hoge */(()=>{})();」のようになって出力ファイルの先頭にコメントが挿入されます。s_bannerの初期値は空文字列です。



```shell
npx webpack
または
npx webpack watch
```

で実行してください。

### node_webpack.js

node_webpack.jsはノードインタフェースを使ってNode.jsからwebpackを実行するプログラムです。

#### 使い方

変数**config**で入力ファイルと出力ファイルを設定できます。

変数**f_encodeURIComponent**をtrueにするとブックマークレットのファイルの中身をencodeURIComponentします。falseにするとencodeURIComponentしません。

変数**s_banner**に空文字列以外を指定すると「javascript:/* hoge */(()=>{})();」のようになって出力ファイルの先頭にコメントを挿入します。空文字列を指定すると、コメントを挿入しません。

```shell
node node_webpack.js
```

で実行してください。
