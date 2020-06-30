--  ####### Budget Unit  #######

CREATE OR REPLACE FUNCTION createbudgetunit(pid integer, n VARCHAR(100)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.budget_unit(code_budget_unit,name,status) values(pid,n,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatebudgetunit(n VARCHAR(100),idc integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.budget_unit SET name = n WHERE code_budget_unit = idc;
END;
$$ LANGUAGE plpgsql;


--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetunits(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_unit;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetunitsenable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_unit WHERE status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetunitbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_unit where code_budget_unit = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION disablebudgetunit(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.budget_unit
        SET status=false
    WHERE code_budget_unit = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablebudgetunit(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.budget_unit
        SET status=true
    WHERE code_budget_unit = pid;
    END;
$$ LANGUAGE plpgsql;

--  ####### Budget SubUnit  #######

CREATE OR REPLACE FUNCTION createbudgetsubunit(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.budget_sub_unit(name,status) values(n,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatebudgetsubunit(n VARCHAR(50),idc integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.budget_sub_unit SET name = n WHERE code_budget_subunit = idc;
END;
$$ LANGUAGE plpgsql;


--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetsubunits(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_sub_unit;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetsubunitsenable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_sub_unit WHERE status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getbudgetsubunitbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM budget_sub_unit where code_budget_subunit = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION disablebudgetsubunit(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.budget_sub_unit
        SET status=false
    WHERE code_budget_subunit = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablebudgetsubunit(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.budget_sub_unit
        SET status=true
    WHERE code_budget_subunit = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################