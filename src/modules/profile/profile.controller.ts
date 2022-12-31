import { IProfile } from './profile.interface';
import CreateProfileDto from './dtos/CreateProfile.dto';
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
}
