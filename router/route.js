router.delete("/deleteproposal",async (req,res) => {
    let {id} = req.body; 
    try {
        
            
           await proposalModel.findByIdAndDelete(id);
       const payload =  await proposalModel.find();
           
        //    res.send({ status : "ok" });
           res.send(payload)

          
   } catch(error)
   {
       res.send({ status : "error"});
   } 
    });
