# minasehiro - Portfolio & App Store Support Site

## プロジェクト概要

Cloudflare Pages 上で運用する静的サイト。以下を目的とする：
- App Store 審査用の Support / Privacy Policy ページ管理
- ポートフォリオサイト（アプリ・サービス一覧）

## 技術スタック

- **フレームワーク**: Astro (SSG)
- **言語**: TypeScript
- **スタイル**: Vanilla CSS（Tailwind不使用、最小限）
- **コンテンツ管理**: Astro Content Collections (Markdown/MDX)
- **ホスティング**: Cloudflare Pages
- **ドメイン**: minasehiro.art

## ディレクトリ構造

```
.
├── src/
│   ├── content.config.ts  # Content Collections スキーマ定義
│   ├── content/
│   │   ├── projects/      # ポートフォリオ用 Markdown
│   │   ├── support/       # サポートページ用 Markdown
│   │   └── privacy/       # プライバシーポリシー用 Markdown
│   ├── config/
│   │   ├── index.ts       # サイト設定・ナビゲーション
│   │   └── links.ts       # SNS リンク設定
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro        # Home（Engineer/Photographer 抜粋）
│       ├── engineer.astro     # エンジニアページ
│       ├── photographer.astro # カメラマンページ
│       ├── about.astro        # プロフィール統合ページ
│       ├── contact.astro
│       └── projects/
│           ├── [slug].astro           # プロジェクト詳細
│           └── [slug]/
│               ├── support.astro      # サポートページ
│               └── privacy.astro      # プライバシーポリシー
├── public/
│   ├── images/
│   │   └── services/      # SNS アイコン SVG
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## サイト構成

```
Home (/) → Engineer (/engineer) → Photographer (/photographer) → Contact (/contact)
```

- **Home**: Engineer/Photographer の作品を抜粋表示
- **Engineer**: 技術スタック、プロジェクト一覧、GitHub/Zenn リンク
- **Photographer**: 機材、ギャラリー、Instagram リンク
- **About**: 統合プロフィール（Engineer/Photographer へのリンク）
- **Projects**: プロジェクト詳細ページ（アプリ・Webサービス共通）

## 開発コマンド

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# ビルド結果プレビュー
npm run preview
```

## コンテンツ追加手順

### 新しいアプリを追加する場合

1. `src/content/projects/<app-slug>.md` を作成（projects スキーマに従う）
2. `src/content/support/<app-slug>.md` を作成（support スキーマに従う）
3. `src/content/privacy/<app-slug>.md` を作成（privacy スキーマに従う）
4. Git push → Cloudflare Pages が自動デプロイ

**自動的に反映される場所:**
- Home ページの Engineer セクション（最新3件）
- Engineer ページの Projects セクション
- `/projects/<app-slug>` で個別ページ生成

### App Store Connect に設定するURL

- **Support URL**: `https://minasehiro.art/projects/<app-slug>/support`
- **Privacy Policy URL**: `https://minasehiro.art/projects/<app-slug>/privacy`

### Engineer ページの Tech Stack 更新

`src/pages/engineer.astro` の `techStack` 配列を直接編集:

```typescript
const techStack = [
  ['Python', 'Dart', 'Ruby', 'TypeScript'],        // 言語
  ['FastAPI', 'Flutter', 'Rails', 'Next.js'],      // フレームワーク
  ['AWS', 'Google Cloud', 'Firebase', 'Cloudflare'], // インフラ
  ['Claude', 'GPT', 'Gemini'],                     // AI
];
```

### Photographer ページの更新

#### 機材追加
`src/pages/photographer.astro` の `equipment` オブジェクトを編集:

```typescript
const equipment = {
  cameras: [
    { name: 'Sony α7 IV', note: 'メイン機' },
  ],
  lenses: [
    { name: 'FE 24-70mm F2.8 GM II', note: '標準ズーム' },
  ],
};
```

#### ギャラリー画像追加（将来実装予定）
現在はプレースホルダー表示。実装時は `galleryPreview` 配列を画像パスに変更予定。

### SNS リンク追加

`src/config/links.ts` を編集:

```typescript
export const links = [
  {
    name: 'サービス名',
    link: 'https://...',
    description: '説明文',
    avatar: '/images/services/サービス名.svg',  // SVG アイコンを public/images/services/ に配置
  },
  ...
];
```

## Content Collections スキーマ

### projects
- `title`: 表示名
- `type`: "app" | "web"
- `platforms`: プラットフォーム配列（各要素に name と status）
  - `name`: プラットフォーム名（iOS, Android, Web など）
  - `status`: "active" | "development" | "maintenance" | "archived"
- `icon`: アイコン画像パス（任意）
- `storeUrl`: App Store URL（任意）
- `repoUrl`: リポジトリURL（任意）
- `siteUrl`: サイトURL（任意）
- `summary`: 短い説明
- `tags`: タグ配列（任意）

### support
- `appName`: アプリ名
- `contactEmail`: 連絡先メール
- `responseTime`: 返信目安（例: "48 hours"）

### privacy
- `appName`: アプリ名
- `effectiveDate`: 施行日
- `contactEmail`: 連絡先メール
- `dataCollected`: 収集データ配列
- `thirdParties`: 第三者サービス配列

## CI/CD・自動デプロイ設定

### Cloudflare Pages + GitHub 連携

#### 初期設定手順

1. **Cloudflare Dashboard でプロジェクト作成**
   - [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create
   - 「Connect to Git」を選択
   - GitHub アカウントを連携し、リポジトリを選択

2. **ビルド設定**
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`（デフォルト）
   - **Node.js version**: 18 以上推奨

3. **カスタムドメイン設定**
   - Custom domains → Add domain → `minasehiro.art`
   - Cloudflare DNS で CNAME レコードが自動追加される

#### 自動デプロイの動作

| ブランチ | デプロイ先 | URL |
|---------|-----------|-----|
| `main` | Production | https://minasehiro.art |
| その他 | Preview | https://{branch}.{project}.pages.dev |

#### デプロイフロー

```
git push origin main
    ↓
Cloudflare Pages が検知
    ↓
npm install → npm run build
    ↓
dist/ を Cloudflare Edge にデプロイ
    ↓
https://minasehiro.art に反映
```

#### 環境変数（必要な場合）

Cloudflare Dashboard → Settings → Environment variables で設定:

```
NODE_VERSION=20
```

#### Preview デプロイ

PR 作成時やブランチ push 時に自動で Preview 環境が作成される:
- PR にコメントで Preview URL が投稿される
- 本番反映前の確認に利用可能

### トラブルシューティング

**ビルド失敗時:**
1. Cloudflare Dashboard → Deployments で失敗ログを確認
2. ローカルで `npm run build` が成功するか確認
3. Node.js バージョンを確認（Functions → Settings）

**キャッシュクリア:**
- Cloudflare Dashboard → Caching → Purge Everything
