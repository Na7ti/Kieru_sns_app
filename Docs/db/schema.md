# データベース設計

## 1. ER図（簡易）
```mermaid
erDiagram
    USERS ||--o{ POSTS : "creates"
    POSTS ||--o{ ACTIONS : "receives"

    USERS {
        int id PK
        string username
        string email
        string password_hash
        datetime created_at
    }

    POSTS {
        int id PK
        int user_id FK
        string content
        string lifespan_category "DETOX / SHARE / DISCUSS"
        datetime created_at
        datetime expires_at
        boolean is_deleted
    }
```

## 2. テーブル定義

### Users (ユーザー)
| カラム名 | 型 | 制約 | 備考 |
| :--- | :--- | :--- | :--- |
| id | int | PK, Identity | ユーザーID |
| username | nvarchar(50) | Not Null, Unique | ユーザー名 |
| email | nvarchar(255) | Not Null, Unique | メールアドレス |
| password_hash | nvarchar(max) | Not Null | ハッシュ化されたパスワード |
| created_at | datetime | Not Null, Default(GETDATE()) | アカウント作成日時 |

### Posts (投稿)
| カラム名 | 型 | 制約 | 備考 |
| :--- | :--- | :--- | :--- |
| id | int | PK, Identity | 投稿ID |
| user_id | int | FK(Users.id), Not Null | 投稿者ID (MVPでは固定IDでも可) |
| content | nvarchar(280) | Not Null | 投稿本文 |
| lifespan_category | nvarchar(20) | Not Null | DETOX / SHARE / DISCUSS |
| created_at | datetime | Not Null, Default(GETUTCDATE()) | 投稿日時 (UTC) |
| expires_at | datetime | Not Null | 削除予定日時 (UTC) |
| is_deleted | bit | Not Null, Default(0) | 論理削除フラグ |

## 3. インデックス設計
- `IX_Posts_ExpiresAt`: `expires_at` (Non-Clustered) - 期限切れ投稿の抽出高速化。
- `IX_Posts_IsDeleted_ExpiresAt`: `is_deleted`, `expires_at` (Non-Clustered) - タイムライン表示用。

## 4. カテゴリーと保持期間の定義
- **DETOX**: 15分, 30分, 60分
- **SHARE**: 24時間
- **DISCUSS**: 48時間, 72時間
