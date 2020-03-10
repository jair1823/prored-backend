import Network from './network.routes';
import Center from './center.routes'
export const addRoutes = (app: any) => {
    app.use(Network);
    app.use(Center);
}