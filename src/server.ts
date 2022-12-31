import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import { validateEnv } from '@core/utils';
import App from './app';
import UsersRoute from '@modules/users';
import AuthRoute from '@modules/auth';
import ProfileRoute from '@modules/profile';

validateEnv();

const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute(), new ProfileRoute()];
const app = new App(routes);

app.listen();
