import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import Book from '../model/book';

export default (db: string) => {
    const connect = () => {
        mongoose
            .connect(db,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
            .then(async () => {
                if ((await Book.find()).length === 0) {
                    const file: string = fs.readFileSync(path.join(__dirname, 'init.json'), 'utf-8');
                    await Book.create(JSON.parse(file));
                }
                console.log(`Successfully connected to ${db}`);
            })
            .catch(error => {
                console.log("Error connecting to database: ", error);
                return process.exit(1);
            });
    };
    connect();

    mongoose.connection.on("disconnected", connect);
};