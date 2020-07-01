CREATE OR REPLACE FUNCTION createinvestigation_unit(n VARCHAR(110),des TEXT) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.investigation_unit (name, description,status) VALUES (n,des,true);
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

--###########################################################################

CREATE OR REPLACE FUNCTION disableinvestigationunit(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.investigation_unit
        SET status=false
    WHERE id_inv_unit = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enableinvestigationunit(pid varchar(50))
    RETURNS void AS $$
    BEGIN
    UPDATE public.investigation_unit
        SET status=true
    WHERE id_inv_unit = pid;
    END;
$$ LANGUAGE plpgsql;