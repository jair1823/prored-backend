CREATE OR REPLACE FUNCTION createcenter(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.center(name) values(n);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatecenter(n VARCHAR(50),idc integer) 
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
    SELECT * FROM center;
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