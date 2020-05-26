

CREATE OR REPLACE FUNCTION createresearcher(
    pdni varchar(50),
    pid_inv_unit integer
    )
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.researcher(dni, id_inv_unit)
        VALUES (pdni, pid_inv_unit );
    END;
$$ LANGUAGE plpgsql;



--###########################################################################

CREATE OR REPLACE FUNCTION updateresearcher(
    pdni varchar(50), 
    pname varchar(50), 
    plastname1 varchar(50), 
    plastname2 varchar(50),
    pborn_dates date,
    pphone varchar(40),
    pmail varchar(60),
    pid_inv_unit integer
    )
    RETURNS void AS $$
    BEGIN
        UPDATE public.person
            SET 
                name=pname,
                lastname1=plastname1,
                lastname2=plastname2,
                born_dates=pborn_dates,
                phone_number=pphone, 
                email=pmail
        WHERE dni = pdni;
        UPDATE public.researcher
            SET
                id_inv_unit = pid_inv_unit
        WHERE dni = pdni;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################


CREATE OR REPLACE FUNCTION getresearchers(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, p.status,
s.id_inv_unit, d.name as nameInvUnit
from public.person p
inner join public.researcher s on s.dni = p.dni
inner join public.investigation_unit d on d.id_inv_unit = s.id_inv_unit
where p.status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getresearchersall(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, p.status,
s.id_inv_unit, d.name  as nameInvUnit
from public.person p
inner join public.researcher s on s.dni = p.dni
inner join public.investigation_unit d on d.id_inv_unit = s.id_inv_unit;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--#######################################################################

--#######################################################################

CREATE OR REPLACE FUNCTION getresearcherbydni(pdni varchar(50),ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR select 
        p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
        TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, p.status,
        s.id_inv_unit, d.name  as nameInvUnit
        
    from public.person p
    inner join public.researcher s on s.dni = p.dni
    inner join public.investigation_unit d on d.id_inv_unit = s.id_inv_unit
    where p.status = true and p.dni = pdni;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;