CREATE OR REPLACE FUNCTION createassociated_career(n VARCHAR(50), idc integer) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.associated_career(name,id_center) values(n,idc);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateassociated_career(n VARCHAR(50), idac integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.associated_career SET name = n WHERE id_associated_career = idac;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deleteassociated_career(idac integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.associated_career WHERE id_associated_career = idac;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getasocareer(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.associated_career;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getasocareers(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.associated_career where id_associated_career = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION public.getasocareercenter(
	ref refcursor)
    RETURNS refcursor
    LANGUAGE 'plpgsql'

    COST 100
    VOLATILE 
    
AS $BODY$
BEGIN
  OPEN ref FOR select 
a.id_associated_career, a.name as associated_career_name , s.id_center, s.name as center_name
from public.associated_career a
inner join public.center s on s.id_center = a.id_center;
  RETURN ref;
END;
$BODY$;

--########################################################################################

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