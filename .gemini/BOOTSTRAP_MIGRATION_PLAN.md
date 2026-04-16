# Bootstrap 5.3 Migration Plan

This document outlines the plan for migrating the precice.github.io website from Bootstrap 3.4.1 to Bootstrap 5.3.8. The primary goal is to modernize the frontend stack while ensuring complete visual consistency with the current design.

## 1. Migration Strategy

The migration will be conducted in a phased approach to minimize risk and ensure a smooth transition.

### Phase 0: Preparation (Already Complete)

The site is already on Bootstrap 3.4.1, the latest and final release of Bootstrap 3. This is a good starting point.

### Phase 1: Core Framework Upgrade

This phase involves swapping the core Bootstrap files and updating the main layouts.

- **Target:** Bootstrap 5.3.8
- **jQuery:** Keep jQuery 3.3.1 for now, as several scripts still depend on it. Bootstrap 5 itself does not require jQuery.

**Action Items:**

1.  **Update `_includes/head.html`:**
    -   Replace the Bootstrap 3.4.1 CSS link with the Bootstrap 5.3.8 CSS link.
    -   Replace the Bootstrap 3.4.1 JavaScript link with the Bootstrap 5.3.8 **bundle** (`bootstrap.bundle.min.js`). The bundle includes Popper.js, which is required for dropdowns, tooltips, and popovers.
    -   Keep the jQuery link.

2.  **Update `_layouts/default.html` and `_layouts/page.html`:**
    -   Review and update the main layout structure to be compatible with Bootstrap 5. This will involve checking for any structural changes needed for containers, rows, and columns.

### Phase 2: JavaScript and `data-*` Attribute Migration

Bootstrap 5 replaces the jQuery-dependent JavaScript plugins and `data-toggle` attributes with a new vanilla JS API and `data-bs-toggle` attributes.

**Action Items:**

1.  **Update `data-` attributes:**
    -   Globally search and replace `data-toggle` with `data-bs-toggle`.
    -   Globally search and replace `data-target` with `data-bs-target`.
    -   Globally search and replace `data-dismiss` with `data-bs-dismiss`.

2.  **Update JavaScript Initializers in `js/customscripts.js`:**
    -   **Tooltips:** Replace `$('...').tooltip()` with the new vanilla JS initializer: `new bootstrap.Tooltip(document.getElementById('...'))`.
    -   **Tabs:** Replace `$('...').tab('show')` with `bootstrap.Tab.getOrCreateInstance(document.querySelector('...')).show()`.
    -   **Affix/Scrollspy:** The old `.affix` logic for the sidebar will need to be replaced with Bootstrap 5's `position: sticky` and potentially Scrollspy for highlighting active sections.

### Phase 3: HTML Markup and CSS Class Migration

This is the most extensive phase, requiring updates to HTML across many files to adopt the new Bootstrap 5 component structures and utility classes.

**Action Items:**

1.  **Navbar (`_includes/topnav.html`):**
    -   Rewrite the navbar markup completely. `navbar-inverse`, `navbar-toggle`, and `icon-bar` are removed. Use `navbar-expand-lg`, `navbar-dark` (or a custom class), `navbar-toggler`, and `navbar-toggler-icon`.

2.  **Panels to Cards:**
    -   The `panel` component is removed in Bootstrap 4/5. All instances of `.panel`, `.panel-heading`, `.panel-body`, and `.panel-footer` must be migrated to the `.card` component structure (`.card`, `.card-header`, `.card-body`, `.card-title`, etc.). This will heavily affect `content/index.html` and `content/docs/fundamentals/fundamentals-literature-guide.md`.

3.  **Utility Classes:**
    -   Replace responsive utilities like `hidden-xs`, `hidden-sm` with the new display utilities (e.g., `d-none d-sm-block`).
    -   Replace `col-*-offset-*` classes with the new offset classes, e.g., `offset-md-*`.
    -   Ensure image responsiveness with `img-fluid`.

4.  **Buttons and Badges:**
    -   The `label` component is replaced by the `badge` component. Replace `.label .label-*` with `.badge .text-bg-*`.

### Phase 4: Dependency and Custom CSS Cleanup

After the core migration is stable, the remaining jQuery dependencies and custom CSS overrides can be addressed.

**Action Items:**

1.  **Replace jQuery Plugins:**
    -   **`jquery.navgoco.min.js`**: This is for the sidebar. It can be replaced with a simple vanilla JS solution or by using Bootstrap's own Collapse component.
    -   **`toc.js`**: This generates the table of contents. It can be replaced with a vanilla JS alternative or a Jekyll plugin that generates the TOC at build time.
    -   **Algolia Search (`_includes/algolia.html`):** The jQuery parts for showing/hiding results should be rewritten in vanilla JS.

2.  **Refactor Custom CSS:**
    -   Review `css/customstyles.css`, `css/theme-precice.css`, and `css/landing-page.css`.
    -   Remove redundant styles that were overriding Bootstrap 3. Many of these can be replaced with Bootstrap 5 utility classes.

## 2. File-by-File Migration Details

This section details the specific changes required for key files.

### Global Files

-   **`_includes/head.html`**:
    -   **Change**: Update Bootstrap CSS/JS CDN links to version 5.3.8.
    -   **From**: `bootstrap@3.4.1`
    -   **To**: `bootstrap@5.3.8` (use `bootstrap.bundle.min.js` for the script).

-   **`_includes/topnav.html`**:
    -   **Change**: Complete rewrite of the navbar HTML structure.
    -   **Migration**:
        -   Replace `<nav class="navbar navbar-inverse navbar-fixed-top">` with `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">` (theme classes may vary).
        -   Replace the hamburger button from using multiple `<span class="icon-bar">` to a single `<span class="navbar-toggler-icon"></span>`.
        -   Update dropdowns to use `data-bs-toggle="dropdown"`.
        -   The main collapse container will need `class="collapse navbar-collapse"`.

-   **`_includes/sidebar.html`**:
    -   **Change**: The sidebar's affix behavior and navgoco-driven accordion will break.
    -   **Migration**:
        -   Remove the navgoco script initialization.
        -   Replace the affix behavior with CSS `position: sticky; top: 0;`.
        -   Rewrite the accordion logic using Bootstrap's Collapse component or native `<details>`/`<summary>` elements for a simpler, jQuery-free solution.

-   **`js/customscripts.js`**:
    -   **Change**: All jQuery-dependent Bootstrap calls will fail.
    -   **Migration**:
        -   Rewrite tooltip initialization using `new bootstrap.Tooltip(...)`.
        -   Rewrite tab persistence logic to use `bootstrap.Tab.getOrCreateInstance(...)`.
        -   Remove the old affix-related code.

### CSS Files

-   **`css/theme-precice.css` & `css/customstyles.css`**:
    -   **Change**: Many styles target Bootstrap 3 components that no longer exist (`panel`, `navbar-inverse`, `label`).
    -   **Migration**:
        -   Audit and remove overrides for `.panel`.
        -   Update navbar styling to target new Bootstrap 5 classes.
        -   Replace `.label` styles with `.badge` styles.
        -   Leverage Bootstrap 5 CSS variables for theming where possible to simplify the code.

### Content Files

-   **`content/index.html`**:
    -   **Change**: This page is heavy on `panel`-like structures, responsive utilities, and custom grid layouts.
    -   **Migration**:
        -   Convert all `panel` and `well` instances to `card`.
        -   Replace `hidden-*` classes with `d-none d-*-block`.
        -   Update column classes (`col-xs-*`, `col-sm-*`) and offsets to the Bootstrap 5 grid system.

-   **Files with Tabs (e.g., `content/docs/couple-your-code/step-by-step/*`)**:
    -   **Change**: Tab navigation uses `data-toggle="tab"`.
    -   **Migration**:
        -   Update all tab triggers to use `data-bs-toggle="tab"`.
        -   Ensure the `shown.bs.tab` event listener in `customscripts.js` is updated to the new Bootstrap 5 event `shown.bs.tab` (the name is the same, but the underlying API is different).

## 3. Dependency Plan

-   **jQuery**: Keep temporarily. It is required by `navgoco`, `toc.js`, and Algolia scripts.
-   **`jquery.navgoco.min.js`**: **Replace.** The sidebar can be rebuilt with Bootstrap 5's Collapse component for a more integrated and future-proof solution.
-   **`toc.js`**: **Replace.** A simple vanilla JS script can be written to generate the TOC, or a static site generator feature could handle this at build time.
-   **DataTables**: Currently dormant. Can be removed or updated to the Bootstrap 5-compatible version if a page requires it in the future.

## 4. Risk and Mitigation

-   **Risk**: Visual regressions in the navbar, sidebar, and landing page.
-   **Mitigation**: Test thoroughly on multiple screen sizes. The migration should be done on a separate branch and reviewed carefully before merging.

-   **Risk**: Interactive components (tabs, tooltips, dropdowns) may not work.
-   **Mitigation**: Manually test every interactive element on the site after the JS and attribute migration phase.

-   **Risk**: Print stylesheet may be affected.
-   **Mitigation**: Test the print output of key pages, as Bootstrap 5 has different print styles than Bootstrap 3.
