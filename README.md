# minasehiro

Portfolio & App Store Support Site built with Astro, deployed on Cloudflare Pages.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Adding a New App

When you release a new app, add three Markdown files:

### 1. Create project file

Copy `src/content/projects/sample-app.md` to `src/content/projects/<app-slug>.md`:

```yaml
---
title: Your App Name
type: app
platforms:
  - iOS
  - Android
status: active
storeUrl: https://apps.apple.com/app/id123456789
summary: Short description of your app.
tags:
  - Category
---

## About
App description here...
```

### 2. Create support page

Copy `src/content/support/sample-app.md` to `src/content/support/<app-slug>.md`:

```yaml
---
appName: Your App Name
contactEmail: support@minasehiro.art
responseTime: 48 hours
---

## FAQ
Your FAQ content here...
```

### 3. Create privacy policy

Copy `src/content/privacy/sample-app.md` to `src/content/privacy/<app-slug>.md`:

```yaml
---
appName: Your App Name
effectiveDate: "2024-01-01"
contactEmail: privacy@minasehiro.art
dataCollected:
  - Usage Data
  - Crash Logs
thirdParties:
  - Firebase Analytics
---

Your privacy policy content here...
```

### 4. Deploy

Push to GitHub. Cloudflare Pages will automatically build and deploy.

## App Store Connect URLs

For each app, use these URLs in App Store Connect:

| Field | URL |
|-------|-----|
| Support URL | `https://minasehiro.art/support/<app-slug>` |
| Privacy Policy URL | `https://minasehiro.art/privacy/<app-slug>` |

Example for `sample-app`:
- Support: `https://minasehiro.art/support/sample-app`
- Privacy: `https://minasehiro.art/privacy/sample-app`

## Cloudflare Pages Deployment

### Initial Setup

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click "Create a project" > "Connect to Git"
3. Select your GitHub repository
4. Configure build settings:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click "Save and Deploy"

### Custom Domain

1. Go to your Pages project > "Custom domains"
2. Click "Set up a custom domain"
3. Enter `minasehiro.art`
4. Follow DNS configuration instructions

## Project Structure

```
src/
├── content/
│   ├── projects/     # App/portfolio entries
│   ├── support/      # Support pages
│   └── privacy/      # Privacy policies
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro
│   ├── apps/
│   ├── support/
│   ├── privacy/
│   └── contact.astro
└── content.config.ts  # Collection schemas
```

## License

Private
