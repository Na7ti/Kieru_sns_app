# Issue #4: データベースパスワードの秘匿化

## 概要
`docker-compose.yml` にハードコードされている `SA_PASSWORD` を環境変数経由での注入に変更し、セキュリティを向上させる。

## 詳細
- `.env.example` の作成（テンプレート）
- `.env` の作成（ローカル開発用、`.gitignore` に追加推奨）
- `docker-compose.yml` の `SA_PASSWORD` を `${DB_PASSWORD}` に変更

## ステータス
- [x] Issue作成
- [x] .env.example の作成
- [x] docker-compose.yml の修正
- [x] 完了
