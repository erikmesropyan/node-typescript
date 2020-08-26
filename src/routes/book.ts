import express from 'express';

import * as bookController from '../controller/bookController';

const router = express.Router();

router.route('/')
    .get(bookController.getAllBooks)
    .post(bookController.addBook);

router.route('/:id')
    .get(bookController.getBookById)
    .delete(bookController.deleteBookById)
    .patch(bookController.UpdateBookById)


export default router;