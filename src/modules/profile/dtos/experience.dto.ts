import { IsDate, IsString } from 'class-validator';

export default class ExperienceDto {
    @IsString()
    public title: string;
    @IsString()
    public company: string;
    @IsString()
    public location: string;
    @IsDate()
    public from: Date;
    @IsDate()
    public to: Date;
    @IsString()
    public current: boolean;
    @IsString()
    public description: string;

    constructor(
        title: string,
        company: string,
        location: string,
        from: Date,
        to: Date,
        current: boolean,
        description: string,
    ) {
        this.title = title;
        this.company = company;
        this.current = current;
        this.location = location;
        this.from = from;
        this.to = to;
        this.current = current;
        this.description = description;
    }
}
