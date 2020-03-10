import Network from './network.routes';
import Center from './center.routes'
import AssoCareer from './associated_career.routes'
export const addRoutes = (app: any) => {
    app.use(Network);
    app.use(Center);
    app.use(AssoCareer);
}