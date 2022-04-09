import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import User, { IUser } from '../models/user';

function createToken(user: IUser) {
    return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
        expiresIn: 86400,
    });
}
export const signUp = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Email and password are required',
        });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
        return res.status(400).json({
            message: 'The user already exists',
        });
    }
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
};
export const signIn = async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            message: 'Email and password are required',
        });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) {
        return res.status(400).json({
            message: 'The user does not exist',
        });
    }
    const isValidPassword = await userExist.comparePassword(req.body.password);
    if (!isValidPassword) {
        return res.status(400).json({
            message: 'Please, check your password or email',
        });
    }
    return res.status(200).json({ token: createToken(userExist) });
};
