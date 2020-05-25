--create database prored;

create table public.person(
    dni varchar(50) PRIMARY KEY,
    name varchar(50),
    lastname1 varchar(50),
    lastname2 varchar(50),
    born_dates date,
    status boolean,
    phone_number varchar(40),
    email varchar(60)
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

create table public.investigation_unit(
    id_inv_unit SERIAL PRIMARY KEY,
    name varchar(50),
    description text
);

create table public.researcher(
    dni varchar(50) PRIMARY KEY REFERENCES public.person(dni),
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit)
);

create table public.project(
    id_project SERIAL PRIMARY KEY,
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit),
    name varchar(50),
    code_manage varchar(50),
    project_type boolean
);

create table public.acti_type(
    id_acti_type SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.activity(
    id_activity SERIAL PRIMARY KEY,
    name varchar(50),
    id_acti_type integer REFERENCES public.acti_type(id_acti_type),
    id_project integer REFERENCES public.project(id_project)
);

create table person_x_activity(
    rel_code SERIAL PRIMARY KEY,
    dni varchar(50) REFERENCES public.person(dni),
    id_activity integer REFERENCES public.activity(id_activity)
);

CREATE TYPE public.role AS ENUM ('Estudiante Vinculado', 'Asistente Vinculado', 'Investigador Vinculado', 'Consultor Vinculado');


CREATE TYPE public.endoresement_type AS ENUM (
    'Interno',
    'Externo'
);

create table public.document(
    id_document SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    id_activity integer REFERENCES public.activity(id_activity),
    name varchar(50),
    file_path varchar(150)
);

create table public.endoresement(
    id_document integer REFERENCES public.document(id_document),
    type public.endoresement_type
);

create table public.project_form(
    id_document integer REFERENCES public.document(id_document)
);

create table public.list_of_assitance(
    id_document integer REFERENCES public.document(id_document),
    date date
);

create table public.presentation(
    id_document integer REFERENCES public.document(id_document),
    presentation_name varchar(100)
);

create table public.photo(
    id_document integer REFERENCES public.document(id_document),
    date date,
    comment text
);

create table public.article(
    id_document integer REFERENCES public.document(id_document),
    key_words varchar(100),
    abstract text
);

create table public.paper(
    id_document integer REFERENCES public.document(id_document),
    paper_name varchar(100),
    speaker varchar(50)
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
    degree public.degree,
    status boolean
);

create table public.campus(
    campus_code varchar(30) PRIMARY KEY,
    name varchar(50),
    status boolean
);

CREATE TYPE public.network_type AS ENUM (
    'Municipalidad',
    'ONG',
    'Asociaciones',
    'Grupo Artístico'
);

create table public.network(
    id_network SERIAL PRIMARY KEY,
    name varchar(50),
    network_type public.network_type,
    status boolean
    
);

create table public.center(
    id_center SERIAL PRIMARY KEY,
    name varchar(50),
    status boolean
);

create table public.associated_career(
    id_associated_career SERIAL PRIMARY KEY,
    id_center integer REFERENCES public.center(id_center),
    name varchar(50),
    status boolean
);

create table public.language(
    id_language SERIAL PRIMARY KEY,
    name varchar(100)
);

CREATE TYPE public.profile AS ENUM (
    'Básico',
    'Intermedio',
    'Avanzado', 
    'Invitado'
);

CREATE TYPE public.marital_status AS ENUM (
    'No especifica',
    'Soltero',
    'Casado',
    'Divorciado', 
    'Viudo'
);

create table public.student(
    dni varchar(50) PRIMARY KEY REFERENCES public.person(dni),
    id_district integer REFERENCES public.district(id_district),
    marital_status marital_status,
    campus_code varchar(30) REFERENCES public.campus(campus_code),
    profile public.profile,
    address text,
    nationality nationality,
    emergency_contact varchar(40)
);

create table public.cv(
    dni varchar(50) PRIMARY KEY REFERENCES public.student(dni),
    file_path varchar(400),
    name varchar(300)
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

create table public.person_x_project(
    rel_code SERIAL PRIMARY KEY,
    dni varchar(50) REFERENCES public.person(dni),
    id_project integer REFERENCES public.project(id_project),
    role public.role
);

create table public.period(
    id_period SERIAL PRIMARY KEY,
    name varchar(50)
);

create table public.gantt(
    id_gantt SERIAL PRIMARY KEY,
    rel_code integer REFERENCES public.person_x_project(rel_code),
    id_period integer REFERENCES public.period(id_period)
);

create table public.gantt_task(
    id_task SERIAL PRIMARY KEY,
    id_gantt integer REFERENCES public.gantt(id_gantt),
    task_name varchar(50),
    description varchar(200),
    start_date date,
    end_date date
);