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
import Researcher from './researcher.routes';
import Project from './project.routes'
import Activity from './activity.routes'
import Document from './document.routes'
import DocumentMultiple from './document_multiple.routes'
import Gantt from './gantt.routes'
import Filter from './filter.routes'
import Budget from './budget_unit.routes'
import Financial from './financialitem.routes'
import User from './user.routes'
import TokenValidator from '../lib/tokenValidator';
/**
 * 
 * @param app variable que contiene la aplicacion de express
 * 
 * funcion que agrega todas las rutas a la app de express
 */
export function addRoutes(app: any) {
    app.use(User);
    app.use(DocumentMultiple);
    app.use(Document);
    app.use(Consultas);
    // app.use('/network',TokenValidator,Network);
    // app.use('/center',TokenValidator,Center);
    // app.use(TokenValidator,AssoCareer);
    // app.use(TokenValidator,Investigation_Unit);
    // app.use('/career',TokenValidator, Career);
    // app.use('/campus',TokenValidator, Campus);
    // app.use('/language',TokenValidator,Language);
    // app.use(TokenValidator,Directions);
    // app.use(TokenValidator,Student);
    // app.use(TokenValidator,Researcher);

    // app.use(TokenValidator,Project);
    // app.use(TokenValidator,Gantt);
    // app.use('/activity',TokenValidator,Activity);
    // app.use(TokenValidator,Budget);
    // app.use(TokenValidator,Financial);
    // app.use('/filter',TokenValidator,Filter);
}