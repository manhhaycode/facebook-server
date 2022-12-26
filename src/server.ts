import 'dotenv/config';
import { IndexRoute } from '@modules/index';
import { validateEnv } from '@core/utils';
import App from './app';

validateEnv();

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
