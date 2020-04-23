INSERT INTO public.province (id_province,name) 
    VALUES 
        (0,'Internacional');

INSERT INTO public.province (name) 
    VALUES 
        ('San Jose'),
        ('Heredia');

INSERT INTO public.canton (id_canton,id_province,name) 
    VALUES 
        (0,0,'Internacional');

INSERT INTO public.canton (id_province,name) 
    VALUES 
        (1,'Santa Ana'),
        (2,'Santa Bárbara');

INSERT INTO public.district (id_district,id_canton,name) 
    VALUES
        (0,0,'Internacional');

INSERT INTO public.district (id_canton,name) 
    VALUES
        (1,'Piedades'),
        (2,'Puraba');

INSERT INTO public.campus (campus_code,name) 
    VALUES 
        ('C1','Heredia'),
        ('C2','La Cruz');

INSERT INTO public.career(
	career_code, name, degree)
	VALUES 
        (1, 'Career 1', 'Diplomado'),
        (2, 'Career 1', 'Licenciatura');


INSERT INTO public.language(name)
	VALUES 
        ('Language 1'),
        ('Language 2'),
        ('Language 3');

INSERT INTO public.center(name)
	VALUES
        ('Center 1'),
        ('Center 2');

INSERT INTO public.associated_career(id_center, name)
	VALUES 
        (1, 'Compu'), 
        (2, 'Admi');

INSERT INTO public.network(name, network_type)
	VALUES 
        ('Municipalidad Heredia', 'Municipalidad'),
        ('Municipalidad Santa Ana', 'Municipalidad');


-----------------------------------------------------------------------
--Avanzado

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status)
        VALUES ('116920331', 'Gabriel', 'Solórzano', 'Chanto', '1997-10-31', true);

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality)
        VALUES ('116920331', 1, 'Soltero', 'C1', 'Avanzado', 'San Bosco de Santa Bárbara', 'CR');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_language(dni, id_language)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_associated_career(dni, id_associated_career)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_network(dni, id_network)
        VALUES ('116920331', 1);


-----------------------------------------------------------------------
--Básico

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status)
        VALUES ('411111111', 'Benjamin', 'Pavard', 'Ruíz', '1987-10-31', true);

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality)
        VALUES ('411111111', 0, 'Casado', 'C1', 'Básico', 'Torre Eiffel', 'FR');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('411111111', 1);