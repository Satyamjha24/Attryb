const express = require("express")
const { OEMModel } = require("../Modals/oemItems.modal")
const OEMRouter = express.Router()

// get OEM Data with or without search
OEMRouter.get("/", async (req, res) => {
  let { search } = req.query;

  try {
    const data = search ? await OEMModel.find({ "title": { "$regex": search, "$options": "i" } })
        :
        await OEMModel.find()

    res.send(data);
  } catch (err) {
    res.send(err.message);
    console.log('err:', err);
  }
});
// Get data
OEMRouter.get("/:id", async (req, res) => {
    const ID = req.params.id
    console.log('id:', ID)
  
    try {
      const data = await OEMModel.find({_id:ID})
  
      res.send(data);
    } catch (err) {
      res.send(err.message);
      console.log('err:', err);
    }
  });
  

//OEM data post
OEMRouter.post("/post",async(req,res)=>{
    const data = req.body
    console.log('data:', data)
    try{
        const datas = await OEMModel.insertMany(data)
        res.status(200).send(datas)
    }catch(err){
        res.status(400).send({'err':err.message})
        //console.log({"msg":"Error Occured","error":err})
    }
})
module.exports={
    OEMRouter
}