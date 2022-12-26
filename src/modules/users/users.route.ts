import { Route } from '@core/interfaces';
import { Router } from 'express';
import UserController from './users.controller';

export default class UsersRoute implements Route {
    public path = '/api/user';
    public router = Router();

    public UserController = new UserController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
<<<<<<< HEAD
        // POST : http://localhost:5000/api/user
        this.router.post(this.path, validationMiddleware(RegisterDto, true), this.UserController.register);
=======
        this.router.post(this.path, this.UserController.register); // POST : http://localhost:5000/api/user
>>>>>>> 1d7cc5bb21bea4785647205b9f79cba1a0d021b8
    }
}
