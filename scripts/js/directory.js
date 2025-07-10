async function getMembers() {
  const response = await fetch('data/members.json');
  const members = await response.json();
  displayMembers(members);
}

function displayMembers(members) {
  const container = document.getElementById("membersContainer");
  container.innerHTML = "";

  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
    `;
    container.appendChild(card);
  });
}

document.getElementById("gridBtn").addEventListener("click", () => {
  document.getElementById("membersContainer").classList.add("grid-view");
  document.getElementById("membersContainer").classList.remove("list-view");
});

document.getElementById("listBtn").addEventListener("click", () => {
  document.getElementById("membersContainer").classList.add("list-view");
  document.getElementById("membersContainer").classList.remove("grid-view");
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("modified").textContent = document.lastModified;

getMembers();
