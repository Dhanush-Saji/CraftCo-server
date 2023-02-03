const express = require("express");
const productRouter = express.Router();
const { Productmodel } = require("../Modals/Products.modal");
const {Categorymodel} = require('../Modals/Category.modal.js');
const { data } = require("../data/data");

productRouter.get("/", async(req, res) => {
  // res.send(req.query.category)
  var query = {};
  if(req.query.category){
    req.query.category.indexOf('tote') != -1?req.query.category[req.query.category.indexOf('tote')] = '63d05de41f9a7d7eec2037d7':null
    req.query.category.indexOf('home') != -1?req.query.category[req.query.category.indexOf('home')] = '63d05dfa1f9a7d7eec2037d9':null
    req.query.category.indexOf('kitchen') != -1?req.query.category[req.query.category.indexOf('kitchen')] = '63d06057b016069fae85da7b':null
    req.query.category.indexOf('ceramic') != -1?req.query.category[req.query.category.indexOf('ceramic')] = '63d05db51f9a7d7eec2037d5':null
    req.query.category.indexOf('idols') != -1?req.query.category[req.query.category.indexOf('idols')] = '63d05e151f9a7d7eec2037db':null
    query.category = { $in: req.query.category }
  }
  if(req.query.returnable){
    query.returnable = { $in: req.query.returnable }
  }
  if(req.query.cancellable){
    query.cancellable = { $in: req.query.cancellable }
  }
  if (req.query.price) {
    const prices = Array.isArray(req.query.price) ? req.query.price : [req.query.price];
    query["$and"] = prices.map((priceRange) => {
      const [min, max] = priceRange.split("-");
      return min && max
        ? { price: { $gte: min, $lte: max } }
        : { price: { $gte: min } };
    });
  }
  let sort={};
  if(req.query.sort){
    sort = req.query.sort == 'asc'?{price:1}:req.query.sort == 'reset'?{}:req.query.sort == 'pop'?{popular:1}:{price:-1}
  }
  try {
      
      const productList = await Productmodel.find(query).sort(sort).populate('category')
      if(!productList){
          return res.status(404).send({message: "No products found"})
      }
      
      res.status(200).send(productList)
  } catch (error) {
      res.status(500).send(`Something went wrong,${error.message}`)
  }
});

//search items
productRouter.get("/search", async(req, res) => {
  let name = req.query.name || ""
  try {
      
      const productList = await Productmodel.find({name:{$regex:name,$options:'i'}})
      if(!productList){
          return res.status(404).send({message: "No products found"})
      }
      
      res.status(200).send(productList)
  } catch (error) {
      res.status(500).send(`Something went wrong,${error.message}`)
  }
});

productRouter.post('/',async(req,res)=>{
  try {
    let cat = await Categorymodel.findById(req.body.category)
    if(!cat){
      return res.status(400).send('category not found')
    }
    let result = new Productmodel(req.body)
        const datas = await result.save()
        if(!datas){
            return res.status(404).send(`Can't create product`)
        }
        res.status(200).send(datas)
  } catch (error) {
    res.status(500).send(`Something went wrong,${error.message}`)
  }
})

//to add a collection of datas
productRouter.post('/data',async(req,res)=>{
  try {
    await Productmodel.insertMany(data)
        res.status(200).send('data added')
  } catch (error) {
    res.status(500).send(`Something went wrong,${error.message}`)
  }
})

//deleting category
productRouter.delete('/:id',async(req,res)=>{
  let ID = req.params.id
  try {
      await Productmodel.findByIdAndDelete({_id:ID})
      res.status(200).send('Deleted product successfully')
  } catch (error) {
      res.status(500).send(`Something went wrong,${error.message}`)
  }
})

//update
productRouter.patch('/:id',async(req,res)=>{
  let ID = req.params.id
  let payload = req.body
  try {
      await Productmodel.findByIdAndUpdate({_id:ID},payload)
      res.status(200).send('Updated product successfully')
  } catch (error) {
      res.status(500).send(`Something went wrong,${error.message}`)
  }
})

module.exports = {
  productRouter,
};
