
document.addEventListener("DOMContentLoaded", () => {
  const timestamp = document.getElementById("timestamp");
  if (timestamp) {
    timestamp.value = new Date().toISOString();
  }
});


function showModal(id) {
  document.getElementById(id).showModal();
}
function closeModal(id) {
  document.getElementById(id).close();
}
