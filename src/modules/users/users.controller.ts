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

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user: IUser = await this.userService.getUserById(req.params['id']);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };

    public getAllPaging = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page);
            const keyword = req.query.keyword || '';
            const user = await this.userService.getAllPaging(keyword.toString(), page);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };
}
