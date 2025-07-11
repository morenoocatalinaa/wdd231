const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const membersContainer = document.querySelector("#membersContainer");

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
  gridButton.setAttribute("aria-pressed", "true");
  listButton.setAttribute("aria-pressed", "false");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
  gridButton.setAttribute("aria-pressed", "false");
  listButton.setAttribute("aria-pressed", "true");
});
