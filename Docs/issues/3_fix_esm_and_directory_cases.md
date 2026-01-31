# Issue #3: Frontend 環境の ESM 移行とディレクトリ名修正の反映

## 概要
`tailwind.config.js` での `export default` 使用に伴う構文エラーを解消するため、Frontend 環境全体を ES Modules (ESM) 前提に調整する。また、ユーザーによって変更された大文字開始のディレクトリ名（`Frontend`, `Backend`, `Docs`, `Database`）に合わせて設定を更新する。

## 詳細
- `Frontend/package.json` に `"type": "module"` を追加
- `Frontend/tailwind.config.js` の内容を確認（必要に応じて修正）
- `Docs/commit_guideline.md` の復元（前回の実行で削除されたように見えたため、必要なら再作成）

## ステータス
- [x] Issue作成
- [x] Frontend/package.json の修正
- [x] 完了
