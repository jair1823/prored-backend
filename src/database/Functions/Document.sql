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

CREATE OR REPLACE FUNCTION updatearticle(
  ida integer,
  ptitle varchar(100),
  pkey_words varchar(200),
  pabstract text,
  pauthors varchar(200),
  pmagazine varchar(50),
  purl varchar (200))
RETURNS void AS $$
BEGIN
  UPDATE public.article SET
    title = ptitle, 
    key_words = pkey_words, 
    abstract = pabstract, 
    authors = pauthors, 
    magazine = pmagazine, 
    url = purl
   WHERE id_article = ida;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletearticlefile(
  ida integer)
RETURNS void AS $$
BEGIN
  UPDATE public.article SET
    filename = null, 
    file_path = null
   WHERE id_article = ida;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION insertarticlefile(
  ida integer,
  pfile varchar(100),
  ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  UPDATE public.article SET
    filename = pfile, 
    file_path = ppath
   WHERE id_article = ida;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getarticlefile(
  ida integer, ref refcursor)
RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
   select filename, file_path from public.article
   WHERE id_article = ida;
   RETURN ref;
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

CREATE OR REPLACE FUNCTION updatepaper(
  idp integer,
  ppaper_name varchar(100),
  pspeaker varchar(100),
  pplace varchar(100),
  ptype paper_type,
  pcountry nationality,
  pdate date)
RETURNS void AS $$
BEGIN
  UPDATE public.paper SET
    paper_name = ppaper_name, 
    speaker = pspeaker, 
    place = pplace, 
    type = ptype, 
    country = pcountry, 
    date_assisted = pdate
   WHERE id_paper = idp;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletepaperfile(
  idp integer)
RETURNS void AS $$
BEGIN
  UPDATE public.paper SET
    filename = null, 
    file_path = null
   WHERE id_paper = idp;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION insertpaperfile(
  idp integer,
  pfile varchar(100),
  ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  UPDATE public.paper SET
    filename = pfile, 
    file_path = ppath
   WHERE id_paper = idp;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getpaperfile(
  idp integer, ref refcursor)
RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
   select filename, file_path from public.paper
   WHERE id_paper = idp;
   RETURN ref;
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

--Photo ########################################################################################################

CREATE OR REPLACE FUNCTION createphoto(ida integer, pdate date, pcomment text, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.photo(id_activity, date_taken,comment, filename, file_path) values (ida,pdate,pcomment,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletephoto(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.photo WHERE id_photo = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getphoto(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_photo, id_activity, TO_CHAR(date_taken,'YYYY-mm-dd') as date_taken,comment, filename, file_path 
            from public.photo
        where id_photo = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getphotosactivity(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_photo, id_activity, TO_CHAR(date_taken,'YYYY-mm-dd') as date_taken,comment, filename, file_path
            from public.photo
        where id_activity = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--Financial Document ########################################################################################################

CREATE OR REPLACE FUNCTION createfinancialdocument(idfi integer, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.financial_document(id_financial_item, filename, file_path) values (idfi,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletefinancialdocument(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.financial_document WHERE id_financial_document = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialdocument(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select *
            from public.financial_document
        where id_financial_document = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialdocumentfromfinancialitem(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select *
            from public.financial_document
        where id_financial_item = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION insertCV(id VARCHAR(50), fp VARCHAR(400), n VARCHAR(300)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.cv (dni, file_path, name) VALUES (id,fp,n);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deleteCV(id VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.cv WHERE dni = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION updateCV(id VARCHAR(50),fp VARCHAR(400), n VARCHAR(300)) 
RETURNS void AS $$
BEGIN
  UPDATE public.cv SET 
    name = n,
    file_path = fp
  WHERE dni = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getcv(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select *
            from public.cv
        where dni = pdni;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--Evaluation Form ########################################################################################################

CREATE OR REPLACE FUNCTION createevaluationform(pdni varchar(50), pdate date, pfile varchar(100),ppath varchar(200)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.evaluation_form(dni, date_made, filename, file_path) values (pdni,pdate,pfile,ppath);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deleteevaluationform(id integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.evaluation_form WHERE id_evaluation = id;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getevaluationform(pid integer, ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_evaluation, dni, TO_CHAR(date_made,'YYYY-mm-dd') as date_made, filename, file_path 
            from public.evaluation_form
        where id_evaluation = pid;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getevaluationformperson(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select id_evaluation, dni, TO_CHAR(date_made,'YYYY-mm-dd') as date_made, filename, file_path 
            from public.evaluation_form
        where dni = pdni;
        RETURN ref;
    END;
$$ LANGUAGE plpgsql;