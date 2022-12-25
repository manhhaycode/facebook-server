import { IndexRoute } from './modules/index';
import App from './app';

const routes = [new IndexRoute()];
const app = new App(routes);

app.listen();
