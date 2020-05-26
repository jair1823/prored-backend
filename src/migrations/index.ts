import { pool } from '../database/connection';
import { readFileSync } from 'fs';

const AssociatedCareerDrops = readFileSync('src/database/Drops/AssociatedCareerDrops.sql').toString();
const CampusDrops = readFileSync('src/database/Drops/CampusDrops.sql').toString();
const CareerDrops = readFileSync('src/database/Drops/CareerDrops.sql').toString();
const CenterDrops = readFileSync('src/database/Drops/CenterDrops.sql').toString();
const DirectionDrops = readFileSync('src/database/Drops/DirectionDrops.sql').toString();
const InvestigationUnitDrops = readFileSync('src/database/Drops/InvestigationUnitDrops.sql').toString();
const LanguageDrops = readFileSync('src/database/Drops/LanguageDrops.sql').toString();
const NetworkDrops = readFileSync('src/database/Drops/NetworkDrops.sql').toString();
const PersonDrops = readFileSync('src/database/Drops/PersonDrops.sql').toString();
const StudentDrops = readFileSync('src/database/Drops/StudentDrops.sql').toString();
const TableDrops = readFileSync('src/database/Drops/TableDrops.sql').toString();
const ResearcherDrops = readFileSync('src/database/Drops/ResearcherDrops.sql').toString();

const EnumNationality = readFileSync('src/database/Creation/EnumNationality.sql').toString();
const Tables = readFileSync('src/database/Creation/Tables.sql').toString();

const AssociatedCareer = readFileSync('src/database/Functions/AssociatedCareer.sql').toString();
const Campus = readFileSync('src/database/Functions/Campus.sql').toString();
const Career = readFileSync('src/database/Functions/Career.sql').toString();
const Center = readFileSync('src/database/Functions/Center.sql').toString();
const Direction = readFileSync('src/database/Functions/Direction.sql').toString();
const InvestigationUnit = readFileSync('src/database/Functions/InvestigationUnit.sql').toString();
const Language = readFileSync('src/database/Functions/Language.sql').toString();
const Network = readFileSync('src/database/Functions/Network.sql').toString();
const Person = readFileSync('src/database/Functions/Person.sql').toString();
const Student = readFileSync('src/database/Functions/Student.sql').toString();
const Researcher =  readFileSync('src/database/Functions/Researcher.sql').toString();





/**
 * Secuencia en la que se ejecutan los drops de toda la base 
 *  y luego la creacion de cada tabla enum y sp
 */
async function migration() {
    try {
        //Drops de toda la Base de Datos
        await pool.query(StudentDrops);
        await pool.query(AssociatedCareerDrops);
        await pool.query(CampusDrops);
        await pool.query(CareerDrops);
        await pool.query(CenterDrops);
        await pool.query(DirectionDrops);
        await pool.query(InvestigationUnitDrops);
        await pool.query(LanguageDrops);
        await pool.query(NetworkDrops);
        await pool.query(PersonDrops);
        await pool.query(TableDrops);
        await pool.query(ResearcherDrops);


        //Creacion de todas las tablas y tipos
        await pool.query(EnumNationality);
        await pool.query(Tables);

        //Creación de todos los SPS
        await pool.query(AssociatedCareer);
        await pool.query(Campus);
        await pool.query(Career);
        await pool.query(Center);
        await pool.query(Direction);
        await pool.query(InvestigationUnit);
        await pool.query(Language);
        await pool.query(Network);
        await pool.query(Student);
        await pool.query(Person);
        await pool.query(Researcher);

        return;
    } catch (error) {
        console.log(error);
    }
}


migration();