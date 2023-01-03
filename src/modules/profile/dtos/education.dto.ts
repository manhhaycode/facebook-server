import { IsDate, IsString, IsBoolean } from 'class-validator';

export default class EducationDto {
    @IsString()
    public school: string;
    @IsString()
    public degree: string;
    @IsString()
    public fieldofstudy: string;
    @IsDate()
    public from: Date;
    @IsDate()
    public to: Date;
    @IsBoolean()
    public current: boolean;
    @IsString()
    public description: string;

    constructor(
        school: string,
        degree: string,
        fieldofstudy: string,
        from: Date,
        to: Date,
        current: boolean,
        description: string,
    ) {
        this.school = school;
        this.degree = degree;
        this.current = current;
        this.fieldofstudy = fieldofstudy;
        this.from = from;
        this.to = to;
        this.current = current;
        this.description = description;
    }
}
