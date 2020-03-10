import Network from './network.routes';
import Academic_Unit from './academic_unit.routes';
import Investigation_Unit from './investigation_unit.routes';
import Center from './center.routes';
import AssoCareer from './associated_career.routes';
import Career from './career.routes';
import Language from './language.routes'
export const addRoutes = (app: any) => {
    app.use(Network);
    app.use(Center);
    app.use(AssoCareer);
    app.use(Academic_Unit);
    app.use(Investigation_Unit);
    app.use(Career);
    app.use(Language);
}