const express = require("express");
const {
  getHeros,
  getOneHero,
  updateHero,
  addHero,
  deleteHero,
} = require("./hero.controllers");


const router = express.Router();



router.get("/api/heros", getHeros)

router.get("/api/heros/:id",getOneHero);

router.post("/api/heros", addHero);

router.delete("/api/heros/:id", deleteHero);

router.put("/api/heros/:id", updateHero);


module.exports = router;
