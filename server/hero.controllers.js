const { Request, Response, NextFunction } = require('express');
const {getAllHerosFromDb,writeHerosToDb,} = require("./hero.jsonHandler");
const { v4: uuidv4 } = require("uuid");

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
  let heros = getAllHerosFromDb();
  let hero = heros.find((h) => h.id == req.params.id);

  if (hero) {
    return res.status(200).json(hero);
  }
  res.status(404).json("no hero on this Id: " + req.params.id);
};

/**
 * Add Hero to DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const addHero = (req, res) => { 
    let heros = getAllHerosFromDb();
    let hero = {...req.body, id: uuidv4()}
    heros.push(hero);
    writeHerosToDb(heros);
    return res.status(201).json(req.body);
};

/**
 * Delete hero from DB
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const deleteHero = (req, res) => {
  const { id } = req.params;

  let heros = getAllHerosFromDb();
  for (var i = 0; i < heros.length; i++) {
    if (heros[i].id == id) {
      heros.splice(i, 1);
      writeHerosToDb(heros);
      return res.status(200).json("Deleted succsesfully id: " + req.params.id);
    }
  }
  res.status(404).json("Id not avilable to delete");
};


/**
 * Update hero in db
 * @param {Request} req 
 * @param {Response} res 
 * @param {NextFunction} next 
 */
const updateHero = (req, res) => {
    const { id } = req.params;

    let heros = getAllHerosFromDb();
    objIndex = heros.findIndex((obj) => obj.id == id);
    heros[objIndex] = {...req.body, id: id}
    writeHerosToDb(heros);

    return res.status(200).json(heros[objIndex]);
};

module.exports = {
  getHeros,
  getOneHero,
  addHero,
  deleteHero,
  updateHero,
};