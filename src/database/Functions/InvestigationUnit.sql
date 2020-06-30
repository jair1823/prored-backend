CREATE OR REPLACE FUNCTION createinvestigation_unit(n VARCHAR(110),des TEXT) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.investigation_unit (name, description) VALUES (n,des);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateinvestigation_unit(idi integer,n VARCHAR(110), des TEXT) 
RETURNS void AS $$
BEGIN
	UPDATE public.investigation_unit 
	SET 
		name = n,
		description = des
	WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deleteinvestigation_unit(idi integer) 
RETURNS void AS $$
BEGIN
	DELETE FROM public.investigation_unit WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getinvestigationunits(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.investigation_unit;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getinvestigationunitbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.investigation_unit where id_inv_unit = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;