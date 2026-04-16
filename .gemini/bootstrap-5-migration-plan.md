# Bootstrap 5.3.8 Migration Plan

This document provides a detailed plan for upgrading the precice.github.io website from Bootstrap 3.3.7 to Bootstrap 5.3.8. The goal is to ensure the UI remains visually identical after the upgrade.

---

## Phase 1: Runtime & Global Markup

### `_includes/head.html`

- **Bootstrap CSS:** Replace the Bootstrap 3.3.7 CSS with the Bootstrap 5.3.8 CSS.
- **Bootstrap JS:** Replace the Bootstrap 3.3.7 JS with the Bootstrap 5.3.8 JS bundle.
- **jQuery:** Keep jQuery for now, as other scripts depend on it.

**Optional:**
- **DataTables:** The DataTables CSS and JS are loaded conditionally. Since no pages seem to use it, we can remove it.

---

## Phase 2: JS Rewrites

### `_layouts/default.html`

- **Tooltip Initialization:** Replace the jQuery-based tooltip initialization with the Bootstrap 5 vanilla JS equivalent.
  - Find: `$(function () { $('[data-toggle="tooltip"]').tooltip() })`
  - Replace with:
    ```html
    <script>
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
      })
    </script>
    ```

### `js/customscripts.js`

- **Tooltip Initialization:** Replace the jQuery-based tooltip initialization with the Bootstrap 5 vanilla JS equivalent.
  - Find: `$('[data-toggle="tooltip"]').tooltip({ container: 'body' });`
  - Replace with:
    ```javascript
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        container: 'body'
      })
    })
    ```
- **Tab Persistence:** Replace the Bootstrap 3 `shown.bs.tab` event with the Bootstrap 5 `shown.bs.tab` event. The logic for storing the active tab in local storage can remain the same.
  - Find: `$('a[data-toggle="pill"], a[data-toggle="tab"]').on('shown.bs.tab', function(e) { ... });`
  - Replace with: `$('a[data-bs-toggle="pill"], a[data-bs-toggle="tab"]').on('shown.bs.tab', function(e) { ... });`
- **Tab Activation:** Replace the Bootstrap 3 `.tab('show')` method with the Bootstrap 5 `bootstrap.Tab.getOrCreateInstance().show()` method.
  - Find: `return $this.find("a[data-toggle=tab]:first, a[data-toggle=pill]:first").tab("show");`
  - Replace with:
    ```javascript
    var tab = new bootstrap.Tab($this.find('a[data-bs-toggle="tab"]:first, a[data-bs-toggle="pill"]:first')[0]);
    tab.show();
    ```

---

## Phase 3: Markup

### `_includes/topnav.html`

- **Navbar:** Update the navbar classes to be compatible with Bootstrap 5.
  - Replace `navbar-inverse` with `navbar-dark bg-dark`.
  - Replace `navbar-toggle` with `navbar-toggler`.
  - Replace `icon-bar` with `navbar-toggler-icon`.
- **Collapse:** Update the collapse attributes.
  - Replace `data-toggle="collapse"` with `data-bs-toggle="collapse"`.
  - Replace `data-target` with `data-bs-target`.
- **Dropdown:** Update the dropdown attributes.
  - Replace `data-toggle="dropdown"` with `data-bs-toggle="dropdown"`.

### `content/docs/couple-your-code/step-by-step/*.md`

- **Tabs:** Update the tab attributes in all the files in this directory.
  - Replace `data-toggle="tab"` with `data-bs-toggle="tab"`.

