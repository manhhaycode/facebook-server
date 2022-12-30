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
import { IPagination } from '@core/interfaces';
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

    public async deleteUser(userId: String) {
        let status = await this.UserSchema.findByIdAndDelete(userId).exec();
        if (status) {
            return { message: 'Delete successfully' };
        } else {
            throw new HttpException(400, 'User is not exits.');
        }
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

        const updateUser = await this.UserSchema.findByIdAndUpdate(
            userId,
            {
                ...model,
                password: hashedPassword ? hashedPassword : user.password,
                updateAt: Date.now(),
            },
            { new: true, select: '-password' },
        ).exec();

        if (!updateUser) {
            throw new HttpException(409, 'You are not an user');
        }

        return updateUser;
    }

    public async getAllPaging(keyword: string, page: number): Promise<IPagination<IUser>> {
        const pageSize: number = Number(process.env.PAGE_SIZE) | 10;

        let query = {};

        if (keyword) {
            query = {
                $or: [{ email: keyword }, { first_name: keyword }, { last_name: keyword }],
            };
        }

        const users: IUser[] = await this.UserSchema.find(query, '-password')
            .sort({ updateAt: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .exec();

        const rowCount = await this.UserSchema.find(query).countDocuments().exec();

        return {
            total: rowCount,
            page: page,
            pageSize: pageSize,
            items: users,
        };
    }

    public async getUserById(userId: string): Promise<IUser> {
        if (!mongoose.isValidObjectId(userId)) {
            throw new HttpException(400, 'Id is not valid.');
        }
        const user = await this.UserSchema.findById(userId, '-password').exec();
        if (!user) {
            throw new HttpException(400, 'Id is not exits.');
        }

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
