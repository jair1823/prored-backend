CREATE OR REPLACE FUNCTION createcampus(ccode VARCHAR(30), n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.campus (campus_code, name, status) VALUES (ccode,n,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatecampus(n VARCHAR(50),ccodeo VARCHAR(30)) 
RETURNS void AS $$
BEGIN
  UPDATE public.campus SET name = n WHERE campus_code = ccodeo;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deletecampus(ccode VARCHAR(30)) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.campus WHERE campus_code = ccode;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcampuses(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM campus;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcampusesEnable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM campus WHERE status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcampusesbyid(pid VARCHAR(30), ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM campus WHERE campus_code = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION campusexists(pid varchar(30)) RETURNS boolean AS $$
DECLARE
    pruebaCampus varchar(30);
    res boolean;
BEGIN
    select campus_code
    into pruebaCampus
    from public.campus
    where campus_code =  pid;
        if pruebaCampus IS NOT NULL then
            res := 1;
        else
            res := 0;
    end if;  
    RETURN res;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION disablecampus(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.campus
        SET status=false
    WHERE campus_code = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablecampus(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.campus
        SET status=true
    WHERE campus_code = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################