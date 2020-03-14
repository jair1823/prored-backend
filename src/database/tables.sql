--create database prored;

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

