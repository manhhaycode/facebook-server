import { Route } from '@core/interfaces';
import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
export default class App {
    public app: express.Application;
    public port: string | number;
    public production: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 5000;
        this.production = process.env.NODE_ENV == 'production' ? true : false;

        this.initializeRoutes(routes);
        this.initializeMiddleware();
        this.connectToDataBase();
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
    }

    private async connectToDataBase() {
        mongoose.set('strictQuery', true);
        const connectString = process.env.MONGODB_URI;
        if (!connectString) {
            console.log('Connect string is invalid');
            return;
        }
        try {
            await mongoose.connect(connectString);
            console.log('connect successfully');
        } catch (error) {
            console.log('error');
        }
    }
}