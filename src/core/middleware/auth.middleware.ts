import { HttpException } from '@core/exceptions';
import { isEmptyObject } from '@core/utils';
import { DataStoredInToken } from '@modules/auth';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_TOKEN_SECRET!) as DataStoredInToken;
        if (!req.user) req.user = { id: '' };

        req.user.id = user.id;
        next();
    } catch (_error) {
        const error = (_error as HttpException).message;

        if (error == 'jwt malformed') {
            res.status(401).json({ message: 'Token is not vaild' });
        } else {
            res.status(401).json({ message: 'Token is expired' });
        }
    }
};

export default authMiddleware;
