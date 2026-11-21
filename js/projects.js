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

  card.append(title, description, tech);
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

function fillTechOptions() {
  const all = projects.flatMap(function (p) { return p.tech; });
  const unique = Array.from(new Set(all)).sort();
  unique.forEach(function (name) {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    techSelect.appendChild(option);
  });
}

function getFilteredProjects() {
  const query = searchInput.value.trim().toLowerCase();
  const selected = techSelect.value;

  return projects.filter(function (p) {
    const matchesText =
      query === "" ||
      p.title.toLowerCase().includes(query) ||
      p.tech.some(function (t) { return t.toLowerCase().includes(query); });
    const matchesTech = selected === "all" || p.tech.includes(selected);
    return matchesText && matchesTech; // both filters must pass
  });
}

function update() {
  renderProjects(getFilteredProjects());
}

fillTechOptions();
searchInput.addEventListener("input", update);
techSelect.addEventListener("change", update);
update();
