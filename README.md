# TeleGate Web

TeleGate Web is a marketing and legal-information website for the TeleGate mobile product, a Telegram bot management platform.

## Overview

The project provides:

- a landing page with product messaging and App Store / Google Play links;
- legal pages (About, Privacy Policy, Terms of Use);
- mobile-specific legal routes (including account deletion guidance);
- localization support for English and Ukrainian.

## Tech Stack

- Next.js 14 (Pages Router)
- React 18
- TypeScript 5 (strict mode)
- Material UI (MUI) + Emotion
- Lingui i18n (`@lingui/react`, `@lingui/cli`, PO catalogs)
- Zod (schema validation utilities)

## Project Structure

```text
src/
	app/                  # Global styles
	components/           # Shared UI and layout components
	constants/            # Shared constants
	localization/         # i18n provider, helpers, message catalogs (en/uk)
	pages/                # Next.js routes
	providers/            # App-level providers and constants
	screens/              # Page-level screen components
public/                 # Static assets
```

## Main Routes

- `/` - Landing page
- `/about` - About page
- `/privacy-policy` - Privacy policy
- `/term-of-use` - Terms of use
- `/mobile/about` - Mobile about page
- `/mobile/privacy-policy` - Mobile privacy policy
- `/mobile/term-of-use` - Mobile terms of use
- `/mobile/how-delete-user` - Account deletion instructions

## Localization

- Locales: `en`, `uk`
- Catalog path: `src/localization/{locale}/messages.po`
- Lingui config: `lingui.config.ts`

Useful i18n commands:

```bash
npm run lingui:add
npm run lingui:extract
npm run lingui:compile
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production commands:

```bash
npm run build
npm run start
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - build for production
- `npm run start` - run production server
- `npm run lint` - run lint checks
- `npm run lingui:add` - add locale
- `npm run lingui:extract` - extract translation messages
- `npm run lingui:compile` - compile translations to TypeScript
- `npm run lingui:compile:ci` - strict compile for CI

## Security Notes

- Keep all secrets in local environment files only (for example, `.env.local`).
- Do not commit any API keys, OAuth secrets, JWT secrets, or private keys.
- If a secret is exposed, rotate/revoke it immediately in the provider console.
- `keys.txt` should not contain sensitive private material; store only non-secret metadata if needed.

## License

Proprietary. All rights reserved.
