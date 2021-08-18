window.addEventListener("load", main);

function main() {
  fetchHeros();

  const addForm = document.getElementById("add-hero");
  addForm.addEventListener("submit", addHero);
}

async function fetchHeros() {
  console.log("hämtar heros");
  const response = await fetch("/api/heros");
  const heros = await response.json();
  
  console.log(heros);


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

    // event.target.innerHTML = "Heros : " + hero.name;
    console.log(hero.id);
    console.log(hero.name);
  }
  // event.target.innerHTML = "Heros : " + result.name;

  // document.getElementById("demo").innerHTML =
  //   person.name + ", " + person.age + ", " + person.city;
}

function edditHero(event){

}

function deleteHero(event){

}



async function addHero(event){
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