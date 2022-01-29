const mongoose = require("mongoose");

const jourSchema = mongoose.Schema({
  collab1 : {type : String, required : false},
  collab2 : {type : String, required : false},
  remarque : {type : String, required : false},
  date : {type : Date, required : true},
  heureOuverture : {type : Number, required : true, default : 5 },
  weekend : { type : Boolean, required : false, default : false},
  hauteSaison : { type : Boolean, required : false, default : false},
})


module.exports = mongoose.model("planningmoubras",jourSchema)