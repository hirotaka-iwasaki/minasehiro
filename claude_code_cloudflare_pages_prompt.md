# Cloudflare Pages × 審査用 Support/Privacy × ポートフォリオサイト（Claude Code 用 指示書）

このファイルは **Claude Code にそのまま渡すための指示書**です。  
（コピー＆ペーストで崩れる問題を避けるため、ダウンロード用ファイルとして生成しています）

---

## 目的

Cloudflare Pages 上に、以下を満たす静的サイトを構築したい。

1. App Store 審査で必須のページを量産して管理したい  
   - Support URL  
   - Privacy Policy URL  
2. 自分のポートフォリオサイトとしても機能させたい  
   - 作ったアプリ/サービス一覧  
   - 各プロジェクト詳細ページ  
3. 運用負荷を最小にしたい  
   - アプリが増えたら “Markdown 1枚追加” でページ追加できる  
4. デプロイは Cloudflare Pages  
   - GitHub にpushしたら自動デプロイ  
   - 独自ドメイン運用前提（minasehiro.art）

---

## 実装方針

- フレームワーク：**Astro**
- 追加更新：**Markdown / MDX で管理**
- ページ構成：
  - `/` トップ
  - `/apps` アプリ一覧
  - `/apps/[slug]` アプリ詳細（Markdown）
  - `/support/[slug]` サポートページ（Markdown）
  - `/privacy/[slug]` プライバシーポリシー（Markdown）
  - `/contact` 連絡先（共通）
- 重要：App Store Connect に入力するURLは下記の形で統一する  
  - Support URL: `/support/<app_slug>`  
  - Privacy URL: `/privacy/<app_slug>`

---

## 作業タスク一覧（順番に実施）

### 1) 新規リポジトリ作成 & Astro 初期化

- `astro` を使って新規プロジェクトを作成
- TypeScript は有効
- CSS はシンプル（後から変えられるように）

---

### 2) コンテンツコレクション設計

以下のコレクションを Astro の `content collections` で管理する

- `projects`（ポートフォリオ用：アプリ/サービス一覧 & 詳細）
- `support`（アプリのサポートページ）
- `privacy`（アプリのプライバシーポリシー）

各コレクションの frontmatter schema 例：

#### projects

- `title`（表示名）
- `type`（app | web）
- `platforms`（["iOS","Android","Web"] など）
- `status`（active | maintenance | archived）
- `storeUrl`（任意）
- `repoUrl`（任意）
- `siteUrl`（任意）
- `summary`（短い説明）
- `tags`（任意）

#### support

- `appName`
- `contactEmail`
- `responseTime`（例：48 hours）
- `faq`（配列でも良いが、本文に書いてもOK）

#### privacy

- `appName`
- `effectiveDate`（施行日）
- `contactEmail`
- `dataCollected`（例：["Usage Data","Crash Logs"]）
- `thirdParties`（例：["Firebase Analytics"]）

---

### 3) ページ作成

以下を作る：

#### トップ `/`

- ヒーロー
- 最新プロジェクト数件
- Support/Privacy が必要な人向け導線は不要（内部ページとして存在してればOK）

#### 一覧 `/apps`

- `projects` のうち `type=app` を一覧表示
- カード形式で `title / summary / platforms / tags` を表示
- 詳細ページへのリンク

#### 個別 `/apps/[slug]`

- `projects` の Markdown を表示
- App Store / Google Play / Web へのリンクボタン（存在するものだけ）

#### サポート `/support/[slug]`

- `support` の Markdown を表示
- 連絡先メールを必ず表示
- “不具合報告テンプレ” も入れる

#### プライバシー `/privacy/[slug]`

- `privacy` の Markdown を表示
- 最低限の項目が揃っているテンプレを用意

#### 連絡先 `/contact`

- 共通の連絡先（メール）を表示
- 問い合わせフォームは optional（Google Form の埋め込みでもOK）

---

### 4) UI / デザイン

- Tailwind は使わない（まずは最小CSS）
- ただし見た目は最低限整える：
  - ヘッダー（Home / Apps / Contact）
  - フッター（© / Privacy / Contact）
  - コンテンツ幅は最大 `960px` くらい
  - Markdown 表示は読みやすく

---

### 5) 量産運用のためのテンプレを用意

`src/content/` 以下にサンプルとして、最低3つ入れる：

- `projects/sample-app.md`
- `support/sample-app.md`
- `privacy/sample-app.md`

そして README に

- 「アプリを追加する手順（Markdownコピーするだけ）」
- 「App Store Connect に貼るURL」
- 「Cloudflare Pages へのデプロイ方法」

を書いておく

---

### 6) Cloudflare Pages デプロイ要件

- `npm run build` で `dist/` を生成
- Cloudflare Pages の Build Settings は以下を推奨：
  - Framework preset: Astro
  - Build command: `npm run build`
  - Build output directory: `dist`

また、Cloudflare Pages で `custom domain` を設定する前提で  
`apps.example.com` などのサブドメインにも対応できるようにする。

---

## 追加要件（重要）

### Support/Privacy の URL を「必ず存在する状態」にする

App Store 審査用に、各アプリの support/privacy ページは必ず公開されている必要がある。  
最低限の内容（連絡先・方針）が入っていればよい。

### “共通テンプレ + アプリ差分” をしやすくする

privacy policy の文章は 80% 共通で良いので、  
テンプレをコピペして appName だけ変える運用にする。

---

## 成果物

最終的に以下をコミットして完成させてほしい：

- Astro プロジェクト一式
- content collections 設計
- ルーティング実装（一覧・詳細・support/privacy）
- CSS最低限
- サンプル Markdown 3種
- README（運用手順とApp Store用URL）

---

## 実装時の注意

- すべて静的生成（SSG）でOK
- `/support/[slug]` `/privacy/[slug]` の slug は app の slug と一致させる
- 存在しないslugは 404
- links は存在するものだけ出す

---

## 最小テンプレ文面（必須）

### Support ページに含める固定文（例）

- 連絡先メール
- 返信目安
- 不具合報告テンプレ：
  - アプリ名 / バージョン
  - 端末 / OS
  - 再現手順
  - 期待する挙動
  - 実際の挙動

### Privacy Policy に含める固定文（例）

- 収集するデータ
- 利用目的
- 第三者提供
- ユーザーの権利（削除依頼など）
- 連絡先

これらも Markdown 側に雛形として作成しておくこと。

---

## 最終指示（Claude Code へ）

上記仕様をすべて実装し、Cloudflare Pages にデプロイできる状態で仕上げてください。  
完了後、以下も出力してください：

- Cloudflare Pages の設定手順（画面で何を選ぶか）
- App Store Connect に貼る Support / Privacy URL の具体例
- 新しいアプリを追加する具体手順（どのファイルをコピーして何を編集するか）

---

## 将来拡張（今は実装不要）

- OG画像自動生成
- RSS
- analytics
- 作品のスクショギャラリー

---
