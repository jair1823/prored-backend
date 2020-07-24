--create database prored;

CREATE TYPE public.person_type AS ENUM (
    'Estudiante',
    'Investigador'
);

create table public.person(
    dni varchar(50) PRIMARY KEY,
    name varchar(50),
    lastname1 varchar(50),
    lastname2 varchar(50),
    born_dates date,
    status boolean,
    phone_number varchar(40),
    email varchar(60),
    person_type person_type
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
    name varchar(110),
    description text,
    status boolean
);

create table public.researcher(
    dni varchar(50) PRIMARY KEY REFERENCES public.person(dni),
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit)
);

CREATE TYPE public.project_type AS ENUM (
    'Estudiantes',
    'Investigadores'
);

create table public.project(
    id_project SERIAL PRIMARY KEY,
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit),
    name varchar(110),
    code_manage varchar(50),
    project_type public.project_type
);

create table public.acti_type(
    id_acti_type SERIAL PRIMARY KEY,
    name varchar(50),
    status boolean
);

create table public.activity(
    id_activity SERIAL PRIMARY KEY,
    name varchar(100),
    id_acti_type integer REFERENCES public.acti_type(id_acti_type),
    id_project integer REFERENCES public.project(id_project)
);

create table person_x_activity(
    rel_code SERIAL PRIMARY KEY,
    dni varchar(50) REFERENCES public.person(dni),
    id_activity integer REFERENCES public.activity(id_activity)
);

CREATE TYPE public.role AS ENUM ('Investigador', 'Asistente Vinculado', 'Co Investigador');


CREATE TYPE public.endorsement_type AS ENUM (
    'Interno',
    'Externo'
);

CREATE TYPE public.paper_type AS ENUM (
    'Ponente',
    'Visita'
);

--Documentos

create table public.endorsement(
    id_endorsement SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    type public.endorsement_type,
    filename varchar(100),
    file_path varchar(200)
);

create table public.project_form(
    id_project_form SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    date_created date,
    filename varchar(100),
    file_path varchar(200)
);

create table public.article(
    id_article SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    title varchar(100),
    key_words varchar(200),
    abstract text,
    authors varchar (200),
    magazine varchar (50),
    url varchar (200),
    filename varchar(100),
    file_path varchar (200)
);

create table public.paper(
    id_paper SERIAL PRIMARY KEY,
    id_project integer REFERENCES public.project(id_project),
    paper_name varchar(100),
    speaker varchar(100),
    place varchar(100),
    type public.paper_type,
    country public.nationality,
    date_assisted date,
    filename varchar (100),
    file_path varchar (200)
);

create table public.photo(
    id_photo SERIAL PRIMARY KEY,
    id_activity integer REFERENCES public.activity(id_activity),
    date_taken date,
    comment text,
    filename varchar (100),
    file_path varchar (200)
);

create table public.list_of_assitance(
    id_list SERIAL PRIMARY KEY,
    id_activity integer REFERENCES public.activity(id_activity),
    date_passed date,
    filename varchar (100),
    file_path varchar (200)
);

CREATE TYPE public.degree AS ENUM (
    'Diplomado',
    'Bachillerato',
    'Licenciatura',
    'Maestría',
    'Doctorado'
);

create table public.career(
    career_code SERIAL PRIMARY KEY,
    name varchar(110),
    degree public.degree,
    status boolean
);

create table public.campus(
    campus_code varchar(30) PRIMARY KEY,
    name varchar(100),
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
    name varchar(100),
    network_type public.network_type,
    status boolean
    
);

create table public.center(
    id_center SERIAL PRIMARY KEY,
    name varchar(100),
    status boolean
);

create table public.associated_career(
    id_associated_career SERIAL PRIMARY KEY,
    id_center integer REFERENCES public.center(id_center),
    name varchar(110),
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
    task_name varchar(100),
    description varchar(200),
    start_date date,
    end_date date
);

create table public.budget_unit(
    code_budget_unit integer PRIMARY KEY UNIQUE,
    name varchar(100),
    status boolean
);

create table public.budget_sub_unit(
    code_budget_subunit SERIAL PRIMARY KEY,
    name varchar(100),
    status boolean
);

CREATE TYPE public.financial_item_type AS ENUM (
    'Independiente',
    'Proyecto',
    'Actividad'
);

create table public.financial_item(
    id_financial_item SERIAL PRIMARY KEY,
    date_created date,
    amount real,
    type public.financial_item_type,
    id_project integer REFERENCES public.project(id_project),
    id_activity integer REFERENCES public.activity(id_activity),
    dni varchar(50) REFERENCES public.student(dni),
    code_unit integer REFERENCES public.budget_unit(code_budget_unit),
    code_subunit integer REFERENCES public.budget_sub_unit(code_budget_subunit)
);

create table public.financial_document(
    id_financial_document SERIAL PRIMARY KEY,
    id_financial_item integer REFERENCES public.financial_item(id_financial_item),
    filename varchar(100),
    file_path varchar(200)
);

create table public.user(
    id_user SERIAL PRIMARY KEY,
    name varchar(50),
    lastname1 varchar(50),
    lastname2 varchar(50),
    email varchar(100) UNIQUE,
    password varchar(300),
    status boolean
);

create table public.log(
    id_log SERIAL PRIMARY KEY,
    id_user integer REFERENCES public.user(id_user),
    date_made date,
    table_name varchar(100),
    action varchar(100)
);