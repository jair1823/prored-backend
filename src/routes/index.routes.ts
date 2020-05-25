import Network from './network.routes';
import Investigation_Unit from './investigation_unit.routes';
import Center from './center.routes';
import AssoCareer from './associated_career.routes';
import Career from './career.routes';
import Language from './language.routes';
import Directions from './directions.routes'
import Campus from './campus.routes';
import Student from './student.routes';
import Consultas from './consultas.routes';
/**
 * 
 * @param app variable que contiene la aplicacion de express
 * 
 * funcion que agrega todas las rutas a la app de express
 */
export function addRoutes(app: any) {
    app.use('/network',Network);
    app.use('/center',Center);
    app.use(AssoCareer);
    app.use(Investigation_Unit);
    app.use('/career', Career);
    app.use('/campus', Campus);
    app.use('/language',Language);
    app.use(Directions);
    app.use(Student);
    app.use(Consultas);
}