import bcrypt from 'bcrypt';
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
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
//Method to hash the password
userSchema.pre<IUser>('save', async function (next) {
    const user = this as IUser;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});
// Method to compare the password
userSchema.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    const user = this as IUser;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
};

export default mongoose.model<IUser>('User', userSchema);
