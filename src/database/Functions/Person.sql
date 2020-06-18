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

--########################################################################################

CREATE OR REPLACE FUNCTION getPersons(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
  select dni,name,lastname1,lastname2,person_type from public.person
	where status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;