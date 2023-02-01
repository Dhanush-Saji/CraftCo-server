const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
    cancellable: {
      type: Boolean,
      default:false
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'CategoryCollection',
      required:true
    },
    description: {
      type: String,
      required:true
    },
    discount: {
      type: Number,
      max:100,
      min:0,
      default:0
    },
    image: {
      type: String,
      required:true
    },
    name: {
      type: String,
      required:true
    },
    popular: {
      type: Number,
      max:100,
      min:0,
      default:0
    },
    price: {
      type: Number,
      required:true
    },
    return_window: {
      type: Number,
      default:0
    },
    returnable: {
      type: Boolean,
      default:false,
    }
    // dateCreated:{
    //   type:Date,
    //   default:Date.now
    // },
},{ timestamps: true });

const Productmodel=mongoose.model("ProductCollection",productSchema) 

module.exports={
  Productmodel
}
