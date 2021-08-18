window.addEventListener("load", main);

function main() {
  fetchHeros();

  const addForm = document.getElementById("add-hero");
  addForm.addEventListener("submit", addHero);

  const edditForm = document.getElementById("eddit-hero");
  edditForm.addEventListener("submit", sendEdditHeroFrom);
}

let herosNow;
let edditId;

async function fetchHeros() {
  console.log("hämtar heros");
  const response = await fetch("/api/heros");
  const heros = await response.json();
  herosNow = heros;

  printHeros(heros);
}

function printHeros(heros) {
  let oldDayTodos = document.getElementById("hero-list");
  oldDayTodos.textContent = "";

  for (var i = 0; i < heros.length; i++) {
    var hero = heros[i];

    let textOfHero = document.createElement("ul");

    textOfHero.innerText =
      "Hero: " +
      hero.name +
      "power level: " +
      hero.power +
      "speed level: " +
      hero.speed;

    //button.edit
    let editButton = document.createElement("button");
    editButton.setAttribute("id", heros[i].id);
    editButton.addEventListener("click", edditHero, true);

    //button.delete
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("id", heros[i].id);
    deleteButton.addEventListener("click", deleteHero, true);

    editButton.innerText = "edit";
    editButton.className = "edit";
    deleteButton.innerText = "delete";
    deleteButton.className = "delete";

    textOfHero.appendChild(editButton);
    textOfHero.appendChild(deleteButton);
    document.getElementById("hero-list").appendChild(textOfHero);
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
      console.log(element.name)
      document.getElementById("eddit-name").value = element.name;
      document.getElementById("eddit-power").value = element.power;
      document.getElementById("eddit-speed").value = element.speed;
    }
  });

  let vis = frm_element.style;
  if (vis.display == "" || vis.display == "none") {
    vis.display = "block";
  } else {
    vis.display = "none";
  }
}

async function deleteHero(event) {
  let id = event.target.attributes.id.textContent;

  await fetch("http://localhost:3000/api/heros/" + id, {
    method: "DELETE"
  });
  fetchHeros();
}

async function addHero(event) {
  event.preventDefault();

  //  const name = event.target.name.value;
  //  const power = event.target.power.value;
  //  const speed = event.target.speed.value;
  const thisForm = document.getElementById("add-hero");
  const formData = new FormData(thisForm).entries();
  const response = await fetch("http://localhost:3000/api/heros", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData)),
  });

  const result = await response.json();
  fetchHeros();
  console.log("result from post:" + result.JSON);
}

async function sendEdditHeroFrom(event) {
  event.preventDefault();

  //  const name = event.target.name.value;
  //  const power = event.target.power.value;
  //  const speed = event.target.speed.value;
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
  console.log("result from put:" + result.JSON);
}
