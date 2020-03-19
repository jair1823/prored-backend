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