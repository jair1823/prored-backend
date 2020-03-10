import Network from './network.routes';

export const addRoutes = (app: any) => {
    app.use(Network);
}