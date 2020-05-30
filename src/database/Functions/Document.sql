CREATE OR REPLACE FUNCTION createprojectform(idp integer, pdate date, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.project_form(id_project, date_created, filename, file_path) values (idp,pdate,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deleteprojectform(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.project_form WHERE id_project = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getprojectform(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_project_form, id_project, TO_CHAR(date_created,'YYYY-mm-dd') as date_created, filename, file_path 
            from public.project_form
        where id_project = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;