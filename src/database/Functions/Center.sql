CREATE OR REPLACE FUNCTION createcenter(n VARCHAR(100)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.center(name,status) values(n,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatecenter(n VARCHAR(100),idc integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.center SET name = n WHERE id_center = idc;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deletecenter(idc integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.center WHERE id_center = idc;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcenters(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM center
    order by status desc;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcentersEnable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM center WHERE status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getcenterbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM center where id_center = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION disablecenter(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.center
        SET status=false
    WHERE id_center = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablecenter(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.center
        SET status=true
    WHERE id_center = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################