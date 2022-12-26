import { TokenData } from '@modules/auth';
import { NextFunction, Request, Response } from 'express';
import { model } from 'mongoose';
import RegisterDto from './dtos/register.dto';
import UserService from './user.service';

export default class UsersController {
    private userService = new UserService();

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: RegisterDto = req.body;
            const tokenData: TokenData = await this.userService.createUser(model);
            res.status(201).json(tokenData);
        } catch (error) {
            next(error);
        }
    };
}
