INSERT INTO public.career(name, degree,status)
	VALUES 
        ('Administración de Empresas', 'Diplomado',true),
        ('Docencia', 'Licenciatura',true),
        ('Ingeniería Informática', 'Bachillerato',true);


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

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status, phone_number, email,person_type)
        VALUES ('116920331', 'Gabriel', 'Solórzano', 'Chanto', '1997-10-31', true, '+506 87062905', 'g.solorzano97@hotmail.com','Estudiante');

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality, emergency_contact)
        VALUES ('116920331', 40406, 'Soltero', '1', 'Avanzado', 'San Bosco de Santa Bárbara', 'CR', '85858522');

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

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status,phone_number,email, person_type)
        VALUES ('411111111', 'Benjamin', 'Pavard', 'Ruíz', '1987-10-31', true,'+506 89988755','pavard@bayern.com', 'Estudiante');

INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality, emergency_contact)
        VALUES ('411111111', 0, 'Casado', '2', 'Básico', 'Lille', 'FR', '89562345');

INSERT INTO public.person_x_career(dni, career_code)
        VALUES ('411111111', 2);

----------------------------------------------------------------------------
--Investigador

INSERT INTO public.person(dni, name, lastname1, lastname2, born_dates, status,phone_number,email,person_type)
        VALUES ('402430534', 'Albert', 'Solís', 'Ruíz', '1987-10-31', true,'+506 89988755','zz@rm.com','Investigador');

INSERT INTO public.researcher(dni, id_inv_unit)
        VALUES ('402430534',1);

----------------------------------------------------------------------------
--Proyecto

INSERT INTO public.project(id_inv_unit, name, code_manage, project_type)
        VALUES (1, 'Proyecto de desarrollo de la ProRed', 'PR001', 'Estudiantes');

INSERT INTO public.project(id_inv_unit, name, code_manage, project_type)
        VALUES (1, 'Proyecto de investigación de Mantos Aquiferos', 'PR002', 'Investigadores');

----------------------------------------------------------------------------
--Tipo Actividad

INSERT INTO public.acti_type(name)
	VALUES
        ('Taller');

----------------------------------------------------------------------------
--Actividad

INSERT INTO public.activity(name, id_acti_type, id_project) 
        values ('Taller de computación',1,1);

INSERT INTO public.activity(name, id_acti_type, id_project) 
        values ('Taller de arte',1,null);

----------------------------------------------------------------------------
--Personas x Actividad

INSERT INTO public.person_x_activity(dni, id_activity) 
        values 
                ('116920331',1),
                ('402430534',1);


-- Personas x Proyecto

INSERT INTO  public.person_x_project(dni , id_project, role )
        values 
                ('116920331' , 1  , 'Investigador'),
                ('402430534' , 1  , 'Investigador');



-- Period
INSERT INTO public.period(name)
        values
                ('II Semestre 2020'),
                ('I Semestre 2021');

-- Gantt 


INSERT INTO public.gantt(rel_code , id_period)
        values 
                (1,1),
                (2,2);

--Gantt Task 

INSERT INTO public.gantt_task(id_gantt, task_name, description, start_date, end_date)
        values
                (1, 'Primera tarea Gantt1',  'Descripción', '2020-02-02' , '2020-02-03'),
                (2 ,'Primera tarea Gantt2', 'Descripción2' , '2020-02-06', '2020-02-09'),
                (2 ,'Primera tarea Gantt2', 'Descripción2' , '2020-02-06', '2020-02-09');


INSERT INTO public.budget_unit(name,status)
	VALUES
        ('BudgetUnit1',true),
        ('BudgetUnit2',true),
        ('BudgetUnit3',false);




INSERT INTO public.budget_sub_unit(name,status)
	VALUES
        ('BudgetSubUnit1',true),
        ('BudgetSubUnit2',true),
        ('BudgetSubUnit3',false);