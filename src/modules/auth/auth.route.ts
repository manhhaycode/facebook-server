import { Route } from '@core/interfaces';
import { validationMiddleware } from '@core/middleware';
import { Router } from 'express';
import AuthController from './auth.controller';
import LoginDto from './auth.dto';

export default class AuthRoute implements Route {
    public path = '/api/auth';
    public router = Router();

    public AuthController = new AuthController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        // POST : http://localhost:5000/api/user
        this.router.post(this.path, validationMiddleware(LoginDto, true), this.AuthController.login);
    }
}
