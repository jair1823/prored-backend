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