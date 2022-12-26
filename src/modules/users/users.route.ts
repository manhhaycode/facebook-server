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
        this.router.post(this.path, this.UserController.register); // POST : http://localhost:5000/api/user
    }
}
