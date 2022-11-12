const express = require("express");

var app = express();

const PORT = process.env.PORT;

//global
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.all("/", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
//end of global

//test
app.get("/", async (req, res, next) => {
  res.json({msg:"welcome :3"});
});

//particion

const part = function(name, desp, puest, age, net){
  var error="ERROR_CONNECT_BD"
  var retencion=0


  return {error:valid,
    retencion:retencion}
}

app.get("/particion", async (req, res, next) => {
  var name=window.decodeURI(req.query.name)
  var desp=window.decodeURI(req.query.desp)
  var puest=window.decodeURI(req.query.puest)
  var age=window.decodeURI(req.query.age)
  var net=window.decodeURI(req.query.net)

  var resp = part(name, desp, puest, age, net)

  res.json({data:resp,
    msg:"egg"});
});
//run this sheet
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
