import { Route } from '@core/interfaces';
import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from '@core/utils';
import { errorMiddleware } from '@core/middleware';
export default class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        // Thứ tự này rất quan trọng lưu ý initializeRoutes phải để cuối cùng

        this.connectToDataBase();
        this.initializeMiddleware();
        this.initializeRoutes(routes);
        this.initializeErrorMiddleware();
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log('====================================');
            console.log(`Sever is listening on port ${this.port}`);
            console.log('====================================');
        });
    }
    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            this.app.use('/', route.router);
        });
    }

    private initializeMiddleware() {
        if (this.production) {
            this.app.use(hpp());
            this.app.use(helmet());
            this.app.use(morgan('combined'));
            this.app.use(cors({ origin: 'your.domain.com', optionsSuccessStatus: 200 }));
        } else {
            this.app.use(morgan('dev'));
            this.app.use(cors({ origin: true, optionsSuccessStatus: 200 }));
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeErrorMiddleware() {
        this.app.use(errorMiddleware);
    }

    private async connectToDataBase() {
        mongoose.set('strictQuery', true);
        const connectString = process.env.MONGODB_URI;
        if (!connectString) {
            Logger.info('Connect string is invalid');
            return;
        }
        try {
            await mongoose.connect(connectString);
            Logger.info('connect database successfully');
        } catch (error) {
            Logger.info('error');
        }
    }
}
