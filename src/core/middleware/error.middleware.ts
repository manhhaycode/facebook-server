import { Logger } from '@core/utils';
import { HttpException } from '@core/exceptions';
import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status: number = error.status || 500;
    const message: string = error.message || 'Some thing when wrong';
    const date: Date = new Date();
    const hours: string = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    Logger.error(`[ERROR] - Status: ${status} - Msg: ${message} - Time: ${hours}`);
    res.status(status).json({ message: message });
};

export default errorMiddleware;
