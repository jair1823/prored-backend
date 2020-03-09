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

create table public.lenguage(
    id_lenguage SERIAL PRIMARY KEY,
    name varchar(50)
);

CREATE TYPE public.profile AS ENUM (
    'Básico',
    'Intermedio',
    'Avanzado', 
    'Invitado'
);

create table public.student(
    dni varchar(50) PRIMARY KEY REFERENCES public.person(dni),
    id_distric integer REFERENCES public.distric(id_distric),
    id_marital_status integer REFERENCES public.marital_status(id_marital_status),
    campus_code varchar(30) REFERENCES public.campus(campus_code),
    profile public.profile,
    address text
);

create table public.person_x_career(
    dni varchar(50) PRIMARY KEY REFERENCES public.student(dni),
    career_code integer PRIMARY KEY REFERENCES public.career(career_code)
);
create table public.person_x_lenguage(
    dni varchar(50) PRIMARY KEY REFERENCES public.student(dni),
    id_lenguage integer PRIMARY KEY REFERENCES public.lenguage(id_lenguage)
);
create table public.person_x_associated_career(
    dni varchar(50) PRIMARY KEY REFERENCES public.student(dni),
    id_associated_career integer PRIMARY KEY REFERENCES public.associated_career(id_associated_career)
);
create table public.person_x_network(
    dni varchar(50) PRIMARY KEY REFERENCES public.student(dni),
    id_network integer PRIMARY KEY REFERENCES public.network(id_network)
);