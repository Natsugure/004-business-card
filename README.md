# デジタル名刺アプリ

学習目的で作成したデジタル名刺アプリです。名刺の登録・閲覧ができます。

## 機能

- **名刺の登録** — 名前・自己紹介・好きな技術・SNSアカウント（GitHub / Qiita / X）を登録
- **名刺の閲覧** — 名刺IDで検索して名刺を表示
- **名刺削除バッチ** — 登録された全ユーザーデータを一括削除するバッチ処理

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フロントエンド | React 19 / React Compiler / TypeScript / Vite |
| UIコンポーネント | Chakra UI v2 |
| ルーティング | React Router v7 |
| フォーム管理 | React Hook Form |
| バックエンド | Supabase |
| ホスティング | Firebase Hosting |
| テスト | Vitest / Testing Library |

## 画面構成

| パス | 画面 |
|---|---|
| `/` | ホーム（名刺ID検索・新規登録ボタン） |
| `/cards/register` | 名刺登録フォーム |
| `/cards/:id` | 名刺表示 |

## セットアップ

### 環境変数

`.env` ファイルを作成し、以下を設定してください。

```
VITE_SUPABASE_URL=<Supabase の Project URL>
VITE_SUPABASE_PUBLISHABLE_KEY=<Supabase の anon key>
VITE_SUPABASE_PROJECT_ID=<Supabase の Project ID>
```

### インストール・起動

```bash
pnpm install
pnpm dev
```

## 主なコマンド

```bash
pnpm dev        # 開発サーバー起動
pnpm build      # ビルド
pnpm test       # テスト実行
pnpm lint       # Lint
pnpm generate   # Supabase の型定義を自動生成
make deploy     # ビルド & Firebase へデプロイ
```

## バッチ処理

全ユーザーを削除するバッチが `batch/index.ts` にあります。

```bash
dotenv -e .env -- tsx batch/index.ts
```

## データベース構成（Supabase）

| テーブル | 説明 |
|---|---|
| `users` | ユーザー情報（ID・名前・自己紹介・SNSアカウント） |
| `skills` | 技術マスタ |
| `user_skill` | ユーザーと技術の中間テーブル |
