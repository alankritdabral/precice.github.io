# Bootstrap 5 Migration Progress Report

## Summary
The migration from Bootstrap 3.x to Bootstrap 5.3.8 is currently in progress. The core infrastructure and the **Navbar** component have been successfully modernized while maintaining the original preCICE visual identity.

## Completed Tasks

### 1. Framework & Infrastructure
- **Version Upgrade**: Site now uses Bootstrap 5.3.8 (via CDN in `head.html`).
- **State Classes**: Systematically replaced `.navbar-inverse` with `.navbar` and `.open` with `.show` across all CSS files.
- **Toggler Modernization**: Updated `.navbar-toggle` to `.navbar-toggler`.

### 2. Navbar Migration (`_includes/topnav.html` & CSS)
- **Responsiveness**: Changed breakpoint from `lg` to `xl` (`navbar-expand-xl`) to ensure the menu collapses correctly on screens up to 1200px.
- **Visual Consistency**:
    - Restored the classic "three-bar" (icon-bar) menu button for the toggler.
    - Updated toggler padding to `9px 10px` to match the previous size.
    - Grouped social icons into a single line under the search box when collapsed using `d-flex flex-row`.
    - Set `.navbar` padding to `0 !important` and margin to `0 0 20px 0`.
    - Increased social icon sizes to `30px` using specific overrides in `customstyles-precice.css`.
- **Functionality**:
    - Fixed a critical bug where `display: none !important` in legacy CSS was preventing the menu from opening.
    - Updated dropdowns to use BS5 `data-bs-toggle="dropdown"`.
    - Removed redundant `role` and `aria` attributes to let BS5 manage state natively.

### 3. Landing Page Updates (`content/index.html`)
- **Initial Grid Fixes**:
    - Replaced `img-responsive` with `img-fluid`.
    - Replaced `center-block` with `mx-auto d-block`.
- **Card Migration (Partial)**: Started converting Panels to Cards (e.g., USP section headers).

## Modified Files
- `_includes/topnav.html`
- `content/index.html`
- `css/customstyles.css`
- `css/customstyles-precice.css`
- `css/theme-precice.css`
- `css/theme-blue.css`
- `css/theme-green.css`
- `_includes/head.html`

## Known Issues / Next Steps
1. **Landing Page Migration**: Complete the conversion of all `.panel` elements to `.card` elements in `content/index.html`.
2. **Sidebar Migration**: Replace `navgoco` jQuery plugin with Bootstrap 5 Collapse or native sticky positioning in `_includes/sidebar.html`.
3. **JS Cleanup**: Finalize the migration of all remaining `data-toggle` attributes to `data-bs-toggle` in various documentation and tutorial files.
