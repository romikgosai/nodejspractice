import express from "express";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use((req,res,next) => {
    // console.log(req.headers);
    // console.log("books route");

    validateToken(req,res,next);
})

router.get("/", (req,res) =>{
    res.status(200).send({name:"Romik"});
})

router.post("/add",validateToken, (req,res)=>{
    // console.log(req.body,req.query);
    res.status(200).json({added:true});
})

router.delete("/delete/:id", (req,res) => {

    console.log(req.params);

    // const {id, author, location } = req.query;
    // console.log(id, author, location)
    res.status(200).json({delete: true});
});

export default router;