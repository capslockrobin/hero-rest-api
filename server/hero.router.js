const express = require("express");
const {
  getHeros,
  getOneHero,
  updateHero,
  addHero,
  deleteHero,
} = require("./hero.controllers");

const {
  saveValidation,
  updateValitation,
} = require("./hero.validation");

const router = express.Router();

router.get("/api/heroes", getHeros)
router.get("/api/heroes/:id", getOneHero);
router.post("/api/heroes", saveValidation, addHero);
router.delete("/api/heroes/:id", deleteHero);
router.put("/api/heroes/:id",updateValitation, updateHero);

module.exports = router;
