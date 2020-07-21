CREATE OR REPLACE FUNCTION createactivity(pname VARCHAR(100), pidtype integer,pidproject integer, ref refcursor)
RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  INSERT INTO public.activity(name, id_acti_type, id_project) values (pname,pidtype,pidproject) RETURNING id_activity;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateactivity(pid integer, pname VARCHAR(100), pidtype integer,pidproject integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.activity 
  SET 
    name = pname,
    id_acti_type = pidtype,
    id_project = pidproject
  WHERE id_activity = pid;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivitiesnoproject(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.activity
    WHERE id_project IS null;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivities(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.activity;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivitybyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.activity where id_activity = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivitybyidproject(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.activity where id_project = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION assignpersontoactivity(pdni VARCHAR(50), pida integer) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.person_x_activity(dni, id_activity) values (pdni,pida);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpersonsactivity(pida integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    select per.dni,per.name,per.lastname1,per.lastname2
        from public.person_x_activity pact
    inner join public.person per on pact.dni = per.dni
    where pact.id_activity = pida;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION createactivitytype(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.acti_type(name,status) values (n,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateactivitytype(id integer,n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
 UPDATE public.acti_type SET name = n WHERE id_acti_type = id;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivitytypes(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.acti_type
    order by status desc;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpersonsnotinactivity(pidp integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    (select dni,name,lastname1,lastname2,person_type from public.person
	where status = true)
  except 
  (select p.dni, p.name, p.lastname1, p.lastname2, p.person_type 
  from public.person_x_activity pp
  inner join person p on p.dni = pp.dni
  where pp.id_activity = pidp);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION disableactivitytype(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.acti_type
        SET status=false
    WHERE id_acti_type = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enableactivitytype(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.acti_type
        SET status=true
    WHERE id_acti_type = pid;
    END;
$$ LANGUAGE plpgsql;