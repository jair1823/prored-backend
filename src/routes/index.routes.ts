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
    app.use('/network',Network);
    app.use('/center',Center);
    app.use(AssoCareer);
    app.use(Investigation_Unit);
    app.use('/career', Career);
    app.use('/campus', Campus);
    app.use('/language',Language);
    app.use(Directions);
    app.use(Student);
    app.use(Researcher);
    app.use(Consultas);
    app.use(Project);
    app.use(Gantt);
    app.use('/activity',TokenValidator,Activity);
    app.use(Document);
    app.use(Budget);
    app.use(Financial);
    app.use(DocumentMultiple);
    app.use('/filter',Filter);
    app.use(User);
}