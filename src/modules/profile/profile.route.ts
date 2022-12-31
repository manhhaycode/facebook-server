import { Route } from '@core/interfaces';
import { validationMiddleware, authMiddleware } from '@core/middleware';
import { Router } from 'express';
import CreateProfileDto from './dtos/CreateProfile.dto';
import ProfileController from './profile.controller';

export default class ProfileRoute implements Route {
    public path = '/api/profile';
    public router = Router();

    public ProfileController = new ProfileController();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.post(
            this.path,
            authMiddleware,
            validationMiddleware(CreateProfileDto, true),
            this.ProfileController.create,
        );
    }
}
