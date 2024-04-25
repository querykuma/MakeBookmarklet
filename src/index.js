// import * as a from './a.js';
import a from "./a.js";
// const { p, q } = a;

// この形式のコメントがあってもブックマークレットを実行できることのテスト。

// ブックマークレット実行後にwindow.tが作られないことのテスト。
// eslint-disable-next-line no-var
var t = a;

// ブックマークレット実行後にタブが消えないことのテスト。
// eslint-disable-next-line no-tabs
console.log("a					b");

console.log(t);
// console.log(p);
// console.log(q);
