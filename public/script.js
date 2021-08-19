window.addEventListener("load", main);

function main() {
  fetchHeros();

  const addButtomToggle = document.getElementById("add-button");
  addButtomToggle.addEventListener("click", toggleAdd);

  const addForm = document.getElementById("add-hero");
  addForm.addEventListener("submit", addHero);

  const edditForm = document.getElementById("eddit-hero");
  edditForm.addEventListener("submit", sendEdditHeroFrom);
}

//Gobal vaiable
let herosNow;
let edditId;

//START Api calls:
async function fetchHeros() {
  const response = await fetch("/api/heros");
  const heros = await response.json();
  herosNow = heros;

  printHeros(heros);
}

async function deleteHero(event) {
  let id = event.target.attributes.id.textContent;

  await fetch("http://localhost:3000/api/heros/" + id, {
    method: "DELETE",
  });
  fetchHeros();
}

async function detailOfHero(event) {
  let id = event.target.attributes.id.textContent;
  const response = await fetch("/api/heros/" + id);
  const hero = await response.json();

  printOneHeros(hero);
}

async function addHero(event) {
  event.preventDefault();
  const thisForm = document.getElementById("add-hero");
  const formData = new FormData(thisForm).entries();
  const response = await fetch("http://localhost:3000/api/heros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const result = await response.json();
  fetchHeros();
  toggleAdd();
}

async function sendEdditHeroFrom(event) {
  event.preventDefault();
  const thisForm = document.getElementById("eddit-hero");
  const formData = new FormData(thisForm).entries();
  const response = await fetch("http://localhost:3000/api/heros/" + edditId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const result = await response.json();
  fetchHeros();
  toggleEdditForm(edditId);
}
//END api calls

//START printing functions:
function printHeros(heros) {
  let oldDayTodos = document.getElementById("hero-list");
  oldDayTodos.textContent = "";

  for (var i = 0; i < heros.length; i++) {
    var hero = heros[i];

    let parent = document.createElement("div");
    parent.classList.add("parent");

    let textOfHero = document.createElement("P");
    textOfHero.innerText = "Hero: " + hero.name;
    textOfHero.classList.add("text-of-hero");

    //button.edit
    let editButton = document.createElement("button");
    editButton.setAttribute("id", heros[i].id);
    editButton.addEventListener("click", edditHero, true);
    editButton.classList.add("eddit-button");
    editButton.classList.add("button-design");
    editButton.innerText = "Edit";

    //button.delete
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", heros[i].id);
    deleteButton.addEventListener("click", deleteHero, true);
    deleteButton.classList.add("delete-button");
    deleteButton.classList.add("button-design");
    deleteButton.innerText = "Delete";

    // button.detail
    let detailButton = document.createElement("button");
    detailButton.setAttribute("id", heros[i].id);
    detailButton.addEventListener("click", detailOfHero, true);
    detailButton.classList.add("detail-button");
    detailButton.classList.add("button-design");
    detailButton.innerText = "Detail";

    //append in right order
    parent.appendChild(textOfHero);
    parent.appendChild(editButton);
    parent.appendChild(detailButton);
    parent.appendChild(deleteButton);
    document.getElementById("hero-list").appendChild(parent);
  }
}

function printOneHeros(hero) {
  let oldDayTodos = document.getElementById("hero-list");
  oldDayTodos.textContent = "";
  let parent = document.createElement("div");
  parent.classList.add("parent");

  let textOfHero = document.createElement("P");
  textOfHero.innerText =
    "Hero: " +
    hero.name +
    " power level: " +
    hero.power +
    " speed level: " +
    hero.speed;

  //add back button
  let backButton = document.createElement("button");
  backButton.setAttribute("id", hero.id);
  backButton.addEventListener("click", fetchHeros, true);
  backButton.classList.add("detail-button");
  backButton.classList.add("button-design");
  backButton.innerText = "Back";

  //append in right order
  parent.appendChild(textOfHero);
  parent.appendChild(backButton);
  document.getElementById("hero-list").appendChild(parent);
}
//END Printing functions

//Other fuctions
function toggleAdd() {
  let frm_element = document.getElementById("add-hero");
  let vis = frm_element.style;
  if (vis.display == "" || vis.display == "none") {
    vis.display = "block";
    vis.padding = "1rem";
  } else {
    vis.display = "none";
  }
}

function edditHero(event) {
  edditId = event.target.attributes.id.textContent;
  toggleEdditForm(edditId);
}

function toggleEdditForm(id) {
  let frm_element = document.getElementById("eddit-hero");

  herosNow.forEach((element) => {
    if (element.id == id) {
      document.getElementById("eddit-name").value = element.name;
      document.getElementById("eddit-power").value = element.power;
      document.getElementById("eddit-speed").value = element.speed;
    }
  });

  let vis = frm_element.style;
  if (vis.display == "" || vis.display == "none") {
    vis.display = "block";
    vis.padding = "1rem";
  } else {
    vis.display = "none";
  }
}
