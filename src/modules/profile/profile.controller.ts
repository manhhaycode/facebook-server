import { IProfile } from './profile.interface';
import { CreateProfileDto, EducationDto, ExperienceDto } from './dtos';
import ProfileService from './profile.service';
import { NextFunction, Request, Response } from 'express';
import { TokenData } from '@modules/auth';
export default class ProfileController {
    private userService = new ProfileService();

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const model: CreateProfileDto = req.body;
            const profile = await this.userService.createProfile(req.user.id, model);
            res.status(201).json(profile);
        } catch (error) {
            next(error);
        }
    };

    public addExperience = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const experience: ExperienceDto = req.body;
            const profile = await this.userService.addExperience(req.user.id, experience);
            res.status(201).json(profile);
        } catch (error) {
            next(error);
        }
    };

    public addEducation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const education: EducationDto = req.body;
            const profile = await this.userService.addEducation(req.user.id, education);
            res.status(201).json(profile);
        } catch (error) {
            next(error);
        }
    };
}
