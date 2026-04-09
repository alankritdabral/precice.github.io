document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  function updateIcon(theme) {
    if (!icon) return;
    icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  }

  const currentTheme =
    document.documentElement.getAttribute("data-theme") || "light";
  updateIcon(currentTheme);

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const activeTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = activeTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateIcon(newTheme);
  });
});