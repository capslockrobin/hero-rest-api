const { Request, Response, NextFunction } = require('express');
const fs = require("fs");

/**
 * Responds with all heros from db
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
function getHeros(req, res) {
  let heros = getAllHerosFromDb();
  res.status(200).json(heros);
};

/**
 * Responds with the requested hero or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const getOneHero = (req, res, next) => {
  let rawdata = fs.readFileSync("server/heroDb.json");
  let heros = JSON.parse(rawdata);
  let hero = heros.find((h) => h.id == req.params.id);

  if (hero) {
    return res.status(200).json(hero);
  }
  res.status(404).json("no hero on this Id: " + req.params.id);
};

/**
 * Responds with the requested hero or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const addHero = (req, res) => {
  if (req.body.name && req.body.power && req.body.speed) {
    let heros = getAllHerosFromDb();

    let hero = req.body;
    hero.id = heros.length;
    heros.push(hero);

    writeHerosToDb(heros);
    return res.status(201).json(req.body);
  }

  res.status(400).json("missing parts of correct body");
};

/**
 * Responds with the requested hero or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const deleteHero = (req, res) => {
  const { id } = req.params;

  let heros = getAllHerosFromDb();
  for (var i = 0; i < heros.length; i++) {
    if (heros[i].id && heros[i].id == id) {
      heros.splice(i, 1);
      writeHerosToDb(heros);
      return res.status(200).json("Deleted succsesfully id: " + req.params.id);
    }
  }
  res.status(404).json("Id not avilable to delete");
};


/**
 * Responds with the requested hero or nothing if not found
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const updateHero = (req, res) => {
  if (req.body.name && req.body.power && req.body.speed) {
    const { id } = req.params;

    let heros = getAllHerosFromDb();

    objIndex = heros.findIndex((obj) => obj.id == id);
    console.log("Before update: ", heros[objIndex]);

    heros[objIndex].name = req.body.name;
    heros[objIndex].power = req.body.power;
    heros[objIndex].speed = req.body.speed;

    writeHerosToDb(heros);

    return res.status(200).json(heros[objIndex]);
    // update ska man inte behöva fylla i allt igen, precis som förra skit uppgiften
  }

  res.status(400).json("missing parts of correct body");
};

function getAllHerosFromDb() {
  let rawdata = fs.readFileSync("server/heroDb.json");
  let heros = JSON.parse(rawdata);
  return heros;
}

function writeHerosToDb(heros) {
  let data = JSON.stringify(heros);
  fs.writeFileSync("server/heroDb.json", data);
}

module.exports = {
  getHeros,
  getOneHero,
  addHero,
  deleteHero,
  updateHero,
};