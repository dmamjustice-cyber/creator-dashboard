// Basic front-end app logic (safe checks, charts, nav, login, slider)
// Assumes backend AI endpoint at http://localhost:8000/api/ai if available

/* ---------- ELEMENTS ---------- */
const landing = document.getElementById('landing');
const appRoot = document.getElementById('app');

/* ---------- LOGIN / SESSION ---------- */
function login() {
  const emailEl = document.getElementById('email');
  const email = (emailEl && emailEl.value || '').trim();
  if (!email) return alert('Please enter an email to continue.');

  // Save session (mock)
  localStorage.setItem('user', email);
  // update profile / top user
  updateUserUI(email);

  // show app
  landing.classList.add('hidden');
  appRoot.classList.remove('hidden');

  // show dashboard by default
  const firstNav = document.querySelector('.nav-item');
  if (firstNav) showPage('dashboard', firstNav);

  // draw charts safely
  setTimeout(initCharts, 120);
}

function logout() {
  localStorage.removeItem('user');
  location.reload();
}

function updateUserUI(email) {
  const top = document.getElementById('topUser');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  if (top) top.textContent = email.split('@')[0];
  if (profileName) profileName.textContent = email.split('@')[0];
  if (profileEmail) profileEmail.textContent = email;
  const initials = email.split('@')[0].split(' ').map(s=>s[0].toUpperCase()).join('').slice(0,2);
  const avatar = document.querySelector('.avatar');
  if (avatar) avatar.textContent = initials;
}

/* Auto restore session */
window.addEventListener('load', () => {
  const user = localStorage.getItem('user');
  if (user) {
    updateUserUI(user);
    landing.classList.add('hidden');
    appRoot.classList.remove('hidden');
    setTimeout(initCharts, 120);
  }
});

/* ---------- NAV ---------- */
function showPage(id, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  const page = document.getElementById(id);
  if (page) page.classList.remove('hidden');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  if (el) el.classList.add('active');
}

/* ---------- AI CHAT (mock + backend fallback) ---------- */
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  if (!input || !chatBox) return;
  const text = input.value.trim();
  if (!text) return;
  // append user
  const userP = document.createElement('p'); userP.innerHTML = `<b>You:</b> ${text}`; chatBox.appendChild(userP);
  input.value = '';
  // call backend if available
  try {
    const resp = await fetch('http://localhost:8000/api/ai', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({question: text})
    });
    const json = await resp.json();
    const aiP = document.createElement('p'); aiP.innerHTML = `<b>AI:</b> ${json.answer || json.error || 'No response'}`;
    chatBox.appendChild(aiP);
  } catch (err) {
    const aiP = document.createElement('p'); aiP.innerHTML = `<b>AI:</b> (offline) Try again later.`;
    chatBox.appendChild(aiP);
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ---------- CART / SUBSCRIPTIONS ---------- */
function subscribe(plan) {
  alert(`Mock checkout: ${plan}. Replace with Stripe/PayPal flow when ready.`);
}

/* ---------- SLIDER (landing) ---------- */
let slideIndex = 0;
function advanceSlides() {
  const slides = document.querySelectorAll('.slide');
  if (!slides || slides.length===0) return;
  slides.forEach(s => s.classList.remove('active'));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add('active');
}
setInterval(advanceSlides, 4200);

/* helper demo functions */
function openDemo(){
  document.getElementById('email').value = 'demo@aivideohub.com';
  document.getElementById('password').value = 'demo123';
  login();
}
function openSignup(){ alert('Signup flow not implemented in demo.'); }

/* ---------- CHARTS (safe init) ---------- */
function safeChart(node, cfg) {
  try {
    return new Chart(node, cfg);
  } catch (e) {
    console.warn('Chart init failed', e);
    return null;
  }
}

function initCharts(){
  // revenueChart
  const revNode = document.getElementById('revenueChart');
  if (revNode && !revNode.dataset.inited) {
    safeChart(revNode, {
      type: 'line',
      data: {
        labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        datasets:[{
          label:'Revenue',
          data:[1200,1500,900,2000,2300,1800,2700],
          tension:0.3,
          borderColor:'#7c3aed',
          backgroundColor:'rgba(124,58,237,0.08)',
          fill:true
        }]
      },
      options:{responsive:true,maintainAspectRatio:false}
    });
    revNode.dataset.inited = '1';
  }

  // platformChart
  const platNode = document.getElementById('platformChart');
  if (platNode && !platNode.dataset.inited) {
    safeChart(platNode, {
      type:'bar',
      data:{
        labels:['YouTube','TikTok','Instagram','Facebook'],
        datasets:[{
          label:'Revenue',
          data:[8450,2890,1320,187],
          backgroundColor:['#ff7b7b','#00f2ff','#ff9bb7','#6f9cff']
        }]
      },
      options:{responsive:true,maintainAspectRatio:false}
    });
    platNode.dataset.inited = '1';
  }

  // analyticsChart on analytics page
  const analyticsNode = document.getElementById('analyticsChart');
  if (analyticsNode && !analyticsNode.dataset.inited) {
    safeChart(analyticsNode, {
      type:'doughnut',
      data:{
        labels:['Shorts','Long-form','Reels'],
        datasets:[{data:[55,30,15],backgroundColor:['#7c3aed','#2563eb','#22c55e']}]
      }
    });
    analyticsNode.dataset.inited = '1';
  }
}

/* init charts if app already visible (session restore) */
if (!landing.classList.contains('hidden')) {
  // nothing
} else {
  setTimeout(initCharts, 120);
}
