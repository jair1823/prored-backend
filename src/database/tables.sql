create database prored;

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

create table public.distric(
    id_distric SERIAL PRIMARY KEY,
    id_canton integer REFERENCES public.canton(id_canton),
    name varchar(50)
);

create table public.marital_status(
    id_marital_status SERIAL PRIMARY KEY,
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
    id_inv_unit integer REFERENCES public.investigation_unit(id_inv_unit)
    name varchar(50),
    code_manage varchar(50)
);

CREATE TYPE public.role AS ENUM ('Estudiante Vinculado', 'Asistente Vinculado', 'Investigador Vinculado', 'Consultor Vinculado');

create table public.person_x_project(
    dni varchar(50) REFERENCES public.person(dni),
    id_project integer REFERENCES public.project(id_project),
    role public.role
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
);

create table public.list_of_assitance(
    id_document integer REFERENCES public.document(id_document),
);

create table public.presentation(
    id_document integer REFERENCES public.document(id_document),
);

create table public.article(
    id_document integer REFERENCES public.document(id_document),
    key_words varchar(50),
    abstract varchar(50)
);