import { IsObject, IsString } from 'class-validator';

export default class CreateProfileDto {
    @IsString()
    public company: string;
    @IsString()
    public location: string;
    public websites: string;
    @IsString()
    public bio: string;
    public skills: string;
    @IsString()
    public status: string;
    @IsString()
    public youtube: string;
    @IsString()
    public twitter: string;
    @IsString()
    public instagram: string;
    @IsString()
    public linkedin: string;
    @IsString()
    public facebook: string;

    constructor(
        company: string,
        location: string,
        websites: string,
        bio: string,
        skills: string,
        status: string,
        youtube: string,
        twitter: string,
        instagram: string,
        linkedin: string,
        facebook: string,
    ) {
        this.company = company;
        this.location = location;
        this.websites = websites;
        this.bio = bio;
        this.skills = skills;
        this.status = status;
        this.youtube = youtube;
        this.twitter = twitter;
        this.instagram = instagram;
        this.linkedin = linkedin;
        this.facebook = facebook;
    }
}
