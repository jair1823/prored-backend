--########################################################################################

CREATE OR REPLACE FUNCTION createproject(id_inv integer,n varchar(100),cd varchar(50), pt project_type, ref refcursor) 
 RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  INSERT INTO public.project (id_inv_unit, name, code_manage, project_type) VALUES (id_inv, n, cd, pt) RETURNING id_project;
  RETURN ref;
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
    SELECT p.id_project, p.name, p.code_manage, p.project_type, p.id_inv_unit, iv.name as inv_unit_name, iv.description FROM public.project p
    inner join investigation_unit iv on iv.id_inv_unit = p.id_inv_unit 
    where id_project = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updateproject(idp integer, id_inv integer,n varchar(100),cd varchar(50), pt project_type) 
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

--########################################################################################

CREATE OR REPLACE FUNCTION assignpersonproject(pdni varchar(50),pidp integer, prol public.role) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.person_x_project (dni, id_project, role) VALUES (pdni, pidp, prol);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpersonsproject(pidp integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    select per.dni,per.name,per.lastname1,per.lastname2,proj.role,per.status
        from public.person_x_project proj
    inner join public.person per on proj.dni = per.dni
    where proj.id_project = pidp;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getstudentsproject(pidp integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    select per.dni,per.name,per.lastname1,per.lastname2, proj.rel_code
    from public.person_x_project proj
    inner join public.person per on proj.dni = per.dni
    inner join public.student s on s.dni = per.dni
    where proj.id_project = pidp;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpersonsnotinproject(pidp integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    (select dni,name,lastname1,lastname2,person_type from public.person
	where status = true)
  except 
  (select p.dni, p.name, p.lastname1, p.lastname2, p.person_type 
  from public.person_x_project pp
  inner join person p on p.dni = pp.dni
  where pp.id_project = pidp);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;