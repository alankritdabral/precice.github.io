# Proposal: Bootstrap 3 to Bootstrap 5 Upgrade for `precice.github.io`

## Executive summary

This site is still built around Bootstrap `3.3.7` and Bootstrap 3-era markup patterns. Moving to Bootstrap `5.3.x` is feasible, but it should be treated as a small frontend migration project, not just a version bump.

My recommendation is:

1. Do a quick interim update from Bootstrap `3.3.7` to `3.4.1`.
2. Migrate the site to Bootstrap `5.3.x` in phases while keeping `jQuery` temporarily for non-Bootstrap code.
3. Remove or rewrite the remaining jQuery-only pieces after the Bootstrap 5 migration is stable.

This avoids a risky "big bang" change and gives the project an immediate improvement even before the full migration is complete.

---

## Current state in this repo

### Framework and runtime setup

- `_includes/head.html` loads:
  - Bootstrap `3.3.7` CSS and JS from jsDelivr CDN
  - jQuery `3.3.1`
  - DataTables `1.10.13` when `page.datatable == true`
- There is no frontend package manager in this repo snapshot:
  - no `package.json`
  - no `yarn.lock`
  - no `pnpm-lock.yaml`
  - no bundler config
- The site is a Jekyll site driven by Ruby gems from `Gemfile`, so today the frontend is essentially CDN-based.

### Bootstrap 3-specific behavior found in the codebase

#### Global layout and navigation

- `_includes/topnav.html`
  - `navbar-inverse`
  - `navbar-toggle`
  - `icon-bar`
  - `data-toggle="collapse"`
  - `data-toggle="dropdown"`
  - `visually-hidden`
- `_layouts/default.html`
  - Bootstrap tooltip init
  - table wrapping into `.table-responsive`
  - navgoco sidebar initialization
  - DataTables init
- `js/customscripts.js`
  - jQuery Bootstrap tooltip calls
  - `shown.bs.tab`
  - `.tab('show')`
  - old sidebar `affix` logic

#### Content and markup hotspots

- `8` content files use Bootstrap tab markup with `data-toggle="tab"`.
- `33` `nav nav-tabs` occurrences were found.
- `216` card-related occurrences were found.
- `44` `img-fluid` occurrences were found.
- `42` `d-block mx-auto` occurrences were found.
- `11` `btn-outline-secondary` occurrences were found.
- `12` `offset-md-*` occurrences were found.

#### Main affected pages/files

- Landing page:
  - `content/index.html`
  - `css/landing-page.css`
- Global shell:
  - `_includes/head.html`
  - `_includes/topnav.html`
  - `_includes/sidebar.html`
  - `_layouts/default.html`
  - `_layouts/page.html`
- Theme and shared CSS:
  - `css/customstyles.css`
  - `css/customstyles-precice.css`
  - `css/theme-precice.css`
  - `css/printstyles.css`
- Tabbed docs pages:
  - `content/docs/couple-your-code/step-by-step/*` in 8 files

### jQuery dependencies that are not Bootstrap itself

Bootstrap 5 removes the Bootstrap-to-jQuery dependency, but this repo still has other jQuery code:

- `js/jquery.navgoco.min.js`
  - old jQuery sidebar plugin
- `js/toc.js`
  - jQuery-based table-of-contents plugin
- `_includes/toc.html`
- jQuery TOC initializer
- `_includes/algolia.html`
  - uses jQuery for result show/hide behavior

I also found `_includes/initialize_shuffle.html`, but I did not find it included anywhere in this repo snapshot. It looks like dead code and should be reviewed for removal rather than migration.

### DataTables status

The default layout contains optional DataTables loading, but I did not find any page currently enabling `datatable: true` in this repo snapshot. That suggests DataTables is dormant right now.

This is useful because it means we can likely:

- remove it entirely if no longer needed, or
- postpone its migration until after Bootstrap 5

---

## Why upgrade

### Benefits

- Bootstrap 3 is old and end-of-life.
- Bootstrap 5 is current, actively maintained, and better aligned with modern browsers.
- Bootstrap 5 removes Bootstrap's dependency on jQuery.
- Bootstrap 5 has better utilities, CSS variables, cleaner theming, and better accessibility helpers.
- The project can delete a meaningful amount of Bootstrap 3 override CSS once old component patterns are removed.

### Project-level benefits for this repo

- Cleaner navbar implementation
- Simpler responsive utilities
- Cleaner card-based landing page markup instead of card-based markup
- More consistent spacing via utilities instead of custom one-off CSS
- Easier future maintenance for docs contributors

---

## Recommended migration strategy

### Phase 0: quick safety upgrade to Bootstrap 3.4.1

This is the low-risk first step.

### Scope

- Change Bootstrap CDN references in `_includes/head.html` from `3.3.7` to `3.4.1`
- Keep current markup and JS behavior unchanged

### Why do this first

- It is much lower risk than jumping directly to v5
- It gets the project off `3.3.7`
- It gives the team a clean checkpoint before the real migration

### Expected impact

- Very low
- Mostly smoke-test level validation

---

### Phase 1: migrate Bootstrap runtime and global markup to v5

This is the real framework migration.

### Scope

- Update `_includes/head.html` to Bootstrap `5.3.x`
- Replace `bootstrap.min.js` with `bootstrap.bundle.min.js`
- Keep using CDN delivery initially
- Convert global shell markup:
  - top navbar
  - dropdowns
  - collapse toggle
  - sidebar wrapper classes
  - button variants

### Recommended target

- Bootstrap `5.3.x`, preferably current `5.3.8`

### Why `5.3.x` instead of just `5.0.x`

- Better CSS variable support
- More mature component behavior
- Better utility coverage
- Better long-term value for the same migration effort

---

### Phase 2: rewrite Bootstrap 3-specific JS usage

Bootstrap 5 will break old Bootstrap 3 jQuery APIs.

### Required rewrites

- Tooltip initialization
- Tab activation and tab-state persistence
- Collapse and dropdown data attributes
- Any code relying on Bootstrap jQuery plugin syntax

### Suggested replacements

- Replace:
  - `data-toggle="..."`
  - `data-target="..."`
  - `data-dismiss="..."`
- With:
  - `data-bs-toggle="..."`
  - `data-bs-target="..."`
  - `data-bs-dismiss="..."`

- Replace:
  - `$('...').tooltip()`
- With:
  - `new bootstrap.Tooltip(...)`

- Replace:
  - `$('...').tab('show')`
- With:
  - `bootstrap.Tab.getOrCreateInstance(...).show()`

---

### Phase 3: markup cleanup in content pages

This phase updates Bootstrap 3-era HTML patterns in pages and includes.

### Main class migrations

| Current | Bootstrap 5 direction | Notes |
|---|---|---|
| `navbar-inverse` | `navbar` + custom theme class | Bootstrap 5 navbars are structured differently |
| `navbar-toggle` + `icon-bar` | `navbar-toggler` + `navbar-toggler-icon` | Topnav needs markup rewrite |
| `card` | `card` | Major landing-page cleanup |
| `btn-outline-secondary` | usually `btn-outline-secondary` or a custom variant | Best decided by design preference |
| `label label-*` | `badge text-bg-*` | Only a few occurrences |
| `img-fluid` | `img-fluid` | Straightforward |
| `d-block mx-auto` | `d-block mx-auto` | Straightforward |
| `col-*` | `col-*` | Straightforward |
| `offset-md-*` | `offset-md-*` | Straightforward |
| `hidden-xs` etc. | `d-none d-sm-block` style utilities | Straightforward |
| `visually-hidden` | `visually-hidden` | Straightforward |

### Repo-specific content hotspots

- `content/index.html`
  - many `card` usages
  - `img-fluid`
  - `d-block mx-auto`
  - `hidden-xs`
  - `offset-md-*`
- `content/docs/couple-your-code/step-by-step/*`
  - tab navigation markup
- `content/docs/fundamentals/fundamentals-literature-guide.md`
  - card-based content blocks

---

## Dependency impact and alternatives

### 1. Bootstrap JS

### Current

- Bootstrap 3 JS with jQuery

### Impact in v5

- Old jQuery Bootstrap calls stop working
- All `data-toggle` attributes must be renamed to `data-bs-toggle`

### Replacement

- Use `bootstrap.bundle.min.js`
- Rewrite Bootstrap JS calls to native Bootstrap 5 API

---

### 2. jQuery

### Current

- Required by Bootstrap 3
- Also used by navgoco, TOC, and some local scripts

### Impact in v5

- Bootstrap no longer needs it
- The project still does

### Recommendation

- Do not promise "remove jQuery" in the Bootstrap 5 migration itself
- Keep jQuery temporarily
- Remove it only after the following are replaced:
  - navgoco
  - TOC plugin
  - Algolia helper bits
  - any page-specific leftover scripts

---

### 3. `jquery.navgoco.min.js`

### Current role

- Sidebar accordion behavior

### Risk

- Old jQuery plugin
- Tightly tied to old sidebar markup and old customization

### Best alternative

Preferred:

- Replace with native HTML/CSS/JS sidebar behavior
- Options:
  - `details` / `summary` based nested nav
  - small custom vanilla JS tree navigation
  - CSS-first expandable sidebar using existing active-state logic

Why this is better:

- removes an aging plugin
- simplifies accessibility work
- reduces jQuery lock-in

---

### 4. DataTables `1.10.13`

### Current role

- Optional only
- Not currently enabled by any page found in this repo snapshot

### Recommendation

Choose one:

1. Remove it now if unused
2. If needed later, reintroduce it with Bootstrap 5 styling using the official `dataTables.bootstrap5.*` files

This is a good candidate to defer until a real page actually needs it.

---

### 5. `js/toc.js`

### Current role

- jQuery plugin for generating page TOC

### Impact

- Not blocked by Bootstrap 5 directly
- But blocks full jQuery removal

### Recommendation

Short term:

- Keep it during the Bootstrap 5 migration

Long term:

- Replace with a small vanilla TOC script or pre-rendered Jekyll markup

---

### 6. Algolia helper code

### Current role

- `_includes/algolia.html` uses jQuery for result show/hide behavior

### Recommendation

- Convert to vanilla DOM APIs during or after the Bootstrap migration
- Low complexity

---

### 7. Dead or likely removable code

- `_includes/initialize_shuffle.html`
  - found in repo
  - no include usage found in this snapshot
  - should be reviewed for deletion

---

## Custom CSS reduction estimate

### Baseline

Main custom CSS files reviewed:

- `css/customstyles.css` - `1259` lines
- `css/customstyles-precice.css` - `414` lines
- `css/theme-precice.css` - `317` lines
- `css/landing-page.css` - `331` lines
- `css/modern-business.css` - `89` lines
- `css/printstyles.css` - `272` lines

Total reviewed custom CSS: about `2682` lines

I found at least `114` lines that are explicitly coupled to Bootstrap selectors, but the real dependency is higher because many rules depend on Bootstrap 3 markup structure rather than only class names.

### Conservative reduction

I would plan for a safe first-pass reduction of roughly:

- `300` to `500` lines removed or consolidated

This is realistic without over-promising.

### Stretch reduction

If the team also refactors the landing page and consolidates the theme layer well:

- `600` to `800` lines could likely be removed or merged

### Where the reduction comes from

### `css/theme-precice.css`

Biggest near-term win.

- Much of this file is Bootstrap 3 component theming:
  - navbar
  - buttons
  - panels
  - tabs
  - dropdowns
- Bootstrap 5 utilities and CSS variables can replace a large part of this.

Expected reduction:

- roughly `160` to `220` lines

### `css/customstyles.css`

Moderate win.

- Contains navbar, navgoco sidebar, card, tab, label, alert, and responsive overrides
- Also contains unrelated site styling that should remain

Expected reduction:

- roughly `120` to `220` lines in a first pass

### `css/customstyles-precice.css`

Moderate win.

- Some rules are site-specific and should remain
- Some are still tied to old Bootstrap table/tab/sidebar behavior

Expected reduction:

- roughly `40` to `80` lines

### `css/landing-page.css`

Smaller but real win.

- The landing page is card-heavy, but much of the styling is still genuinely custom
- Moving from `card` to `card`, and replacing grid hacks with utilities, will reduce some custom CSS

Expected reduction:

- roughly `30` to `70` lines

### `css/printstyles.css`

Keep most of it.

- Bootstrap 5 removed built-in print styling, so this file remains important
- Only small portions can likely be simplified

---

## Expected project impact

### What will definitely change

- Navbar markup and toggle behavior
- Dropdown markup and attributes
- Tab markup and JS hooks
- Landing page card/card markup
- Utility class names for responsive visibility and centering
- Some print handling and TOC styling around tabs

### What should not change functionally

- Jekyll content model
- page layouts and collections
- KaTeX
- Anchor.js
- most content authoring workflow

### Main regression risks

- top navigation collapsing incorrectly on mobile
- dropdowns losing behavior due to `data-bs-*` migration gaps
- sidebar expansion logic
- tabbed documentation pages not restoring active tab
- landing page layout spacing
- print output for tabbed code examples

---

## Proposed implementation plan

### Step 1

Upgrade to Bootstrap `3.4.1` only.

### Step 2

Create a Bootstrap 5 migration branch and update:

- `_includes/head.html`
- `_includes/topnav.html`
- `_layouts/default.html`
- `_layouts/page.html`
- `js/customscripts.js`

### Step 3

Migrate shared class usage:

- `btn-outline-secondary`
- `img-fluid`
- `d-block mx-auto`
- `hidden-*`
- `col-*-offset-*`
- `visually-hidden`

### Step 4

Convert panels to cards in:

- `content/index.html`
- `content/docs/fundamentals/fundamentals-literature-guide.md`
- other small card-based content pages

### Step 5

Retest:

- landing page
- docs pages with tabs
- mobile topnav
- sidebar
- print output

### Step 6

Optional follow-up:

- replace navgoco
- replace TOC plugin
- convert Algolia helper to vanilla JS
- remove jQuery if nothing else needs it

---

## Rough effort estimate

For one engineer familiar with the repo:

- Phase 0: `0.5` day
- Phase 1 to 3: `3` to `5` days
- QA and polish: `1` to `2` days
- Optional jQuery removal follow-up: `1` to `3` days

Total realistic range:

- `4.5` to `7.5` days for a solid Bootstrap 5 migration
- `6` to `10+` days if full jQuery cleanup is included

---

## Recommendation

Proceed with the migration, but do it in two milestones:

### Milestone A

- Upgrade `3.3.7` to `3.4.1`
- remove dead frontend code where possible
- prepare migration branch

### Milestone B

- migrate to Bootstrap `5.3.x`
- keep jQuery temporarily
- replace Bootstrap 3 markup and JS
- clean up custom CSS

This is the lowest-risk path and gives the best balance of modernization, maintainability, and delivery speed.

---

## Reference links

- Bootstrap 3 end-of-life and upgrade recommendation:
  - https://getbootstrap.com/docs/3.4/getting-started/
- Bootstrap 5 migration guide:
  - https://getbootstrap.com/docs/5.3/migration/
- Bootstrap 5 quick start and CDN bundle:
  - https://getbootstrap.com/docs/5.3/getting-started/introduction/
- DataTables Bootstrap 5 integration:
  - https://datatables.net/manual/styling/bootstrap5
