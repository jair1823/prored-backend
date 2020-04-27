CREATE OR REPLACE FUNCTION createacademic_unit(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.academic_unit (name) VALUES (n);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateacademic_unit(n VARCHAR(50),ida integer) 
RETURNS void AS $$
BEGIN
	UPDATE public.academic_unit SET name = n WHERE id_academic_unit = ida;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deleteacademic_unit(ida integer) 
RETURNS void AS $$
BEGIN
	DELETE FROM public.academic_unit WHERE id_academic_unit = ida;
END;
$$ LANGUAGE plpgsql;