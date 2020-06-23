CREATE OR REPLACE FUNCTION createuser(
    pname varchar(50),
    plastname1 varchar(50),
    plastname2 varchar(50),
    pmail varchar(60),
    ppass varchar(300)
    )
    RETURNS void AS $$
    BEGIN
        INSERT INTO public.user(name, lastname1, lastname2,email,password,status,reset_password_token,reset_password_expiration)
            VALUES (pname, plastname1, plastname2, pmail,ppass,true,null,null);
    END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getpassword(pemail varchar(50),ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
        select password 
        from public.user 
        where email = pemail;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getusers(ref refcursor)  RETURNS refcursor AS $$
BEGIN
    OPEN ref FOR
        select id_user, name, lastname1, lastname2, email 
        from public.user
        where status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION userEmailExists(pemail varchar(60)) RETURNS boolean AS $$
DECLARE
    testEmail varchar(60);
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

CREATE OR REPLACE FUNCTION updateResetToken(pemail varchar(60), ptoken text, pdate bigint) 
RETURNS void AS $$
BEGIN
  UPDATE public.user 
  SET reset_password_token = ptoken , reset_password_expiration = pdate 
  WHERE email = pemail;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION validateToken(ptoken text, pdate bigint, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT id_user, email FROM public.user WHERE reset_password_token = ptoken and reset_password_expiration > pdate;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatePassword(pid integer, ppass varchar(300)) 
RETURNS void AS $$
BEGIN
  UPDATE public.user 
  SET password = ppass, reset_password_expiration = null, reset_password_token = null
  WHERE id_user = pid;
END;
$$ LANGUAGE plpgsql;

--########################################################################################