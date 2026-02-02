# API設計書

## 1. 概要
フロントエンド（React/TanStack Query）とバックエンド（.NET）の通信インターフェースを定義します。

## 2. エンドポイント一覧

### 2.1 投稿関連

#### 投稿作成
- **URL:** `POST /api/posts`
- **Request Body:**
    ```json
    {
      "content": "string",
      "lifespan_minutes": 15
    }
    ```
- **Response (201 Created):**
    ```json
    {
      "id": 1,
      "content": "string",
      "expires_at": "2026-02-02T12:00:00Z"
    }
    ```

#### 投稿一覧取得（タイムライン）
- **URL:** `GET /api/posts`
- **Response (200 OK):**
    ```json
    [
      {
        "id": 1,
        "username": "UserA",
        "content": "Hello",
        "lifespan_category": "DETOX",
        "expires_at": "2026-02-02T12:00:00Z",
        "remaining_seconds": 3600
      }
    ]
    ```

### 2.2 認証関連（今後拡張）
- `POST /api/auth/register`
- `POST /api/auth/login`

## 3. 共通仕様
- **認証:** JWTを使用（予定）。
- **日付形式:** ISO 8601形式（UTC）。
- **エラーレスポンス:**
    ```json
    {
      "error": "Reason for failure",
      "code": 400
    }
    ```
