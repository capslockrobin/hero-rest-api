const fs = require("fs");

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
  getAllHerosFromDb,
  writeHerosToDb,
};