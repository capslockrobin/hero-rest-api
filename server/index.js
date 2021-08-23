const express = require("express");
const heroRouter = require("./hero.router")
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());

app.use(express.json());
app.use(heroRouter);

//error handling 404
app.use((req, res) => res.status(404).json("Resource not found"))

//error handling 500
app.use((err,req,res,next) => {
  console.trace(err)
  res.status(500).json("Somthing went wrong");
})

//start server
app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
