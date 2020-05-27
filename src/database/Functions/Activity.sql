CREATE OR REPLACE FUNCTION createactivity(pname VARCHAR(100), pidtype integer,pidproject integer) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.activity(name, id_acti_type, id_project) values (pname,pidtype,pidproject);
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