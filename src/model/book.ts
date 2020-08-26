import mongoose, {Schema, Document} from 'mongoose';

export interface BookInterface extends Document {
    title: string;
    author: string;
}

const BookSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

BookSchema.pre<BookInterface>(/^find/, function (next) {
    if (this instanceof mongoose.Query) {
        this.select('-__v');
    }
    next();
})

const Book = mongoose.model<BookInterface>("Book", BookSchema);
export default Book;