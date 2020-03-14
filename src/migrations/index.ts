import { pool } from '../database/connection';

const dropSQL =
        `
        DROP TABLE IF EXISTS public.person_x_network;
        DROP TABLE IF EXISTS public.person_x_language;
        DROP TABLE IF EXISTS public.person_x_career;
        DROP TABLE IF EXISTS public.person_x_associated_career;
        DROP TABLE IF EXISTS public.student;
        DROP TABLE IF EXISTS public.language;
        DROP TABLE IF EXISTS public.associated_career;
        DROP TABLE IF EXISTS public.center;
        DROP TABLE IF EXISTS public.network;
        DROP TABLE IF EXISTS public.campus;
        DROP TABLE IF EXISTS public.career;
        DROP TABLE IF EXISTS public.article;
        DROP TABLE IF EXISTS public.photo;
        DROP TABLE IF EXISTS public.presentation;
        DROP TABLE IF EXISTS public.list_of_assitance;
        DROP TABLE IF EXISTS public.project_form;
        DROP TABLE IF EXISTS public.endoresement;
        DROP TABLE IF EXISTS public.document;
        DROP TABLE IF EXISTS public.workshop;
        DROP TABLE IF EXISTS public.person_x_project;
        DROP TABLE IF EXISTS public.professor;
        DROP TABLE IF EXISTS public.project;
        DROP TABLE IF EXISTS public.investigation_unit;
        DROP TABLE IF EXISTS public.academic_unit;
        DROP TABLE IF EXISTS public.district;
        DROP TABLE IF EXISTS public.canton;
        DROP TABLE IF EXISTS public.province;
        DROP TABLE IF EXISTS public.person;
        DROP TYPE IF EXISTS public.role;
        DROP TYPE IF EXISTS public.degree;
        DROP TYPE IF EXISTS public.network_type;
        DROP TYPE IF EXISTS public.profile;
        DROP TYPE IF EXISTS public.nationality;
        DROP TYPE IF EXISTS public.marital_status;
        `;

const tables = `
create table public.person(
    dni varchar(50) PRIMARY KEY,
    name varchar(50),
    lastname1 varchar(50),
    lastname2 varchar(50),
    born_dates date,
    status boolean
);

create table public.province(
    id_province SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.canton(
    id_canton SERIAL PRIMARY KEY,
    id_province integer REFERENCES public.province(id_province),
    name varchar(50)
);

create table public.district(
    id_district SERIAL PRIMARY KEY,
    id_canton integer REFERENCES public.canton(id_canton),
    name varchar(50)
);

create table public.academic_unit(
    id_academic_unit SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.investigation_unit(
    id_inv_unit SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.professor(
    dni varchar(50) REFERENCES public.person(dni),
    id_academic_unit integer REFERENCES public.academic_unit(id_academic_unit),
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit)
);

create table public.project(
    id_project SERIAL PRIMARY KEY,
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit),
    name varchar(50),
    code_manage varchar(50)
);

CREATE TYPE public.role AS ENUM ('Estudiante Vinculado', 'Asistente Vinculado', 'Investigador Vinculado', 'Consultor Vinculado');

create table public.person_x_project(
    dni varchar(50) REFERENCES public.person(dni),
    id_project integer REFERENCES public.project(id_project),
    role public.role,
    PRIMARY KEY(dni, id_project)
);

create table public.workshop(
    id_workshop SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    name varchar(50)
);

create table public.document(
    id_document SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    id_workshop integer REFERENCES public.workshop(id_workshop),
    name varchar(50),
    file_path varchar(150),
    file_extension varchar(30)
);

create table public.endoresement(
    id_document integer REFERENCES public.document(id_document),
    type varchar(50)
);

create table public.project_form(
    id_document integer REFERENCES public.document(id_document),
    version varchar(20)
);

create table public.list_of_assitance(
    id_document integer REFERENCES public.document(id_document),
    date date
);

create table public.presentation(
    id_document integer REFERENCES public.document(id_document)
);

create table public.photo(
    id_document integer REFERENCES public.document(id_document),
    date date,
    comment text
);

create table public.article(
    id_document integer REFERENCES public.document(id_document),
    key_words varchar(50),
    abstract varchar(50)
);

CREATE TYPE public.degree AS ENUM (
    'Diplomado',
    'Bachillerato',
    'Licenciatura',
    'Maestría',
    'Doctorado'
);

create table public.career(
    career_code integer PRIMARY KEY,
    name varchar(100),
    degree public.degree
);

create table public.campus(
    campus_code varchar(30) PRIMARY KEY,
    name varchar(50)
);

CREATE TYPE public.network_type AS ENUM (
    'Municipalidad',
    'ONG',
    'Asociaciones',
    'Grupo Artisitico'
);

create table public.network(
    id_network SERIAL PRIMARY KEY,
    name varchar(50),
    network_type public.network_type
    
);

create table public.center(
    id_center SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.associated_career(
    id_associated_career SERIAL PRIMARY KEY,
    id_center integer REFERENCES public.center(id_center),
    name varchar(50)
);

create table public.language(
    id_language SERIAL PRIMARY KEY,
    name varchar(50)
);

CREATE TYPE public.profile AS ENUM (
    'Básico',
    'Intermedio',
    'Avanzado', 
    'Invitado'
);

CREATE TYPE public.nationality AS ENUM (
    'N1',
    'N2',
    'N3', 
    'N4'
);

CREATE TYPE public.marital_status AS ENUM (
    'Soltero',
    'Casado',
    'Divorciado', 
    'viudo'
);

create table public.student(
    dni varchar(50) PRIMARY KEY REFERENCES public.person(dni),
    id_district integer REFERENCES public.district(id_district),
    marital_status marital_status,
    campus_code varchar(30) REFERENCES public.campus(campus_code),
    profile public.profile,
    address text,
    nationality nationality
);

create table public.person_x_career(
    dni varchar(50) REFERENCES public.student(dni),
    career_code integer REFERENCES public.career(career_code),
    PRIMARY KEY(dni, career_code)
);
create table public.person_x_language(
    dni varchar(50) REFERENCES public.student(dni),
    id_language integer REFERENCES public.language(id_language),
    PRIMARY KEY(dni, id_language)
);
create table public.person_x_associated_career(
    dni varchar(50) REFERENCES public.student(dni),
    id_associated_career integer REFERENCES public.associated_career(id_associated_career),
    PRIMARY KEY(dni, id_associated_career)
);

create table public.person_x_network(
    dni varchar(50) REFERENCES public.student(dni),
    id_network integer REFERENCES public.network(id_network),
    PRIMARY KEY(dni, id_network)
);
`

const drops = async () => {
    try {
        await pool.query(dropSQL);
        await pool.query(tables);
        return;
    } catch (error) {
        console.log(error);
    }
}


drops();