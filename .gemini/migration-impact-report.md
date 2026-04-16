# Bootstrap 5 Migration: Impact Report

This document outlines the planned changes for migrating `precice.github.io` from Bootstrap 3 to Bootstrap 5, comparing the new approach with the existing implementation and evaluating the impact on the site.

## 1. Core Layout & Infrastructure

| File | Planned Changes | Comparison | Impact on Functionality | Impact on Styling |
| :--- | :--- | :--- | :--- | :--- |
| `_includes/head.html` | Update CDN links for Bootstrap (v3.3.7 → v5.3.x) and jQuery. | **Better**: Access to modern features, security patches, and performance improvements. | **Critical**: Affects all components relying on Bootstrap. | **Minor**: Base styles will change slightly due to BS5 defaults. |
| `_includes/topnav.html` | Full rewrite of navbar markup: `navbar-inverse` → `navbar`, `navbar-toggle` → `navbar-toggler`. | **Better**: Cleaner markup, improved accessibility, and native mobile behavior. | **High**: Desktop/mobile navigation behavior and collapse logic. | **Moderate**: Requires theme adjustments to match the original "Inverse" look. |
| `_layouts/default.html` | Update JS initialization (Tooltips, DataTables if used). | **Better**: Uses native Bootstrap 5 APIs; removes jQuery dependency for BS components. | **High**: Initialization logic for all interactive elements. | **None**: Structural only. |
| `_includes/sidebar.html` | Update accordion and navigation classes. | **Better**: More robust structure using BS5 utilities. | **Moderate**: Sidebar expansion and active-state tracking. | **Minor**: Some spacing and icon alignment might change. |

## 2. Global Styling (CSS)

| File | Planned Changes | Comparison | Impact on Functionality | Impact on Styling |
| :--- | :--- | :--- | :--- | :--- |
| `css/theme-precice.css` | Replace BS3 component overrides (panels, wells) with BS5 variables and utilities. | **Better**: Significant reduction in custom CSS; easier to maintain. | **None** | **High**: This file defines the "preCICE" look. Most changes will happen here. |
| `css/customstyles.css` | Clean up overrides for navbar, tabs, and buttons. | **Better**: Removes redundant code that was fighting BS3 defaults. | **None** | **Moderate**: General site layout and consistency. |
| `css/landing-page.css` | Update card and section styling to use BS5 grid and utilities. | **Similar/Better**: Modernizes the landing page structure. | **None** | **Moderate**: Landing page visual consistency (spacing, card alignment). |
| `css/printstyles.css` | Adjust for BS5's removal of built-in print styles. | **Similar**: Preserves existing print layout while updating selectors. | **Low**: Affects PDF generation and printing. | **Moderate**: Ensuring tabs and code blocks print correctly. |

## 3. Content Hotspots

| File | Planned Changes | Comparison | Impact on Functionality | Impact on Styling |
| :--- | :--- | :--- | :--- | :--- |
| `content/index.html` | Convert `panel` to `card`; `img-fluid` → `img-fluid`; update grid classes. | **Better**: Standardizes on the modern "Card" component. | **Low** | **Moderate**: Landing page section layouts. |
| `content/docs/...` (Tabs) | Update `data-toggle="tab"` to `data-bs-toggle="tab"` in ~8 files. | **Better**: Uses native BS5 tab behavior. | **High**: Documentation navigation between code languages/steps. | **Minor**: Active tab styling. |
| `content/docs/fundamentals/fundamentals-literature-guide.md` | Convert card-based content blocks from panels to BS5 cards. | **Better**: Cleaner, more semantic markup. | **Low** | **Minor**: Spacing and borders of information blocks. |

## 4. JavaScript Logic

| File | Planned Changes | Comparison | Impact on Functionality | Impact on Styling |
| :--- | :--- | :--- | :--- | :--- |
| `js/customscripts.js` | Rewrite jQuery-based Bootstrap calls to native JS (e.g., `$(...).tooltip()` → `new bootstrap.Tooltip(...)`). | **Better**: Modern, standard-compliant JS; prepares for future jQuery removal. | **High**: All interactive components (tabs, tooltips, collapse). | **None** |
| `js/toc.js` | (Temporary) Maintain jQuery usage while ensuring it doesn't conflict with BS5. | **Similar** | **Moderate**: Table of Contents generation. | **Minor**: TOC positioning. |

## Summary of Impact

- **Functionality**: The biggest risk is in interactive components (navbar, tabs, dropdowns) where data attributes must change from `data-*` to `data-bs-*`. Regression testing will be required for mobile navigation and tabbed content.
- **Styling**: While the goal is to maintain the same "look and feel," Bootstrap 5 has different default spacing (rem-based) and colors compared to v3. The migration will allow us to delete hundreds of lines of "reset" CSS in `theme-precice.css`.
- **Better vs. Worse**: Overall, this is **much better** for the project. It removes a major technical debt (BS3 is EOL), improves accessibility, and simplifies the codebase by using modern framework features instead of custom CSS hacks.
