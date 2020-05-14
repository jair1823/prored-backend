INSERT INTO public.campus (campus_code,name) 
    VALUES 
        ('01','San José'),
        ('02','Quepos'),
        ('03','Cartago');

INSERT INTO public.career(
	career_code, name, degree)
	VALUES 
        (1, 'Administración de Empresas', 'Diplomado'),
        (2, 'Docencia', 'Licenciatura'),
        (3, 'Ingeniería Informática', 'Bachillerato');


INSERT INTO public.center(name)
	VALUES
        ('ITCR'),
        ('UCR'),
        ('UNA');

INSERT INTO public.associated_career(id_center, name)
	VALUES 
        (1, 'Ingeniería en Computación'),
        (1, 'Ingeniería en Electrónica'), 
        (2, 'Filosofía'),
        (2, 'Periodismo'),
        (3, 'Veterinaria'),
        (3, 'Letras');

INSERT INTO public.network(name, network_type)
	VALUES 
        ('Municipalidad Heredia', 'Municipalidad'),
        ('Municipalidad Santa Ana', 'Municipalidad'),
        ('ONU', 'ONG'),
        ('OMS', 'ONG'),
        ('DanzaTEC', 'Grupo Artístico');


-----------------------------------------------------------------------
--Avanzado

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status)
        VALUES ('116920331', 'Gabriel', 'Solórzano', 'Chanto', '1997-10-31', true);

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality)
        VALUES ('116920331', 40406, 'Soltero', '01', 'Avanzado', 'San Bosco de Santa Bárbara', 'CR');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_language(dni, id_language)
        VALUES ('116920331', 148);

INSERT INTO public.person_x_associated_career(dni, id_associated_career)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_network(dni, id_network)
        VALUES ('116920331', 1);


-----------------------------------------------------------------------
--Básico

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status)
        VALUES ('411111111', 'Benjamin', 'Pavard', 'Ruíz', '1987-10-31', true);

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality)
        VALUES ('411111111', 0, 'Casado', '01', 'Básico', 'Lille', 'FR');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('411111111', 1);