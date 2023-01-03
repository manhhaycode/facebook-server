import { Route } from '@core/interfaces';
import { validationMiddleware, authMiddleware } from '@core/middleware';
import { Router } from 'express';
import { CreateProfileDto, EducationDto, ExperienceDto } from './dtos';
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

        this.router.post(
            this.path + '/experience',
            authMiddleware,
            validationMiddleware(ExperienceDto, true),
            this.ProfileController.addExperience,
        );

        this.router.post(
            this.path + '/education',
            authMiddleware,
            validationMiddleware(EducationDto, true),
            this.ProfileController.addEducation,
        );
    }
}
