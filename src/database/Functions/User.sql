CREATE OR REPLACE FUNCTION createuser(
    pname varchar(50),
    plastname1 varchar(50),
    plastname2 varchar(50),
    pmail varchar(100),
    ppass varchar(300)
    )
    RETURNS void AS $$
    BEGIN
        INSERT INTO public.user(name, lastname1, lastname2,email,password,status)
            VALUES (pname, plastname1, plastname2, pmail,ppass,true);
    END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpassword(pemail varchar(100),ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
        select id_user, password 
        from public.user 
        where email = pemail and status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpasswordid(pid integer,ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
        select id_user, password 
        from public.user 
        where id_user = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getusers(ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
        select id_user, name, lastname1, lastname2, email, status
        from public.user;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION userEmailExists(pemail varchar(100)) RETURNS boolean AS $$
DECLARE
    testEmail varchar(100);
    res boolean;
BEGIN
    select email
    into testEmail
    from public.user
    where email =  pemail;
        if testEmail IS NOT NULL then
            res := 1;
        else
            res := 0;
    end if;  
    RETURN res;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatePassword(pid integer, ppass varchar(300)) 
RETURNS void AS $$
BEGIN
  UPDATE public.user 
  SET password = ppass
  WHERE id_user = pid;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION insertlog(
    pid integer,
    pname varchar(100),
    paction varchar(100)
    )
    RETURNS void AS $$
    BEGIN
        INSERT INTO public.log(id_user, date_made, table_name, action)
            VALUES (pid,now(), pname, paction);
    END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getlogs(ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
    select id_log, u.name , u.lastname1, u.lastname2, u.email, TO_CHAR(l.date_made,'YYYY-mm-dd') as date_made, l.table_name, l.action
    from public.log l
    inner join public.user u
    on l.id_user  = u.id_user;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION disableuser(id integer)
    RETURNS void AS $$
    BEGIN
    UPDATE public.user
        SET status=false
    WHERE id_user = id;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enableuser(id integer)
    RETURNS void AS $$
    BEGIN
    UPDATE public.user
        SET status=true
    WHERE id_user = id;
    END;
$$ LANGUAGE plpgsql;