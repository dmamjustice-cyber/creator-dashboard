function openApp(){
  landing.classList.add("hidden");
  login.classList.add("hidden");
  app.classList.remove("hidden");
  drawCharts();
}

function openLogin(){
  landing.classList.add("hidden");
  login.classList.remove("hidden");
}

function openLanding(){
  login.classList.add("hidden");
  landing.classList.remove("hidden");
}

/* LOGIN (C) */
function login(){
  const email = document.getElementById("email").value;
  localStorage.setItem("user", email);
  document.getElementById("userEmail").textContent = email;
  openApp();
}

function logout(){
  localStorage.clear();
  location.reload();
}

/* PAGE NAV */
function showPage(id, el){
  document.querySelectorAll(".page").forEach(p=>p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(i=>i.classList.remove("active"));
  el.classList.add("active");
}

/* AI ASSISTANT (B — MOCK, OpenAI-READY) */
function sendMessage(){
  const chatBox = document.getElementById("chatBox");
  const msg = document.getElementById("chatInput").value;
  chatBox.innerHTML += `<p><b>You:</b> ${msg}</p>`;
  chatBox.innerHTML += `<p><b>AI:</b> This will be connected to OpenAI API.</p>`;
}

/* CHARTS (E) */
function drawCharts(){
  new Chart(document.getElementById("revenueChart"), {
    type:"line",
    data:{
      labels:["Mon","Tue","Wed","Thu","Fri"],
      datasets:[{label:"Revenue", data:[12,19,3,22,15]}]
    }
  });

  new Chart(document.getElementById("viewsChart"), {
    type:"bar",
    data:{
      labels:["YT","TikTok","IG"],
      datasets:[{label:"Views", data:[5000,8000,3000]}]
    }
  });
}

/* PAYMENTS MOCK (D) */
function subscribe(plan){
  alert("Stripe checkout would open here for: " + plan);
}
