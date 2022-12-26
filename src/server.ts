import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import { validateEnv } from '@core/utils';
import App from './app';
import UsersRoute from '@modules/users';

validateEnv();

const routes = [new IndexRoute(), new UsersRoute()];
const app = new App(routes);

app.listen();
