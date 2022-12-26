import { Route } from '@core/interfaces';
import { validationMiddleware } from '@core/middleware';
import { Router } from 'express';
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
    }
}
