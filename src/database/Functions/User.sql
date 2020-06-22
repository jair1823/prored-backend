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