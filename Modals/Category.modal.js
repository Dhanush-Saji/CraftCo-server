const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    category: {
        type:String
    }
  });
  
  const Categorymodel=mongoose.model("CategoryCollection",categorySchema) 

  module.exports={
    Categorymodel
  }