# Bootstrap 5 Migration Progress Report

## Summary
The migration from Bootstrap 3.x to Bootstrap 5.3.8 is currently in progress. The core infrastructure and the **Navbar** component have been successfully modernized while maintaining the original preCICE visual identity.

## Completed Tasks

### 1. Framework & Infrastructure
- **Version Upgrade**: Site now uses Bootstrap 5.3.8 (via CDN in `head.html`).
- **State Classes**: Systematically replaced `.navbar-inverse` with `.navbar`, `.open` with `.show`, and `.navbar-toggle` with `.navbar-toggler` across all CSS files.
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
- **Full Card Migration**: Converted all remaining `.panel` elements to `.card` elements in `content/index.html`.
- **Styling**: 
    - Added `.card-precice` and `.card-header-precice` to `css/customstyles-precice.css` to maintain preCICE aesthetics.
    - Set `min-height: 4em` and `display: flex` on `.card-header-precice` to ensure headers are equal height and vertically centered.
    - Removed `padding-top` from `.card-precice` and negative `margin-bottom` from `.card-header-precice` to ensure the blue header correctly "sticks" to the top of the card.
    - Added `.card-primary` to `css/theme-precice.css` to match the brand color.
    - Updated `css/landing-page.css` to support `.card-primary` for the adapter section.
- **News Section**:
    - Updated `js/news-collect.js` to use BS5 classes and flex utilities (`h-100`, `d-flex flex-column`).
    - Fixed an issue where news cards had different heights by using flexbox and removing conflicting custom CSS in `landing-page.css`.
- **Logowall Section**:
    - Migrated the nested grid structure to a more compact `d-flex flex-wrap` layout for better visual density.
- **Grid & Layout**:
    - Replaced `img-responsive` with `img-fluid`.
    - Replaced `center-block` with `mx-auto d-block`.
    - Updated `col-md-offset-1` to `offset-md-1` in various documentation files.
    - Added `mb-3` margin between USP images and their respective cards.
- **Documentation**: Migrated panels to cards in:
    - `content/docs/fundamentals/fundamentals-literature-guide.md`
    - `content/docs/adapters/fenics/adapter-fenics.md`
    - `content/community/workshops/precice-workshop-organizing.md`

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
1. **Sidebar Migration**: Replace `navgoco` jQuery plugin with Bootstrap 5 Collapse or native sticky positioning in `_includes/sidebar.html`.
2. **Global Attribute Update**: Finalize the migration of all remaining `data-toggle` attributes to `data-bs-toggle` in various documentation and tutorial files.
3. **CSS Cleanup**: Systematic removal or renaming of legacy `.panel` selectors in `css/` files once conversion is fully verified.
