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

CREATE OR REPLACE FUNCTION public.getpersons(
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR 
    SELECT * FROM person;
  RETURN ref;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.getperson(
	pid varchar,
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR 
    SELECT * FROM person WHERE dni = pid;
  RETURN ref;
END;
$BODY$;

CREATE OR REPLACE FUNCTION public.getpersonsinvited(
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR 
    SELECT p.dni,p.name,p.lastname1,p.lastname2,p.born_dates 
	FROM public.person p
	INNER JOIN public.student s ON s.dni = p.dni
	WHERE s.profile = 'Invitado';
  RETURN ref;
END;
$BODY$;


CREATE OR REPLACE FUNCTION public.getpersonsbasic(
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR 
    SELECT p.dni,p.name,p.lastname1,p.lastname2,p.born_dates 
	FROM public.person p
	INNER JOIN public.student s ON s.dni = p.dni
	WHERE s.profile = 'Básico';
  RETURN ref;
END;
$BODY$;