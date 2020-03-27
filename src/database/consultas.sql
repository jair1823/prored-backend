CREATE OR REPLACE FUNCTION public.getasocareerfromcenter(
	pid integer,
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR 
    SELECT * FROM associated_career where id_center = pid;
  RETURN ref;
END;
$BODY$;


----------------------------------------------------------------------------------------------------------------- 

-- Verificar si cédula ya está en el sistema

	CREATE OR REPLACE FUNCTION personexists(pdni varchar(50)) RETURNS boolean AS $$
	DECLARE
	  pruebaDni varchar(50);
	  res boolean;
	BEGIN
		select dni
		into pruebaDni
		from public.person
		where dni =  pdni;
			if pruebaDni IS NOT NULL then
				res := 1;
			else
				res := 0;
		end if;  
	  RETURN res;
	END;
	$$ LANGUAGE plpgsql;

  ----------------------------------------------------------------------------------------------------------------- 

-- Verificar si carrera ya está en el sistema

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

----------------------------------------------------------------------------------------------------------------- 

-- Verificar si campus ya está en el sistema

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