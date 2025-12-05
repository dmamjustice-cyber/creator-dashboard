function toggleProfileMenu() {
  document.getElementById("profileMenu").classList.toggle("hidden");
}

function editVideo() {
  alert("Upload video – AI editing coming next.");
}

function openSettings() {
  alert("Settings coming soon.");
}

function openHelp() {
  alert("Help & support coming soon.");
}

function addAccount() {
  const platform = prompt("Add account: YouTube, TikTok, or Instagram?");
  if (platform) alert(platform + " connected (mock).");
}

function logout() {
  alert("Logged out (mock).");
}

