-- Seccion de periodo 


CREATE OR REPLACE FUNCTION createperiod(period_name VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.period(name) values(period_name);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateperiod(pname VARCHAR(50),pid integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.period SET name = pname WHERE id_period = pid;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getperiods(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT id_period,  name  FROM public.period;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################




-- Sección del gantt


CREATE OR REPLACE FUNCTION creategantt(
    prel_code integer,
    pid_period integer,
    ref refcursor
    )
    RETURNS refcursor AS $$
    BEGIN
      OPEN ref FOR
          INSERT INTO public.gantt( rel_code, id_period)
          VALUES ( prel_code , pid_period )RETURNING id_gantt;
      RETURN ref;
    END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION getgantts( pid_project integer , ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT ganttInfo.id_gantt , ganttInfo.rel_code, per.name as period ,
           person.dni , person.name ,  person.lastname1 , person.lastname2
    from ( 
        SELECT rel_code as rel , dni   
        FROM public.person_x_project
        WHERE id_project  = pid_project
    ) as infoProject
    inner join public.gantt  as ganttInfo
    on ganttInfo.rel_code =  infoProject.rel
    inner join public.person as person
    on person.dni =  infoProject.dni
    inner join public.period as per
    on per.id_period  = ganttInfo.id_period;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;






---Seccion Gantt Task 


CREATE OR REPLACE FUNCTION creategantt_task(
    pid_gantt integer,
    ptask_name VARCHAR(50),
    pdescription VARCHAR(200),
    pstart  date, 
    pend date
    )
    RETURNS void AS $$
    BEGIN
        INSERT INTO public.gantt_task( id_gantt, task_name,description,  start_date, end_date)
        VALUES ( pid_gantt , ptask_name, pdescription, pstart, pend );
    END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deletegantt_tasks( pid_gantt integer  )
    RETURNS void AS $$
    BEGIN
        DELETE FROM public.gantt_task
	    WHERE id_gantt = pid_gantt ;
    END;
$$ LANGUAGE plpgsql;



CREATE OR REPLACE FUNCTION getgantt_tasks(pid_gantt integer , ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT id_task, task_name,  description,  TO_CHAR(start_date,'YYYY-mm-dd') as start_date,  TO_CHAR(end_date,'YYYY-mm-dd') as end_date 
    FROM public.gantt_task
    where id_gantt =pid_gantt;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;




--==========================================================================================
