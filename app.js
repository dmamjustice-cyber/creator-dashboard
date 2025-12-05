function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.add("hidden"));

  document.getElementById(pageId).classList.remove("hidden");

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => item.classList.remove("active"));

  event.target.classList.add("active");
}

console.log("All sidebar navigation is now active.");


