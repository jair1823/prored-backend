CREATE OR REPLACE FUNCTION createinvestigation_unit(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.investigation_unit (name) VALUES (n);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateinvestigation_unit(n VARCHAR(50),idi integer) 
RETURNS void AS $$
BEGIN
	UPDATE public.investigation_unit SET name = n WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deleteinvestigation_unit(idi integer) 
RETURNS void AS $$
BEGIN
	DELETE FROM public.investigation_unit WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;