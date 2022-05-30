import express from "express";
import connection from "../config/connection.js";

const router = express.Router();


//Inserts user to the DataBase (CREATE)

        //CallBack Method
// router.post("/add",(req,res) =>{
//     const {username, location} = req.body;
//     connection.query(
//         `INSERT INTO users(username, location) VALUES(?,?)`,
//         [username, location],
//         (err,results,fields)=>{
//             if (err) throw err;
//             console.log(results);
//             if (results.affectedRows === 1)
//                 res.status(200).json({success: true, message: "User Added to DB"});
//             else 
//                 res.status(200).json({success: false,message: "Unable to insert User"});
//         }
//     );
// });

    //async await ,method
router.post("/add",async (req,res) =>{
    const {username, location} = req.body;
    const [rows, fields] = await connection.query(
        `INSERT INTO users(username, location) VALUES(?,?)`,
        [username, location]
    );
    res.status(200).json(rows);
});



//read data
router.get("/:id",async (req,res) =>{
    const {id} = req.params;
    if(id){
        const [rows, fields] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]
        );
        
        res.json(...rows);
    }else{
        res.json({success: false, message: "User id not provided"});
    }
});


//update Data
router.put("/update/:id",async (req,res) =>{

    const {id} = req.params;

    if(id){
        const {username, location} = req.body;
        const [rows,fields] = await connection.query(
            `UPDATE users SET username = ?, location = ? WHERE id = ?`,
            [username,location,id]
        );
        res.status(200).json({success: true, message: "User updated"});
    }else{
        res.json({success: false, message: "User id not provided"});
    }

});


//delete
router.delete("/delete/:id",async (req,res) =>{
    const {id} = req.params;

    if(id){
        const [rows,fields] = await connection.query(
            `DELETE FROM users WHERE id = ?`,
            [id]
        );
        res.status(200).json({success: true, message: "User Deleted"});
    }else{
        res.status(403).json({success: false, message:"User id not provided"});
    }
});

export default router