--  Financial Item  ########################################################################################################

CREATE OR REPLACE FUNCTION createfinancialitem(
  pdate date,
  pamount real,
  ptype financial_item_type,
  pidproject integer,
  pidactivity integer,
  pdni varchar(50),
  punit integer, 
  psubunit integer,
  ref refcursor)
RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  INSERT INTO public.financial_item(date_created, amount, type, id_project, id_activity, dni, code_unit, code_subunit) 
  values (pdate, pamount, ptype, pidproject, pidactivity, pdni, punit, psubunit) RETURNING id_financial_item;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;



--###########################################################################

CREATE OR REPLACE FUNCTION updatefinancialitem(
  pidfinancialitem integer,  
  pdate date, 
  pamount real,
  ptype financial_item_type,
  pidproject integer,
  pidactivity integer,
  pdni varchar(50),
  punit integer, 
  psubunit integer
  )
RETURNS void AS $$
BEGIN
  UPDATE public.financial_item SET
    date_created = pdate, 
    amount = pamount, 
    type = ptype, 
    id_project = pidproject, 
    id_activity = pidactivity, 
    dni = pdni,
    code_unit = punit    ,
    code_subunit = psubunit
   WHERE id_financial_item = pidfinancialitem;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialitem(ref refcursor)
RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select
    id_financial_item,
    TO_CHAR(date_created,'YYYY-mm-dd') AS date_created,
    amount,
    type,
    id_project,
    id_activity,
    dni,
    code_unit,
    code_subunit
  from public.financial_item;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialitembyid( pid integer , ref refcursor)
RETURNS refcursor AS $$
BEGIN
   OPEN ref FOR
   select 
    id_financial_item,
    TO_CHAR(date_created,'YYYY-mm-dd') AS date_created,
    amount,
    type,
    id_project,
    id_activity,
    dni,
    code_unit,
    code_subunit
    from public.financial_item
   where id_financial_item = pid;
   RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialitembyprojectactivity(
    pidproject integer, pidactivity integer ,   ref refcursor)
RETURNS refcursor AS $$
BEGIN
   OPEN ref FOR
   select
    id_financial_item,
    TO_CHAR(date_created,'YYYY-mm-dd') AS date_created,
    amount,
    type,
    id_project,
    id_activity,
    dni,
    code_unit,
    code_subunit 
   from public.financial_item
   where id_project = coalesce(pidproject, id_project )  and id_activity = coalesce(pidactivity, id_activity );
   RETURN ref;
END;
$$ LANGUAGE plpgsql;


