const membersContainer = document.getElementById("membersContainer");
const gridViewBtn = document.getElementById("gridView");
const listViewBtn = document.getElementById("listView");

fetch("data/members.json")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(members => {
    displayMembers(members, "grid");
  })
  .catch(error => {
    membersContainer.innerHTML = "<p>Error loading members data.</p>";
    console.error("Error fetching members:", error);
  });


function displayMembers(members, view) {
  membersContainer.className = `members ${view}`;
  membersContainer.innerHTML = "";

  members.forEach(member => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("member-card");

    memberCard.innerHTML = `
      <h4>${member.name}</h4>
      <p><strong>Address:</strong> ${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><a href="${member.website}" target="_blank">Website</a></p>
      <img src="images/${member.image}" alt="${member.name}">
      <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
    `;

    membersContainer.appendChild(memberCard);
  });
}

gridViewBtn.addEventListener("click", () => {
  gridViewBtn.setAttribute("aria-pressed", "true");
  listViewBtn.setAttribute("aria-pressed", "false");
  fetch("data/members.json")
    .then(res => res.json())
    .then(data => displayMembers(data, "grid"));
});

listViewBtn.addEventListener("click", () => {
  gridViewBtn.setAttribute("aria-pressed", "false");
  listViewBtn.setAttribute("aria-pressed", "true");
  fetch("data/members.json")
    .then(res => res.json())
    .then(data => displayMembers(data, "list"));
});

