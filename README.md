# Verba

[![ci](https://github.com/maku85/verba/actions/workflows/ci.yml/badge.svg)](https://github.com/maku85/verba/actions/workflows/ci.yml)

Project demo is available <a href="https://maku85.github.io/verba/">here</a>.

## Overview

Verba is a Next.js app for discovering and learning Italian words, with daily challenges, gamification, and multilingual support.

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS
- **i18n:** next-intl (with dynamic language switching)
- **State:** React Context for language, localStorage for user progress
- **Build:** pnpm
- **Deployment:** GitHub Pages (static export)
- **PWA:** Manifest and icons included

## Scripts

```bash
# install dependencies
pnpm install

# development server (hot reload)
pnpm dev

# build for production
pnpm build

# validate words data
pnpm validate-words

# help for word management script
pnpm words-help

# lint code
pnpm lint
```

## Internationalization

- Translation files in `/messages/` (it.json, en.json, etc.)
- Dynamic language switching via context and next-intl.

## Project Structure

- `src/app/` - Main app pages and layout
- `src/components/` - UI components (DailyWord, WordChallenge, UserStats, etc.)
- `src/context/LanguageContext.tsx` - Language context provider
- `src/hooks/useTranslations.ts` - Translation hook
- `src/data/words.json` - Word data
- `public/` - Static assets, manifest, icons

## PWA

- Manifest and icons in `public/manifest.json`
- Theme color and standalone display

## License

MIT

---

For more details, see the [Next.js documentation](https://nextjs.org/).
