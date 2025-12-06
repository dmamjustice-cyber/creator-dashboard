const landing = document.getElementById("landing");
const loginPage = document.getElementById("login");
const app = document.getElementById("app");

/* ======================
   NAVIGATION
====================== */
function openApp() {
  landing.classList.add("hidden");
  loginPage.classList.add("hidden");
  app.classList.remove("hidden");

  // Always default to Dashboard
  showPage("dashboard", document.querySelector(".nav-item"));

  // Draw charts safely
  setTimeout(drawCharts, 100);
}

function openLogin() {
  landing.classList.add("hidden");
  loginPage.classList.remove("hidden");
  app.classList.add("hidden");
}

function openLanding() {
  loginPage.classList.add("hidden");
  landing.classList.remove("hidden");
  app.classList.add("hidden");
}

/* ======================
   LOGIN SYSTEM
====================== */
function login() {
   document.getElementById("userEmail").textContent = email;
document.getElementById("topUser").textContent = email;

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

// Auto-login if user exists
window.onload = () => {
  const user = localStorage.getItem("user");
  if (user) {
    document.getElementById("userEmail").textContent = user;
    openApp();
  }
};

/* ======================
   PAGE NAVIGATION (B C D E)
====================== */
function showPage(id, el) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
  if (el) el.classList.add("active");
}

/* ======================
   AI ASSISTANT (B)
====================== */
async function sendMessage() {
  const chatBox = document.getElementById("chatBox");
  const input = document.getElementById("chatInput");
  const msg = input.value.trim();

  if (!msg) return;

  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  input.value = "";

  try {
    const res = await fetch("http://localhost:8000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: msg })
    });

    const data = await res.json();
    chatBox.innerHTML += `<p><b>AI:</b> ${data.answer}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.innerHTML += `<p><b>AI:</b> Server not connected.</p>`;
  }
}

/* ======================
   SUBSCRIPTIONS (D)
====================== */
function subscribe(plan) {
  alert(`Redirecting to ${plan.toUpperCase()} checkout (mock).`);
}

/* ======================
   CHARTS (Dashboard + E)
====================== */
function drawCharts() {
  const rev = document.getElementById("revenueChart");
  if (rev) {
    new Chart(rev, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
          label: "Revenue",
          data: [12, 19, 7, 15, 22]
        }]
      }
    });
  }

  const views = document.getElementById("viewsChart");
  if (views) {
    new Chart(views, {
      type: "bar",
      data: {
        labels: ["Shorts", "Reels", "TikToks"],
        datasets: [{
          label: "Views",
          data: [2000, 3500, 4200]
        }]
      }
    });
  }
}
