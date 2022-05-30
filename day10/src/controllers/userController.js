import connection from "../models/index.js";
import userModel from "../models/userModel.js";
import {Op} from "sequelize";

export default class UserController{

    //Add User to Database
    async addUser(req,res) {
        const {username, location} = req.body;
        const data = await userModel.bulkCreate(req.body);
        console.log(data);
        res.json(data);
    }

    //Get User By ID
    async getUserByID(req,res){
        const {id} = req.params;
        if(id){    
            const data = await userModel.findByPk(id);
            if (data){
                res.json(data);
            }else{
                res.json([]);
            }
        }else{
            res.json({success: false, message: "User id not provided"});
        }
    }

    //Update User
    async updateUser(req,res){

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
        }else{
            res.json({success: false, message: "User id not provided"});
        }    
    }

    //Delete User
    async deleteUser(req,res){
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
        }else{
            res.status(403).json({success: false, message:"User id not provided"});
        }
    }

    //Search User by location
    async searchUserByLocation(req,res){
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
    }
}