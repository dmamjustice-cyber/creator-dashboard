const landing = document.getElementById("landing");
const app = document.getElementById("app");

/* LOGIN */
function login() {
  const email = document.getElementById("email").value;
  if (!email) return alert("Enter email");

  localStorage.setItem("user", email);
  document.getElementById("userEmail").textContent = email;
  document.getElementById("topUser").textContent = email;

  landing.classList.add("hidden");
  app.classList.remove("hidden");

  drawCharts();
}

function logout() {
  localStorage.clear();
  location.reload();
}

/* NAV */
function showPage(id, el) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));
  el.classList.add("active");
}

/* AI */
async function sendMessage() {
  const box = document.getElementById("chatBox");
  const input = document.getElementById("chatInput");

  box.innerHTML += `<p>You: ${input.value}</p>`;
  input.value="";
}

/* PLANS */
function subscribe(plan){
  alert("Redirecting to " + plan.toUpperCase());
}

/* CHARTS */
function drawCharts() {
  const ctx = document.getElementById("revenueChart");
  if (ctx) {
    new Chart(ctx,{
      type:"line",
      data:{
        labels:["Mon","Tue","Wed","Thu","Fri"],
        datasets:[{label:"Revenue",data:[12,18,9,22,30]}]
      }
    });
  }
}

/* SLIDER */
let index=0;
setInterval(()=>{
  document.querySelectorAll(".slide").forEach(s=>s.classList.remove("active"));
  index=(index+1)%3;
  document.querySelectorAll(".slide")[index].classList.add("active");
},4000);
