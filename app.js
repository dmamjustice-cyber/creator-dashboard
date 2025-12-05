function showSubscription() {
  document.querySelector(".main").classList.add("hidden");
  document.getElementById("subscriptionPage").classList.remove("hidden");
}

function showDashboard() {
  document.querySelector(".main").classList.remove("hidden");
  document.getElementById("subscriptionPage").classList.add("hidden");
}

console.log("Dashboard loaded.");


