GULP4
====

## Description

GULP4 ヴァージョンアップ対応ずみブランチ

nodeのヴァージョンはv10.16.0

NPMのヴァージョンはv6.9.0

nodeのヴァージョン管理はnodenv

node -v

npm -v

でヴァージョン確認する

## NODEのバージョン管理方法
### GULPをローカルにインストールする
```
npm install -D gulp
```
### インストール済みのnodeヴァージョンを調査
```
nodenv versions
```
### インストールできるnodeのヴァージョンを調査
```
nodenv install -l
```
### 使用したいnodeのヴァージョンをインストールする
```
nodenv install 12.7.0
```
### グローバルで指定したい場合は、下記コマンド
```
nodenv global 12.7.0
```
### ディレクトリで使用したい場合は下記コマンド
```
nodenv local 10.16.0
```

## Install
SSHでcloneした後に、
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