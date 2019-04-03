GULP FILE FOR WEB SITE
====

## Description

WEBサイト作成時に使用するシンプルなGULPファイルです。

## Install
cloneの後に、
```
npm install
```
でパッケージをインストールしてください。
```
gulp default
```
で開発用のファイル生成をします。
```
gulp build
```
で本番用のファイルです。ファイルの圧縮処理が追加されています。

## Packages
・EJS  
gulpで手軽にEJSテンプレートをHTMLに変換  
https://qiita.com/yuichiroharai/items/63b0769bc8ebe0220018

・SCSS  
gulpでSASSを自動コンパイルする  
https://qiita.com/M_amourr/items/09c8bb4e2b2981cafe7a  

・browser-sync  
サックっとbrowser-syncを設定  
https://qiita.com/itoz/items/2bd246606c69c33684e8  
  
## Directry  
.  
├── commands  
│   ├── class  
│   │   ├── FileWriteTasks.js  
│   │   └── Tasks.js  
│   ├── createMigration.js  
│   ├── make.js  
│   ├── migrate.ejs.js  
│   ├── migrate.filestore.js  
│   ├── migrate.js  
│   ├── migrate.scss.js  
│   ├── migrate.types.js  
│   ├── task.js  
│   └── utils.js  
├── config  
│   ├── index.js  
│   ├── utils.js  
│   └── webpack.config.js  
├── docs  
├── gulpfile.js  
├── migration  
│   ├── migrations.json  
│   └── tpl  
│       ├── component.ejs.tpl  
│       ├── default.scss.tpl  
│       └── page.ejs.tpl  
├── node_modules  
│   └── *  
├── package-lock.json  
├── package.json  
├── src  
│   ├── ejs  
│   │   ├── _config.ejs  
│   │   ├── _head.ejs  
│   │   ├── globals  
│   │   │   ├── _footer.ejs  
│   │   │   └── _header.ejs  
│   │   └── index.ejs  
│   ├── js  
│   │   ├── app.js  
│   │   └── config  
│   │       └── index.js  
│   ├── router  
│   │   └── index.json  
│   └── scss  
│       ├── bases  
│       │   ├── _base.scss  
│       │   ├── _layout.scss  
│       │   └── _reset.scss  
│       ├── cores  
│       │   ├── _class.scss  
│       │   ├── _function.scss  
│       │   └── _snippet.scss  
│       ├── globals  
│       │   ├── _footer.scss  
│       │   └── _header.scss  
│       ├── settings  
│       │   ├── _color.scss  
│       │   ├── _define.scss  
│       │   ├── _font.scss  
│       │   └── _view.scss  
│       ├── style.css  
│       └── style.scss  
└── tasks  
    ├── clean.js  
    ├── config.js  
    ├── copy.js  
    ├── ejs.js  
    ├── main.js  
    ├── sass.js  
    ├── server.js  
    ├── transfer.js  
    ├── utils.js  
    └── webpack.js  


## Author























