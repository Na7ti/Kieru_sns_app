# Kieru_sns_app
本プロジェクトは、SNSにおける「情報の蓄積」による心理的負荷を軽減し、「今、この瞬間」のコミュニケーションを最大化することを目的とする。投稿に「寿命（自動削除機能）」を設けることで、ユーザーの自己開示に対する心理的障壁を下げる。

## プロジェクト構造

```text
/Kieru_sns_app
├── /docs # プロジェクト設計・ドキュメント
│ ├── /requirements # 要件定義書、ユーザー調査
│ ├── /design # UI/UXデザイン、ワイヤーフレーム
│ ├── /architecture # 技術アーキテクチャ、インフラ構成図
│ ├── /db # ER図、テーブル定義、マイグレーション記録
│ └── /api # API仕様書（Swagger/OpenAPI等）
├── /frontend # Reactプロジェクト (VSCode)
├── /backend # .NETプロジェクト (Visual Studio)
├── /database # Docker用SQL Server設定・初期化SQL
├── docker-compose.yml
└── README.md # プロジェクトの概要・起動方法
```

## 開発の始め方

1. `docker-compose up -d` でデータベースを起動。
2. `backend` ディレクトリで .NET プロジェクトをビルド。
3. `frontend` ディレクトリで `npm install` し、`npm run dev` で起動。
