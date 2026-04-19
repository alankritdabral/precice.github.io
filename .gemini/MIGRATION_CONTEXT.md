# Migration Continuation Context

## Objective
Continue the migration of `precice.github.io` from Bootstrap 3 to Bootstrap 5.3.8. The goal is modern functionality with identical visual aesthetics.

## Current State
- **Navbar**: Fully migrated and visually matched. Uses `navbar-expand-xl` and custom `.icon-bar` for the toggler.
- **CSS**: Base state classes (`.navbar-inverse` -> `.navbar`, `.open` -> `.show`) have been updated in `css/`.
- **Infrastructure**: Bootstrap 5.3.8 CDN is linked in `_includes/head.html`.

## Next Immediate Tasks
1. **Landing Page Panels**: Open `content/index.html`. Convert all remaining `panel`, `panel-heading`, and `panel-body` structures to `card`, `card-header`, and `card-body`. 
    - *Note*: Ensure `mx-auto d-block` is used for centering images (replaces `center-block`).
2. **Sidebar Migration**: Modernize `_includes/sidebar.html`. The current sidebar uses the `navgoco` jQuery plugin. This should be replaced with Bootstrap 5 `collapse` or a more modern sticky navigation approach.
3. **Global Attribute Update**: Run a project-wide search for `data-toggle`, `data-target`, and `data-placement`. These must be updated to `data-bs-toggle`, `data-bs-target`, and `data-bs-placement`.

## Key Files for Reference
- `_includes/topnav.html`: Reference for correct BS5 navbar structure.
- `css/theme-precice.css`: Contains the primary visual overrides.
- `MIGRATION_PROGRESS.md`: Detailed history of changes made in the previous session.

## Resuming Instruction
"Continue the migration starting with the Landing Page Panels in `content/index.html`. Refer to `MIGRATION_PROGRESS.md` for what has already been done."
