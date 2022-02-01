const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  password : {type : String, required : true},
  user : {type : String, required : true},
})


module.exports = mongoose.model("users",userSchema)