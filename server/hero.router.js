const express = require("express");
const router = express.Router();

let heros = [];


router.get("/api/heros", (req, res) => {
  res.status(200).json(heros);
});

router.get("/api/heros/:id", (req, res) => {
  let hero = heros.find((h) => h.id == req.params.id);
  if (hero) {
    return res.status(200).json(hero);
  }
  res.status(404).json("no hero on this Id: " + req.params.id);
});

router.post("/api/heros", (req, res) => {
  console.log("BODY ", req.body);
  if (req.body.name && req.body.power && req.body.speed) {
    let hero = req.body;
    hero.id = heros.length;
    heros.push(hero);
    return res.status(201).json(req.body);
  }

  res.status(400).json("missing parts of correct body");
});

router.delete("/api/heros/:id", (req, res) => {
  let length = heros.length;
  heros = heros.filter((x) => x.id != req.params.id);
  if (heros.length !== length) {
    console.log(req.params.id);
    return res.status(200).json("Deleted succsesfully id: " + req.params.id);
  }

  res.status(404).send("Id not avilable to delete");
});

router.put("/api/heros/:id", (req, res) => {
  if (req.body.name && req.body.power && req.body.speed) {
    let herosId = req.params.id;
    objIndex = heros.findIndex((obj) => obj.id == herosId);
    console.log("Before update: ", heros[objIndex]);

    heros[objIndex].name = req.body.name;
    heros[objIndex].power = req.body.power;
    heros[objIndex].speed = req.body.speed;

    return res.status(200).json(heros[objIndex]);
    // update ska man inte behöva fylla i allt igen, precis som förra skit uppgiften
  }

  res.status(400).json("missing parts of correct body");
});

module.exports = router