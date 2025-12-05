function showPage(pageId, el) {
  const pages = document.querySelectorAll(".page");
  pages.forEach(p => p.classList.add("hidden"));

  const page = document.getElementById(pageId);
  if (page) page.classList.remove("hidden");

  const nav = document.querySelectorAll(".nav-item");
  nav.forEach(i => i.classList.remove("active"));
  if (el) el.classList.add("active");
}

console.log("Navigation ready.");
