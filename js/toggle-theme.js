document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  function updateIcon(theme) {
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const defaultTheme = prefersDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", defaultTheme);
    updateIcon(defaultTheme);
  }

  // Toggle click
  if (toggleBtn) {
    toggleBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let currentTheme = document.documentElement.getAttribute("data-theme");
      let newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      updateIcon(newTheme);
    });
  }
});