const express = require("express");
const {
  getHeros,
  getOneHero,
  updateHero,
  addHero,
  deleteHero,
} = require("./hero.controllers");

const { saveValidation, updateValitation } = require("./hero.validation");

const router = express.Router();

router.get("/api/heros", getHeros)
router.get("/api/heros/:id", getOneHero);
router.post("/api/heros", saveValidation, addHero);
router.delete("/api/heros/:id", deleteHero);
router.put("/api/heros/:id",updateValitation, updateHero);

module.exports = router;
