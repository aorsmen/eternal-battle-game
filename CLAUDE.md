# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project overview

**Eternal Battle** (package name `hero-flow`) is a client-only React 19 + TypeScript SPA built with Vite. It has two main features:

- **Herodex** (`/herodex`): a searchable, paginated roster of heroes and villains. `/herodex/:id` is a character page (stats, biography, appearance) and `/herodex/compare?ids=…` compares up to 4 characters. A compare tray follows the user between the roster and character pages.
- **Battle**: a card game where the player picks heroes or villains on `/battle` (side selection page), then plays against the computer on `/battle/play`: 5 rounds × 5 card battles, with GSAP animations.

Other routes: `/` (Home menu) and `/credits`. There is no backend. All hero data is static JSON in `public/data/all-heroes.json`, fetched with TanStack Query (`src/config/api.ts`).

## Commands

```bash
npm run dev            # Vite dev server
npm run build          # tsc -b && vite build  → outputs to build/
npm run lint           # eslint .
npm test               # vitest (watch mode by default)
npm run test:ci        # vitest --run --reporter=summary (single run)
npx vitest --run src/components/Gameplay/SideBoard   # run one test file/folder
```

Coverage scripts (`test:coverage*`) need `@vitest/coverage-v8`, which is not currently in `devDependencies`.

## Architecture

```
src/
  App.tsx            # ThemeProvider + QueryClientProvider + BrowserRouter; views are lazy-loaded
  views/             # Route-level pages: Home, Herodex (layout), HerodexList, Character, Compare, Battle (layout), SideSelect, Gameplay, Credits
  components/
    Herodex/         # RosterCard, CompareTray, Pagination, Character*, Compare*, SideIcon
    Gameplay/        # GameBoard, SideBoard, SideHands, *CardMotion, dialogs, GameSummary*
    HeroCard/        # Shared card used by both features
    UI/              # Header, Loading, TopBar, ActionButton
  store/
    Herodex/         # HerodexContext: roster, filters, page, compare picks
    Game/            # GameContext: battle state machine (sides, decks, hands, battles, rounds)
  hooks/             # useHerodexContext / useGameContext: thin useContext wrappers, useDebounce
  helpers/hero.ts    # calculateSkills (powerstats → skills), calculateValues (skills → attack/defense)
  config/            # general.ts (MUI theme, colors, card/header sizes), hero.ts (data maps, labels), game.ts, pages.ts, api.ts
  types/             # main.types.ts (HeroDataType, HerodexContextType), game.types.ts, pages.types.ts
  __fixtures__/      # Test render helpers + testData.ts
```

Key points:
- **State is React Context, scoped per view.** `HerodexContextProvider` lives in the `Herodex` layout route (`views/Herodex`), so the roster, character and compare pages share filters, page and compare picks, and `GameContextProvider` lives in the `Battle` layout route (`views/Battle`), so `/battle` (SideSelect) and `/battle/play` (Gameplay) share one game state. Gameplay redirects to `/battle` while `sides.player.type` is `null`. Components read state through `useHerodexContext()` / `useGameContext()`. When you add a field to a context, update all four places: the type in `src/types/`, `initState` in the store, the provider `value`, and the hook's destructure/return.
- **Game flow** (`store/Game`): `setSideSelection` → `startNewRound` → the effect auto-draws cards until each hand holds 5 → `revealCard(i)` → `setBattleResult(i)` → once 5 battles are done, an effect calls `setRoundScore` → `completeRound` → `goToNextRound`. The game ends after round index 4 (`isGameOver`). A battle is won when attack ≥ the opponent's defense **and** defense > the opponent's attack.
- **Hero skills/values are computed at runtime** from `powerstats` via `helpers/hero.ts`. They are not stored in the JSON.
- **Responsive sizing:** there are two size buckets, `"lg"` and `"sm"`, chosen with `useMediaQuery(theme.breakpoints.up("lg"))`. Size constants (`HERO_CARD_WIDTH`, `HERO_CARD_HEIGHT`, `HEADER_HEIGHT`) are keyed by these buckets in `config/general.ts`.
- Note: field names spell `acuracy` with one "c" throughout (types, config, data). Keep it consistent; don't "fix" it in one place only.

## Conventions

- Each component lives in its own folder: `index.tsx` (default export), an optional `styled.components.tsx` (MUI-based wrapper components that use `sx`/props, not `@emotion/styled` templates), an optional `.css` file, and a co-located `<Name>.test.tsx`.
- Arrow-function components with a default export. Props are typed inline.
- MUI 9: `Stack` no longer accepts layout props like `alignItems`/`justifyContent`; put them in `sx`. Only `direction`, `spacing`, etc. stay as props.
- Redesign in progress: Home, SideSelect, the Battle pages and the Herodex pages use the new look (`EB_*` colors and Anton/Barlow fonts in `config/general.ts`, from the "Eternal Battle Redesign" design canvas). The other pages still use the original theme. Migrate a page only when asked.
- Styling uses MUI components with `sx`. Use the color and size constants from `config/general.ts` instead of hard-coding values. Title font: `TITLE_STYLE` (Rakkas, loaded in `index.html`).
- Imports: use the `@/` alias (→ `src/`) for anything outside the current folder, e.g. `import { YELLOW } from "@/config/general"`. Keep `./` only for files in the same folder, e.g. `./styled.components`. The alias is defined in both `tsconfig.json` (`paths`) and `vite.config.ts` (`resolve.alias`). Keep the two in sync.
- Formatting: double quotes, semicolons, 2-space indent (Prettier-style).

## Testing

- Vitest with `globals: true` + jsdom + Testing Library. Setup is in `src/setupTests.ts` (jest-dom and a `matchMedia` mock).
- Render with the fixtures in `src/__fixtures__/`:
  - `renderWithProviders(ui, { withRouter })`: theme + query client
  - `renderGameContext(ui, { providerProps: { value }, withRouter })`
  - `renderHerodex(path)`: the real Herodex routes at `path` (stub `fetch` with `TEST_HERODEX_DATA`)
  - Mock data: `TEST_HERO_DATA`, `TEST_HERO_DATA_2`, `TEST_VILLAIN_DATA`, `TEST_HERODEX_DATA`, `TEST_GAME_CONTEXT`, `TEST_END_GAME_ROUND(S)` in `testData.ts`.
- Test files usually start with `// @ts-nocheck`. Test files are excluded from `tsconfig.json`.
- After changing a component, update its co-located test.

## Other notes

- `html/` is a committed production build snapshot (not the Vite output dir, which is `build/`). Don't edit it by hand.
- `vite.config.ts` defines `process.env` as `{}` to satisfy libraries that reference it.
- **PWA:** `vite-plugin-pwa` in `vite.config.ts` generates the manifest and a Workbox service worker (`build/sw.js`). It precaches the app shell, icons and `public/data/*.json`, and runtime-caches Google Fonts and hero images. The service worker only runs in a production build (`npm run build && npm run preview`). `registerType: "prompt"`: `components/UI/UpdatePrompt` asks before loading a new version. Tests that render it mock `virtual:pwa-register/react`. Icons live in `public/` (`favicon.svg`/`.ico`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`).
