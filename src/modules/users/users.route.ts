import { Route } from '@core/interfaces';
import { validationMiddleware, authMiddleware } from '@core/middleware';
import { Router } from 'express';
import { UpdateDto } from './dtos';
import RegisterDto from './dtos/register.dto';
import UserController from './users.controller';

export default class UsersRoute implements Route {
    public path = '/api/user';
    public router = Router();

    public UserController = new UserController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        // POST : http://localhost:5000/api/user
        this.router.post(this.path, validationMiddleware(RegisterDto, true), this.UserController.register);

        // POST: http://localhost:5000/api/user/update
        this.router.post(
            this.path + '/update',
            authMiddleware,
            validationMiddleware(UpdateDto, true),
            this.UserController.update,
        );
        this.router.delete(this.path + '/delete', authMiddleware, this.UserController.remove);
        this.router.get(this.path + '/paging', authMiddleware, this.UserController.getAllPaging);
        this.router.get(this.path + '/:id', authMiddleware, this.UserController.getUserById);
    }
}
