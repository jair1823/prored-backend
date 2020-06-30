CREATE OR REPLACE FUNCTION createcareer(n VARCHAR(110), dg degree) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.career( name, degree, status) values (n,dg,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatecareer(n VARCHAR(110), dg degree, ccode integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.career SET name = n, degree = dg WHERE career_code = ccode;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deletecareer(ccode integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.career WHERE career_code = ccode;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcareer(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.career;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcareerEnable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.career WHERE status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcareers(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.career where career_code = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION careerexists(pid integer) RETURNS boolean AS $$
DECLARE
    pruebaCareer integer;
    res boolean;
BEGIN
    select career_code
    into pruebaCareer
    from public.career
    where career_code =  pid;
        if pruebaCareer IS NOT NULL then
            res := 1;
        else
            res := 0;
    end if;  
    RETURN res;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION disablecareer(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.career
        SET status=false
    WHERE career_code = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablecareer(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.career
        SET status=true
    WHERE career_code = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################