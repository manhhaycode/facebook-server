import { Router } from 'express';

interface IUser {
    _id: string;
    frist_name: string;
    last_name: string;
    email: string;
    password: string;
    avatar: string;
    token: string;
    createAt: Date;
    updateAt: Date;
}

export default IUser;
