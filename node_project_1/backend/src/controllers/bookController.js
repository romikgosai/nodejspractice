import bookModel from "../models/bookModel.js";
import {Op} from"sequelize";

export default class BookController
{
    //Add Books
    async addBook(req,res,imageName){
        const data = await bookModel.create({...req.body, image: imageName});
        console.log(data);
        if(data){
            res.json(data);
        }else res.json({success: false, message: "Error during Adding the book"});
    }
    
    
    //Get Books
    async getBookByID(req,res){
        const {id} =req.params;

        if(id){
            const data = await bookModel.findByPk(id);
            (data)?res.json(data):res.json({});
        }else{
            res.json({success: false, message: "Book ID not provided"})
        }
    }


    //Update Books
    async updateBook(req,res){
        const {id} = req.params;

        if(id){
            const data = await bookModel.update(req.body,{
                where: {
                    id: id,
                }
            });
            if(data[0]){
                res.json({success: true, message: "Book data Updated"});
            }
            else{
                res.json({success: false, message: "Cannot update book data"});
            }
        }else{
            res.json({success: false, message: "Book ID not provided"});
        }
    }


    //Delete Book
    async deleteBook(req,res){
        const {id} = req.params;
        if(id){
            const data = await bookModel.destroy({
                where: {
                    id: id,
                }
            });
            if(data){
                res.json({success: true, message: "Book data Deleted"});
            }
            else{
                res.json({success: false, message: "Cannot delete book data"});
            }
        }else{
            res.json({success: false, message: "Book ID not provided"});
        }
    }

    
    //Search Book
    async searchBook(req,res){
        const {q} = req.query;

        if(q){
            const data = await bookModel.findAll({
                where: {
                    [Op.or]:{
                        name:{
                            [Op.like]:`%${q}%`,
                        },
                        author:{
                            [Op.like]:`%${q}%`,
                        },
                    }
                }
            })
            console.log(data);
            res.json(data);
        }else{
            res.json({success: false, message: "Empty query search string"});
        }
    }

    async getBookList(req,res){
        let {limit} = req.query;

        if(!limit) limit = 20;
        const data = await bookModel.findAll({
            limit: limit,
        });
        for (let d of data){
            d.dataValues.image = "http://localhost:8000/uploads/"+d.dataValues.image;
        }
        res.json(data);
    }
}