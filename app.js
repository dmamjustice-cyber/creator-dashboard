// Frontend interactions + charts + calling real backend/OpenAI endpoints
document.addEventListener('DOMContentLoaded', function(){
  const aiAskBtn = document.getElementById('aiAskBtn');
  const aiQuestion = document.getElementById('aiQuestion');
  const aiResponse = document.getElementById('aiResponse');
  const ideaBtn = document.getElementById('ideaBtn');
  const scriptBtn = document.getElementById('scriptBtn');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const predictBtn = document.getElementById('predictBtn');

  function fetchAI(question){
    aiResponse.innerText = 'Thinking...';
    fetch('/api/ai', {
      method: 'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({question: question})
    }).then(r=>r.json()).then(d=>{
      aiResponse.innerText = d.answer || JSON.stringify(d);
    }).catch(e=>{
      aiResponse.innerText = '(offline) ' + (e.message || 'no backend');
    });
  }

  if(ideaBtn) ideaBtn.addEventListener('click', ()=>fetchAI('Generate 5 video ideas for my channel'));
  if(scriptBtn) scriptBtn.addEventListener('click', ()=>fetchAI('Write a 30s short script'));
  if(analyzeBtn) analyzeBtn.addEventListener('click', ()=>fetchAI('Analyze my last 7 days revenue and advise'));
  if(predictBtn) predictBtn.addEventListener('click', ()=>fetchAI('Predict revenue if I post 3 shorts this week'));
  if(aiAskBtn) aiAskBtn.addEventListener('click', ()=>fetchAI(aiQuestion.value || 'Analyze revenue'));

  // charts
  const trendCtx = document.getElementById('trendChart').getContext('2d');
  new Chart(trendCtx,{type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Views',data:[120000,180000,210000,160000,200000,240000,270000],fill:true,backgroundColor:'rgba(11,116,255,0.08)',borderColor:'rgba(11,116,255,0.9)',tension:0.35}]},options:{responsive:true,plugins:{legend:{display:false}}}});
  const earnCtx = document.getElementById('earnChart').getContext('2d');
  new Chart(earnCtx,{type:'bar',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:[{label:'Earnings',data:[120,140,160,110,150,190,170],backgroundColor:'rgba(6,173,108,0.9)'}]},options:{responsive:true,plugins:{legend:{display:false}}}});

});
function mockAutoEdit(){alert('Auto-edit (demo)');}
function mockExport(){alert('Export CSV (demo)');}
document.getElementById("editBtn").onclick = () => {
  alert("AI Edit Tool coming next – this will upload your video!");
};

