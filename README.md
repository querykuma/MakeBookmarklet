# MakeBookmarklet

MakeBookmarkletはwebpackを使ってブックマークレットを出力するサンプルプログラムのレポジトリです。ありていに言うと「javascript:」のラベルをwebpackの出力ファイルの先頭につけます。

主なファイルは2つです。MakeBookmarklet.jsとnode_webpack.jsです。

## 準備

package.jsonのdevDependenciesにあるnpmのパッケージをインストールします。

```shell
npm install
```

## MakeBookmarklet.js

MakeBookmarklet.jsはwebpackのプラグインです。

### 使い方

MakeBookmarklet.jsを配置してからwebpack.config.jsのpluginsに次のように書いてください。

```javascript
const MakeBookmarklet = require('./MakeBookmarklet.js');

module.exports = {
	"plugins": [
		new MakeBookmarklet({
			"f_encodeURIComponent": false
		})
	]
};
```

f_encodeURIComponentをtrueにするとブックマークレットのファイルの中身をencodeURIComponentします。

```shell
npx webpack
または
npx webpack watch
```

で実行してください。

## node_webpack.js

node_webpack.jsはノードインタフェースを使ってNode.jsからwebpackを実行するプログラムです。

### 使い方

変数configで入力ファイルと出力ファイルを設定できます。

変数f_encodeURIComponentをtrueにするとブックマークレットのファイルの中身をencodeURIComponentします。

```shell
node node_webpack.js	
```

で実行してください。