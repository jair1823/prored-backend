import Network from './network.routes';
import Academic_Unit from './academic_unit.routes';
import Investigation_Unit from './investigation_unit.routes';
import Center from './center.routes';
import AssoCareer from './associated_career.routes';
import Career from './career.routes';
import Language from './language.routes';
import Directions from './directions.routes'
import Campus from './campus.routes';
import Student from './student.routes'
export const addRoutes = (app: any) => {
    app.use(Network);
    app.use(Center);
    app.use(AssoCareer);
    app.use(Academic_Unit);
    app.use(Investigation_Unit);
    app.use(Career);
    app.use(Campus);
    app.use(Language);
    app.use(Directions);
    app.use(Student);
}