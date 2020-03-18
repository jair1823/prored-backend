INSERT INTO public.province (name) 
    VALUES 
        ('San Jose'),
        ('Heredia');

INSERT INTO public.canton (id_province,name) 
    VALUES 
        (1,'Santa Ana'),
        (2,'Santa Bárbara');
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
