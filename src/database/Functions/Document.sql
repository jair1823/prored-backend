--Project Form ########################################################################################################

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

--Endorsement ########################################################################################################

CREATE OR REPLACE FUNCTION createendorsement(idp integer,ptype endorsement_type, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.endorsement(id_project, type, filename, file_path) values (idp,ptype,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deleteendorsement(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.endorsement WHERE id_endorsement = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getendorsement(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select * 
            from public.endorsement
        where id_endorsement = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getendorsementsproject(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select * 
            from public.endorsement
        where id_project = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--Article ########################################################################################################

CREATE OR REPLACE FUNCTION createarticle(
  idp integer,
  ptitle varchar(100),
  pkey_words varchar(200),
  pabstract text,
  pauthors varchar(200),
  pmagazine varchar(50),
  purl varchar (200),
  pfile varchar(100),
  ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.article(id_project, title, key_words, abstract, authors, magazine, url, filename, file_path)
  values (idp, ptitle, pkey_words, pabstract, pauthors, pmagazine, purl, pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletearticle(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.article WHERE id_article = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getarticle(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select * 
            from public.article
        where id_article = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getarticlesproject(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select * 
            from public.article
        where id_project = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--Paper ########################################################################################################

CREATE OR REPLACE FUNCTION createpaper(
  idp integer,
  ppaper_name varchar(100),
  pspeaker varchar(100),
  pplace varchar(100),
  ptype paper_type,
  pcountry nationality,
  pdate date,
  pfile varchar(100),
  ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.paper(id_project, paper_name, speaker, place, type, country, date_assisted, filename, file_path)
  values (idp, ppaper_name, pspeaker, pplace, ptype, pcountry, pdate, pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletepaper(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.paper WHERE id_paper = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getpaper(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_paper, id_project, paper_name, speaker, place, type, country, TO_CHAR(date_assisted,'YYYY-mm-dd') AS date_assisted, filename, file_path
            from public.paper
        where id_paper = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getpapersproject(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_paper, id_project, paper_name, speaker, place, type, country, TO_CHAR(date_assisted,'YYYY-mm-dd') AS date_assisted, filename, file_path
            from public.paper
        where id_project = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--List of Assistance ########################################################################################################

CREATE OR REPLACE FUNCTION createlistofassistance(ida integer, pdate date, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.list_of_assitance(id_activity, date_passed, filename, file_path) values (ida,pdate,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletelistofassistance(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.list_of_assitance WHERE id_list = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getlistofassistance(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_list, id_activity, TO_CHAR(date_passed,'YYYY-mm-dd') as date_passed, filename, file_path 
            from public.list_of_assitance
        where id_list = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getlistofassistanceactivity(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_list, id_activity, TO_CHAR(date_passed,'YYYY-mm-dd') as date_passed, filename, file_path
            from public.list_of_assitance
        where id_activity = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;