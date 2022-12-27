import mongoose, { Schema } from 'mongoose';
import IUser from './users.interface';

const UserSchema = new Schema({
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    avatar: {
        type: String,
    },
    token: {
        type: String,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    updateAt: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model<IUser & mongoose.Document>('user', UserSchema);
