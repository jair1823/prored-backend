INSERT INTO public.campus (campus_code,name, status) 
    VALUES 
        ('01','San José',true),
        ('02','Quepos',true),
        ('03','Cartago',false);

INSERT INTO public.career(
	career_code, name, degree,status)
	VALUES 
        (1, 'Administración de Empresas', 'Diplomado',true),
        (2, 'Docencia', 'Licenciatura',true),
        (3, 'Ingeniería Informática', 'Bachillerato',false);


INSERT INTO public.center(name,status)
	VALUES
        ('ITCR',true),
        ('UCR',true),
        ('UNA',false);

INSERT INTO public.associated_career(id_center, name,status)
	VALUES 
        (1, 'Ingeniería en Computación',true),
        (1, 'Ingeniería en Electrónica',true), 
        (2, 'Filosofía',true),
        (2, 'Periodismo',true),
        (3, 'Veterinaria',false),
        (3, 'Letras',true);

INSERT INTO public.network(name, network_type,status)
	VALUES 
        ('Municipalidad Heredia', 'Municipalidad',true),
        ('Municipalidad Santa Ana', 'Municipalidad',true),
        ('ONU', 'ONG',true),
        ('OMS', 'ONG',true),
        ('DanzaTEC', 'Grupo Artístico',false);

INSERT INTO public.investigation_unit(name,description)
	VALUES
        ('Laboratorio de computación','Lab dedicado a programación'),
        ('Laboratorio de física','Lab dedicado a la física'),
        ('Centro de enseñanza','Facultad dedicada a la investigación de mejores prácticas de docencia');

-----------------------------------------------------------------------
--Avanzado

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status, phone_number, email)
        VALUES ('116920331', 'Gabriel', 'Solórzano', 'Chanto', '1997-10-31', true, '+506 87062905', 'g.solorzano97@hotmail.com');

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality, emergency_contact)
        VALUES ('116920331', 40406, 'Soltero', '01', 'Avanzado', 'San Bosco de Santa Bárbara', 'CR', '85858522');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_language(dni, id_language)
        VALUES ('116920331', 149);

INSERT INTO public.person_x_associated_career(dni, id_associated_career)
        VALUES ('116920331', 1);

INSERT INTO public.person_x_network(dni, id_network)
        VALUES ('116920331', 1);


-----------------------------------------------------------------------
--Básico

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status,phone_number,email)
        VALUES ('411111111', 'Benjamin', 'Pavard', 'Ruíz', '1987-10-31', true,'+506 89988755','pavard@bayern.com');

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality, emergency_contact)
        VALUES ('411111111', 0, 'Casado', '01', 'Básico', 'Lille', 'FR', '89562345');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('411111111', 1);






----------------------------------------------------------------------------



INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status,phone_number,email)
        VALUES ('402430534', 'Calvo', 'Meta a', 'James', '1987-10-31', true,'+506 89988755','zz@rm.com');

INSERT INTO public.researcher(dni, id_inv_unit)
        VALUES ('402430534',1);
