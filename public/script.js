window.addEventListener("load", main);

function main() {
  const buttom = document.getElementById("hero-button");
  buttom.addEventListener("click", fetchHeros);

  const addForm = document.getElementById("add-hero");
  addForm.addEventListener("submit", addHero);
}

async function fetchHeros(event) {
  console.log("hämtar heros");
  const response = await fetch("/api/heros");
  const result = await response.json();
  
  console.log(result);


  
  for (var i = 0; i < result.length; i++) {
    var hero = result[i];

    let textOfHero = document.createElement("ul");
    textOfHero.innerText = "Hero: " + hero.name + "power level: " + hero.power + "speed level: " + hero.speed;
    document.getElementById("hero-list").appendChild(textOfHero);
    // event.target.innerHTML = "Heros : " + hero.name;
    console.log(hero.id);
    console.log(hero.name);
  }
  // event.target.innerHTML = "Heros : " + result.name;

  // document.getElementById("demo").innerHTML =
  //   person.name + ", " + person.age + ", " + person.city;
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
      console.log("result from post:" + result.JSON);
   
}