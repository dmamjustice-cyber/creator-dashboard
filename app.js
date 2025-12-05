const landing = document.getElementById("landing");
const loginPage = document.getElementById("login");
const app = document.getElementById("app");

/* NAVIGATION */
function openApp() {
  landing.classList.add("hidden");
  loginPage.classList.add("hidden");
  app.classList.remove("hidden");
  drawCharts();
}

function openLogin() {
  landing.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

function openLanding() {
  loginPage.classList.add("hidden");
  landing.classList.remove("hidden");
}

/* LOGIN SYSTEM */
function login() {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Enter an email");
    return;
  }
  localStorage.setItem("user", email);
  document.getElementById("userEmail").textContent = email;
  openApp();
}

function logout() {
  localStorage.clear();
  location.reload();
}

/* PAGE NAV */
function showPage(id, el) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");
}

/* AI ASSISTANT (MOCK) */
function sendMessage() {
  const chatBox = document.getElementById("chatBox");
  const msg = document.getElementById("chatInput").value;
  if (!msg) return;

  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  chatBox.innerHTML += `<p><b>AI:</b> AI response will appear here.</p>`;
  document.getElementById("chatInput").value = "";
}

/* CHARTS */
function drawCharts() {
  new Chart(document.getElementById("revenueCh

