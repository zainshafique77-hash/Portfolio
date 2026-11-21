const grid = document.getElementById("project-grid");
const searchInput = document.getElementById("search");
const techSelect = document.getElementById("tech-filter");
const countText = document.getElementById("result-count");
const emptyMessage = document.getElementById("empty-message");

function createCard(project) {
  const item = document.createElement("li");
  const card = document.createElement("article");
  card.className = "card";

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.textContent = project.description;

  const tech = document.createElement("p");
  tech.textContent = project.tech.join(", ");

  const year = document.createElement("p");
  year.className = "year";
  year.textContent = String(project.year);

  const link = document.createElement("a");
  link.href = project.link;
  link.textContent = "View " + project.title;

  card.append(title, description, tech, year, link);
  item.appendChild(card);
  return item;
}

function renderProjects(list) {
  grid.replaceChildren(); // clear old cards
  list.forEach(function (project) {
    grid.appendChild(createCard(project));
  });
  emptyMessage.hidden = list.length > 0;
  countText.textContent = list.length + (list.length === 1 ? " project found" : " projects found");
}
