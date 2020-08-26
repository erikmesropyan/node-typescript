import express, {Application} from 'express';

import connect from './config/connect';
import bookRouter from './routes/book';

const app: Application = express();

const PORT: string | number = process.env.PORT || 3000;

const DB: string = 'mongodb://localhost:27017/books';

connect(DB);

app.use(express.json());

app.use('/book', bookRouter);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})