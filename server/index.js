const express = require("express");
const heroRouter = require("./hero.router")

const app = express();


app.use(express.static("public"));
app.use(express.json());
app.use(heroRouter);

app.use((req, res) => res.status(404).json("Resource not found"))

app.use((err,req,res,next) => {
  console.trace(err)
  res.status(500).json("Somthing went wrong");
})

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
