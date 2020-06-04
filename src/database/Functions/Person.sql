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
  (select p.dni, p.name, p.lastname1, p.lastname2, 'Estudiante' as type
	from public.person p
	inner join public.student s on s.dni = p.dni
	where p.status = true)
	union 
	(select p.dni, p.name, p.lastname1, p.lastname2, 'Investigador' as type
	from public.person p
	inner join public.researcher r on r.dni = p.dni
	where p.status = true);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;