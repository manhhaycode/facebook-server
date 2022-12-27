import { DataStoredInToken } from '@modules/auth';
import { HttpException } from '@core/exceptions';
import { isEmptyObject } from '@core/utils';
import { TokenData } from '@modules/auth';
import UserSchema from './users.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUser from './users.interface';
import { UpdateDto, RegisterDto } from './dtos';
import mongoose from 'mongoose';
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

    public async updateUser(userId: String, model: UpdateDto): Promise<IUser> {
        if (isEmptyObject(model)) {
            throw new HttpException(400, 'Model is empty');
        }

        const user = await this.UserSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(400, 'User is not exits.');
        }

        let errorsBadRequest = [];

        let hashedPassword: string = '';

        if (model.email) {
            const isEmailChange = model.email !== user.email;
            if (!isEmailChange) {
                errorsBadRequest.push('This is the old email');
            }
        }

        if (model.password) {
            const isMatchPassword = await bcryptjs.compare(model.password, user.password);
            if (isMatchPassword) {
                errorsBadRequest.push('This is the old password');
            } else {
                const salt = await bcryptjs.genSalt(10);
                hashedPassword = await bcryptjs.hash(model.password!, salt);
            }
        }

        if (errorsBadRequest.length) throw new HttpException(400, errorsBadRequest.join(', '));

        await this.UserSchema.findByIdAndUpdate(userId, {
            ...model,
            password: hashedPassword ? hashedPassword : user.password,
            updateAt: Date.now(),
        }).exec();

        const updateUser = await this.UserSchema.findById(userId).exec();
        if (!updateUser) {
            throw new HttpException(409, 'You are not an user');
        }

        return updateUser;
    }

    public async getUserById(userId: string): Promise<IUser> {
        if (!mongoose.isValidObjectId(userId)) {
            throw new HttpException(400, 'Id is not valid.');
        }
        const user = await this.UserSchema.findById(userId).exec();
        if (!user) {
            throw new HttpException(400, 'Id is not exits.');
        }
        user.password = '';

        return user;
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
