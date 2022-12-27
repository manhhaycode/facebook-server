import IUser from '@modules/users/users.interface';
import { TokenData } from '@modules/auth';
import { NextFunction, Request, Response } from 'express';
import { model } from 'mongoose';
import { RegisterDto, UpdateDto } from './dtos/';
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

    public update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: UpdateDto = req.body;
            const updateUser: IUser = await this.userService.updateUser(req.user.id, model);
            res.status(201).json(updateUser);
        } catch (error) {
            next(error);
        }
    };
}
