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

  var name_regex=/^[a-zA-Zñ\s]{4,255}$/
  var desp_regex=/^(A|B)\d\d\d{4,4}$/
  var puest_regex=/^(JEFE_AREA)|(DIRECTOR_GENERAL)|(JEFE_PROYECTO)|(ANALISTA)|(PROGRAMADOR)&/
  var sal = parseFloat(net)

  if(name!=""){
    if(name_regex.test(name)){
      if(desp_regex.test(desp)){
        if(puest_regex.test(puest)){
          if(1000<sal&&sal<6000){
            if(18<sal&&sal<67){
              retencion=sal
            }else{
              error="MAL_EDAD"
            }
          }else{
            error="MAL_SUELDO"
          }
        }else{
          error="MAL_PUESTO"
        }
      }else{
        error="MAL_DESPACHO"
      }
    }else{
      error="MAL_NOMBRE"
    }
  }

  return {error:error,
    retencion:retencion}
}

app.get("/particion", async (req, res, next) => {
  var name=decodeURI(req.query.name)
  var desp=decodeURI(req.query.desp)
  var puest=decodeURI(req.query.puest)
  var age=decodeURI(req.query.age)
  var net=decodeURI(req.query.net)

  console.log(name, desp, puest, age, net, "request")

  var resp = part(name, desp, puest, age, net)

  console.log(resp)

  res.json({data:resp,
    msg:"egg"});
});
//run this sheet
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
