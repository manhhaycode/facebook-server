import { CreateProfileDto, ExperienceDto } from './dtos';
import { IProfile, ISocial, IExperience } from './profile.interface';
import normalize from 'normalize-url';
import ProfileSchema from './profile.model';
import { HttpException } from '@core/exceptions';
class ProfileService {
    public async createProfile(userId: string, profileDto: CreateProfileDto): Promise<IProfile> {
        const { company, location, websites, bio, skills, status, youtube, twitter, instagram, linkedin, facebook } =
            profileDto;
        const profileFields: Partial<IProfile> = {
            user: userId,
            company,
            location,
            websites: Array.isArray(websites)
                ? websites.map((website: string) => normalize(website.toString(), { forceHttps: true }))
                : websites
                ? websites
                      .split(',')
                      .map((website: string) => normalize(website.toString(), { forceHttps: true }).trim())
                : [],
            skills: Array.isArray(skills)
                ? skills
                : skills
                ? skills.split(',').map((skill: string) => skill.trim())
                : [],
            bio,
            status,
        };

        const socialFields: ISocial = {
            youtube,
            twitter,
            facebook,
            instagram,
            linkedin,
        };

        for (const [key, value] of Object.entries(socialFields)) {
            if (value && value.length > 0) {
                socialFields[key] = normalize(value, { forceHttps: true });
            }
        }

        profileFields.social = socialFields;

        const profile = await ProfileSchema.findOneAndUpdate(
            { user: userId },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true },
        ).exec();

        return profile;
    }

    public async addExperience(userId: string, experience: ExperienceDto): Promise<IProfile> {
        const newExp = {
            ...experience,
        };

        const profile = await ProfileSchema.findOne({ user: userId }).exec();
        if (!profile) {
            throw new HttpException(400, 'There is not profile for this user');
        }
        profile.experience.unshift(newExp as IExperience);
        await profile.save();
        return profile;
    }
}

export default ProfileService;
