import { model } from 'mongoose';
import { DataStoredInToken } from '@modules/auth';
import { HttpException } from '@core/exceptions';
import { isEmptyObject } from '@core/utils';
import { TokenData } from '@modules/auth';
import RegisterDto from './dtos/register.dto';
import UserSchema from './users.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUser from './users.interface';
class UserService {
    public UserSchema = UserSchema;

    public async createUser(model: RegisterDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.UserSchema.findOne({ email: model.email });
        if (user) {
            throw new HttpException(409, `Your email ${model.email} already exits.`);
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(model.password!, salt);
        const createdUser: IUser = await this.UserSchema.create({
            ...model,
            password: hashedPassword,
            createAt: Date.now(),
            updateAt: Date.now(),
        });

        return this.createToken(createdUser);
    }

    private createToken(user: IUser): TokenData {
        const dataInToken: DataStoredInToken = { id: user._id };
        const secret: string = process.env.JWT_TOKEN_SECRET || '';
        const expiresIn: number = 60;
        return {
            token: jwt.sign(dataInToken, secret, { expiresIn: expiresIn }),
        };
    }
}

export default UserService;
