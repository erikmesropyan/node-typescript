import {Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose'

import Book from '../model/book';

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
    const books = await Book.find();

    res.json({
        data: books
    })
}

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    const {title, author} = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: 'field author and title are required'
        })
    }
    const book = await Book.create({
        author,
        title
    })
    res.status(201).json({
        data: book
    })
}

export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    try {
        new mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).json({
            message: 'wrong type of Id'
        })
    }

    const book = await Book.findById(id);

    if (!book) {
        return res.status(404).json({
            message: 'book not found'
        })
    }

    res.status(200).json({
        data: book
    })
}

export const UpdateBookById = async (req: Request, res: Response, next: NextFunction) => {
    const {id} = req.params;
    const {author, title} = req.body;


    if (!title || !author) {
        return res.status(400).json({
            message: 'field author and title are required'
        })
    }

    await Book.updateOne({
        _id: id
    }, {
        author,
        title
    });

    res.status(200).json({
       message: 'book has been updated'
    })
}

export const deleteBookById = async (req: Request, res: Response, next: NextFunction) => {
    let {id} = req.params;

    try {
        new mongoose.Types.ObjectId(id);
    } catch (err) {
        return res.status(400).json({
            message: 'wrong type of Id'
        })
    }

    await Book.deleteOne({
        _id: id
    });

    res.status(204).json();
}