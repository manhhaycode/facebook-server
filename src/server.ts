import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import { validateEnv } from '@core/utils';
import App from './app';
import UsersRoute from '@modules/users';
import AuthRoute from '@modules/auth';

validateEnv();

const routes = [new IndexRoute(), new UsersRoute(), new AuthRoute()];
const app = new App(routes);

app.listen();
