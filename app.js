function showPage(pageId, el) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => page.classList.add("hidden"));

  document.getElementById(pageId).classList.remove("hidden");

  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => item.classList.remove("active"));

  el.classList.add("active");
}

console.log("All pages are now live.");


