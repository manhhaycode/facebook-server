import { DataStoredInToken } from '@modules/auth';
import { HttpException } from '@core/exceptions';
import { isEmptyObject, Logger } from '@core/utils';
import { TokenData } from '@modules/auth';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import LoginDto from './auth.dto';
import UserSchema from '@modules/users/users.model';
import IUser from '@modules/users/users.interface';
class AuthService {
    public UserSchema = UserSchema;

    public async login(model: LoginDto): Promise<TokenData> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.UserSchema.findOne({ email: model.email });
        if (!user) {
            throw new HttpException(409, `Your email ${model.email} is not exits.`);
        }

        const isMatchPassword = await bcryptjs.compare(model.password, user.password);
        Logger.info(`isMatchPassword: ${isMatchPassword}`);
        if (!isMatchPassword) {
            throw new HttpException(400, 'Credential is not valid.');
        }

        return this.createToken(user);
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

export default AuthService;
