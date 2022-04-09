import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
}
const userSchema = new Schema({
    email: {
        type: String,
        uniquie: true,
        required: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default model<IUser>('User', userSchema);
