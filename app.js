//jsversion esversion: 6


const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Run a mile", "Play a game"];
const workItems = [];

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render("list", {listTitle: day, newItems: items});
});

app.post("/", function(req, res) {
  let item = req.body.newItem;

  if(req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, ()=> {
  console.log("Server started on port 3000");
});
