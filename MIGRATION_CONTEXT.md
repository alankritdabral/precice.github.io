# Migration Continuation Context

## Objective
Continue the migration of `precice.github.io` from Bootstrap 3 to Bootstrap 5.3.8. The goal is modern functionality with identical visual aesthetics.

## Current State
- **Navbar**: Fully migrated and visually matched. Uses `navbar-expand-xl` and custom `.icon-bar` for the toggler.
- **Sidebar**: Fully modernized with native Bootstrap 5 `collapse`. Implements accordion behavior with custom logic for Blue (Level 1 Open) and Orange (Level 2 Open) highlights. Legacy `navgoco` completely removed.
- **Landing Page Panels**: All legacy `panel` elements converted to `card` structures. Visual density of Logowall improved with flex-wrap. News cards and USP headers have consistent sizing.
- **Global Attributes**: All `data-toggle`, `data-target`, and `data-placement` attributes updated to `data-bs-*` project-wide.
- **Infrastructure**: Bootstrap 5.3.8 linked and verified.

## Next Steps for Future Sessions
1. **CSS Cleanup**: Remove redundant legacy `.panel` and `.nav > li > a` rules from `customstyles.css` once site-wide stability is confirmed.
2. **Component Audit**: Audit any remaining custom JS components (e.g., Shuffle.js if used) for BS5 compatibility.

## Key Files for Reference
- `_includes/topnav.html`: Reference for correct BS5 navbar structure.
- `css/theme-precice.css`: Contains the primary visual overrides.
- `MIGRATION_PROGRESS.md`: Detailed history of changes made in the previous session.

## Resuming Instruction
"Continue the migration starting with the Landing Page Panels in `content/index.html`. Refer to `MIGRATION_PROGRESS.md` for what has already been done."
