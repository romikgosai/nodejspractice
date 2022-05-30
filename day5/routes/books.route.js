import express from "express";

const router = express.Router();

router.get("/", (req,res) =>{
    res.status(200).send({name:"Romik"});
})

router.get("/add",(req,res)=>{
    res.status(200).json({added:true});
})

router.get("/delete/:id", (req,res) => {

    console.log(req.params);

    // const {id, author, location } = req.query;
    // console.log(id, author, location)
    res.status(200).json({delete: true});
});

export default router;