
/*create table public.financial_item(
    id_financial_item SERIAL PRIMARY KEY,
    date_created date,
    amount integer,
    type public.financial_item_type,
    id_project integer REFERENCES public.project(id_project),
    id_activity integer REFERENCES public.activity(id_activity),
    student_dni integer REFERENCES public.student(dni),
    code_unit integer REFERENCES public.budget_unit(code_budget_unit),
    code_subunit integer REFERENCES public.budget_sub_unit(code_budget_subunit)
);*/



--  Financial Item  ########################################################################################################

CREATE OR REPLACE FUNCTION createfinancialitem(
  pdate date,
  pamount date,
  ptype financial_item_type,
  pidproject integer,
  pidactivity integer,
  pdni varchar(50),
  punit integer, 
  psubunit integer)
RETURNS void AS $$
BEGIN
  INSERT INTO public.financial_item(date_created, amount, type, id_project, id_activity, student_dni, code_unit, code_subunit)
  values (pdate, pamount, ptype, pidproject, pidactivity, pdni, punit, psubunit);
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION updatefinancialitem(
  pidfinancialitem integer,  
  pdate date, 
  pamount integer,
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
    student_dni = pdni,
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
   select *  from public.financial_item
   RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialitembyid(pid integer , ref refcursor)
RETURNS refcursor AS $$
BEGIN
   OPEN ref FOR
   select *  from public.financial_item
   where id_financial_item = pid;
   RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION getfinancialitembyprojectactivity(
    pidproject integer, pidactivity integer , 
    ref refcursor)
RETURNS refcursor AS $$
BEGIN
   OPEN ref FOR
   select *  from public.financial_item
   where id_project = coalesce(pidproject, id_project )  and id_activity = coalesce(pidactivity, id_activity );
   RETURN ref;
END;
$$ LANGUAGE plpgsql;


