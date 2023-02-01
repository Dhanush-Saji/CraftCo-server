const express = require("express");
const { Usermodal } = require("../Modals/User.modal");
const userRouter = express.Router();

userRouter.post("/", async (req, res) => {
    let num = Number(req.body.mobile)
  try {
    let userExist = await Usermodal.find(req.body);
    if(userExist.length>0) {
        return res.status(200).send({'User Exist':userExist})
    }
    let user = new Usermodal(req.body)
    let data = await user.save()
    res.status(200).send({'data added':data})
} catch (error) {
    res.status(500).send(`Something went wrong,${error.message}`)
}
});

userRouter.patch('/:id',async(req,res)=>{
    let ID = req.params.id
    let payload = req.body
    try {
        await Usermodal.findByIdAndUpdate({_id:ID},payload)
      res.status(200).send('Updated user successfully')
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
})

userRouter.delete('/:id',async(req,res)=>{
    let ID = req.params.id
    try {
        await Usermodal.findByIdAndDelete({_id:ID})
      res.status(200).send('Deleted user successfully')
    } catch (error) {
        res.status(500).send(`Something went wrong,${error.message}`)
    }
})

module.exports = {
  userRouter,
};
