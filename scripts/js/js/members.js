const container = document.getElementById('membersContainer');
const gridBtn = document.getElementById('gridView');
const listBtn = document.getElementById('listView');

let members = [];

function renderMembers() {
  container.innerHTML = '';
  members.forEach(member => {
    const memberDiv = document.createElement('div');
    memberDiv.classList.add('member-card');
    memberDiv.innerHTML = `
      <img src="images/${member.image}" alt="${member.name}" />
      <h4>${member.name}</h4>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <p><a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
    `;
    container.appendChild(memberDiv);
  });
}

function showGrid() {
  container.classList.remove('list');
  container.classList.add('grid');
}

function showList() {
  container.classList.remove('grid');
  container.classList.add('list');
}

gridBtn.addEventListener('click', () => showGrid());
listBtn.addEventListener('click', () => showList());

async function loadMembers() {
  try {
    const response = await fetch('data/members.json');
    members = await response.json();
    renderMembers();
    showGrid();
  } catch (error) {
    console.error('Error cargando miembros:', error);
  }
}

loadMembers();
