const express = require("express");
const categoryRouter = express.Router();
const {Categorymodel} = require('../Modals/Category.modal.js')

categoryRouter.get("/", async(req, res) => {
    try {
        
        const categoryList = await Categorymodel.find()
        if(!categoryList){
            return res.status(404).send({message: "No category found"})
        }
        
        res.status(200).send(categoryList)
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
});

//adding category
categoryRouter.post('/',async(req,res)=>{
    let body = req.body
    try {
        let result = new Categorymodel(body)
        const datas = await result.save()
        if(!datas){
            return res.status(404).send(`Can't create category`)
        }
        res.status(200).send(datas)
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
})

//deleting category
categoryRouter.delete('/:id',async(req,res)=>{
    let ID = req.params.id
    try {
        await Categorymodel.findByIdAndDelete({_id:ID})
        res.status(200).send('Deleted successfully')
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
})
//update
categoryRouter.patch('/:id',async(req,res)=>{
    let ID = req.params.id
    let payload = req.body
    try {
        await Categorymodel.findByIdAndUpdate({_id:ID},payload)
        res.status(200).send('Updated successfully')
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
})


module.exports = {
    categoryRouter
};
