import express from "express";
import connection from "../models/index.js";
import userModel from "../models/userModel.js";
import {Op} from "sequelize";

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
    // const [rows, fields] = await connection.query(
    //     `INSERT INTO users(username, location) VALUES(?,?)`,
    //     [username, location]
    // );
    // res.status(200).json(rows);
    const data = await userModel.bulkCreate(req.body);
    console.log(data);
    res.json(data);
});



//read data
router.get("/:id",async (req,res) =>{
    const {id} = req.params;
    if(id){

        const data = await userModel.findByPk(id);
        if (data){
            res.json(data);
        }else{
            res.json([]);
        }



        // const [rows, fields] = await connection.query(
        //     `SELECT * FROM users WHERE id = ?`,
        //     [id]
        // );
        
        // res.json(...rows);
    }else{
        res.json({success: false, message: "User id not provided"});
    }
});


//update Data
router.put("/update/:id",async (req,res) =>{

    const {id} = req.params;

    if(id){
        const {username, location} = req.body;

        const data = await userModel.update({
            username: username,
            location: location,
        },{
            where: {
                id: id,
            }
        })
        console.log(data);
        if (data[0]){
            res.status(200).json({success: true, message: "User updated"});
        }else{
            res.status(200).json({success: true, message: "Unable to update user"});
        }

        
        // const [rows,fields] = await connection.query(
        //     `UPDATE users SET username = ?, location = ? WHERE id = ?`,
        //     [username,location,id]
        // );
        // res.status(200).json({success: true, message: "User updated"});
    }else{
        res.json({success: false, message: "User id not provided"});
    }

});


//delete
router.delete("/delete/:id",async (req,res) =>{
    const {id} = req.params;

    if(id){

        const data = await userModel.destroy({
            where:{
                id: id,
            }
        });
        console.log(data);
        if (data){
            res.status(200).json({success: true, message: "User deleted"});
        }else{
            res.status(200).json({success: true, message: "Unable to delete user"});
        }

        // const [rows,fields] = await connection.query(
        //     `DELETE FROM users WHERE id = ?`,
        //     [id]
        // );
        // res.status(200).json({success: true, message: "User Deleted"});
    }else{
        res.status(403).json({success: false, message:"User id not provided"});
    }
});

router.get("/search/by", async (req,res) =>{
    const {location} = req.query;

    const data = await userModel.findAll({
        where:{
            location:{
                [Op.like]:`%${location}%`,
            }
        }
    });

    console.log(data);
    res.json(data);
})

export default router