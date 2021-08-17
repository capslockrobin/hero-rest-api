const express = require("express");
const app = express();

let heros = [];

app.use(express.static("public"));
app.use(express.json());



app.get("/api/heros", (req, res) => {
  // res.status(200).send("working")
  res.status(200).json(heros);
});

app.post("/api/heros", (req, res) => {
  console.log("BODY ", req.body);
  if (req.body) {
    let newId = heros.length;
    console.log(newId);
    let hero = req.body
    hero.id = newId
    heros.push(hero);
    return res.status(201).json(req.body);
  }

  res.status(400).json("missing body");
});



app.delete("/api/heros/:id", (req, res) => {
  let length = heros.length;
  heros = heros.filter(x=>x.id != req.params.id)
  if(heros.length !== length){
     console.log(req.params.id);
     res.status(200);
     return res.send(heros);
  }
 res.status(404).send("Id not avilable to delete");
})

app.put("/api/heros/:id", (req, res) => {
  if(req.body.name){
     let herosId = req.params.id;
     objIndex = heros.findIndex((obj) => obj.id == herosId);
     console.log("Before update: ", heros[objIndex]);

     heros[objIndex].name = req.body.name;
     heros[objIndex].power = req.body.power;
     heros[objIndex].speed = req.body.speed;

     return res.status(200).json(heros[objIndex]);
     // update ska man inte behöva fylla i allt igen, precis som förra skit uppgiften
  }

  res.status(400).json("missing name")
 
})
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
