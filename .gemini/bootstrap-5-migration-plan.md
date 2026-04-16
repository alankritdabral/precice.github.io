# Bootstrap 5 Migration Plan

## Objective
Migrate `precice.github.io` from Bootstrap 3.3.7 to Bootstrap 5.3.x, replacing legacy markup, custom CSS overrides, and jQuery-dependent components with modern equivalents. Every change will be accompanied by a "diff-style" analysis to ensure visual and functional parity.

## Methodology: "Diff & Verify" Approach
For every file modified during this migration, the following workflow will be executed:
1. **Target Identification:** Select the file or component to migrate.
2. **Draft Modification:** Apply Bootstrap 5 equivalents (e.g., `navbar-inverse` → `navbar`, `data-toggle` → `data-bs-toggle`).
3. **Diff Analysis:** Compare the original code to the new code, documenting the structural changes.
4. **Impact Assessment:** Evaluate the effect on styling (CSS) and functionality (JS/interaction).
5. **Verification & Fixing:** If the change causes regressions (e.g., spacing issues, broken dropdowns), apply targeted fixes using Bootstrap 5 utility classes or minimal custom CSS.

## Implementation Phases

### Phase 1: Framework & Global Infrastructure Update
*   **Target Files:** `_includes/head.html`, `_layouts/default.html`
*   **Actions:**
    *   Update CDN links to Bootstrap 5.3.x CSS and JS bundle (`bootstrap.bundle.min.js`).
    *   Retain jQuery temporarily for legacy scripts (navgoco, toc.js) while converting Bootstrap-specific JS initialization (e.g., tooltips) to native BS5 APIs.
*   **Verification:** Ensure the site loads without console errors related to Bootstrap initialization.

### Phase 2: Core Layout Migration (Navbar & Sidebar)
*   **Target Files:** `_includes/topnav.html`, `_includes/sidebar.html`
*   **Actions:**
    *   Rewrite top navigation markup (e.g., `navbar-toggle` to `navbar-toggler`).
    *   Update dropdown data attributes (`data-bs-toggle="dropdown"`).
    *   Adjust sidebar accordion classes.
*   **Verification:** Test mobile menu collapse, dropdown functionality, and sidebar expansion logic.

### Phase 3: CSS Cleanup & Theme Alignment
*   **Target Files:** `css/theme-precice.css`, `css/customstyles.css`, `css/landing-page.css`
*   **Actions:**
    *   Remove legacy BS3 component overrides (e.g., `.panel`, `.navbar-inverse`).
    *   Replace custom utility classes (like `hidden-xs`) with native BS5 utilities (`d-none d-sm-block`).
    *   Ensure the site maintains its "preCICE theme" (colors, typography) using BS5 CSS variables where applicable.
*   **Verification:** Visually inspect global spacing, button colors, and responsive breakpoints.

### Phase 4: Content Hotspots (Landing Page & Docs)
*   **Target Files:** `content/index.html`, `content/docs/**/step-by-step/*`
*   **Actions:**
    *   Convert "Panels" to "Cards" on the landing page.
    *   Update grid classes (`col-md-offset-*` to `offset-md-*`).
    *   Update image responsiveness (`img-responsive` to `img-fluid`).
    *   Update tabbed navigation markup in documentation pages (`data-bs-toggle="tab"`).
*   **Verification:** Check landing page alignment and ensure tab switching works correctly in the documentation.

### Phase 5: JavaScript Refactoring
*   **Target Files:** `js/customscripts.js`
*   **Actions:**
    *   Rewrite jQuery-based Bootstrap calls (e.g., `$('.tooltip').tooltip()`) to vanilla JS (`new bootstrap.Tooltip()`).
    *   Update tab persistence logic to handle BS5 tab events (`shown.bs.tab`).
*   **Verification:** Ensure tooltips appear on hover and active tabs are remembered across page loads.

## Execution Strategy
I will utilize the specialized `bootstrap-migrator` sub-agent for the heavy lifting of these file modifications, orchestrating its efforts phase-by-phase according to this plan.