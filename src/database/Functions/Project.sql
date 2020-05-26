--########################################################################################

CREATE OR REPLACE FUNCTION createproject(id_inv integer,n varchar(50),cd varchar(50), pt project_type) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.project (id_inv_unit, name, code_manage, project_type) VALUES (id_inv, n, cd, pt);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getprojects(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.project;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getprojectbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.project where id_project = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateproject(idp integer, id_inv integer,n varchar(50),cd varchar(50), pt project_type) 
RETURNS void AS $$
BEGIN
  UPDATE public.project 
  SET 
    id_inv_unit = id_inv,
    name = n,
    code_manage = cd,
    project_type = pt
  WHERE id_project = idp;
END;
$$ LANGUAGE plpgsql;