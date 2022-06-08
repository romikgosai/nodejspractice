import bookModel from "../models/bookModel.js";
import { Op } from "sequelize";
import textConstants from "../constants/textConstants.js";
import urlConstants from "../constants/urlConstants.js";

export default class BookController {
  //Add Books
  async addBook(req, res, imageName) {
    try {
      const data = await bookModel.create({ ...req.body, image: imageName });
      console.log(data);
      if (data) {
        res.json(data);
      } else
        res.json({ success: false, message: "Error during Adding the book" });
    } catch (err) {
      res.json({ success: false, message: "Error in adding the book." });
    }
  }

  //Get Books
  async getBookByID(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.findByPk(id);
      data ? res.json(data) : res.json({});
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  //Update Books
  async updateBook(req, res) {
    const { id } = req.params;

    if (id) {
      const data = await bookModel.update(req.body, {
        where: {
          id: id,
        },
      });
      if (data[0]) {
        res.json({ success: true, message: "Book data Updated" });
      } else {
        res.json({ success: false, message: "Cannot update book data" });
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  //Delete Book
  async deleteBook(req, res) {
    const { id } = req.params;
    if (id) {
      const data = await bookModel.destroy({
        where: {
          id: id,
        },
      });
      if (data) {
        res.json({ success: true, message: "Book data Deleted" });
      } else {
        res.json({ success: false, message: "Cannot delete book data" });
      }
    } else {
      res.json({ success: false, message: textConstants.BOOK_ID_NOT_PROVIDED });
    }
  }

  //Search Book
  async searchBook(req, res) {
    const { q } = req.query;

    if (q) {
      const data = await bookModel.findAll({
        where: {
          [Op.or]: {
            name: {
              [Op.like]: `%${q}%`,
            },
            author: {
              [Op.like]: `%${q}%`,
            },
          },
        },
        raw: true,
      });

      console.log(data);
      for (let d of data) {
        d.image = urlConstants.IMAGE_PATH_URL + d.image;
      }
      res.json(data);
    } else res.json({ success: false, message: "Empty Query Search string." });
  }

  async getBookList(req, res) {
    let { limit } = req.query;

    if (!limit) limit = 20;
    try {
      const data = await bookModel.findAll({
        limit: parseInt(limit),
        raw: true,
      });
      for (let d of data) {
        d.image = urlConstants.IMAGE_PATH_URL + d.image;
      }
      res.json(data);
    } catch (err) {
      res.json({ success: false, message: err });
    }
  }
}
