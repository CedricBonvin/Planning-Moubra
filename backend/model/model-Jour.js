const mongoose = require("mongoose");

const jourSchema = mongoose.Schema({
  collab1 : {type : String, required : false},
  collab2 : {type : String, required : false},
  remarque : {type : String, required : false},
  date : {type : Date, required : true},
  info : {type : String, required : false},
  weekend : { type : Boolean, required : false, default : false}
})


module.exports = mongoose.model("planningmoubras",jourSchema)