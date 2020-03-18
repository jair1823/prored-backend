import Network from './network.routes';
import Academic_Unit from './academic_unit.routes';
import Investigation_Unit from './investigation_unit.routes';
import Center from './center.routes';
import AssoCareer from './associated_career.routes';
import Career from './career.routes';
import Language from './language.routes';
import Directions from './directions.routes'
import Campus from './campus.routes';
import Student from './student.routes';

/**
 * 
 * @param app variable que contiene la aplicacion de express
 * 
 * funcion que agrega todas las rutas a la app de express
 */
export function addRoutes(app: any) {
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