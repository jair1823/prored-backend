CREATE OR REPLACE FUNCTION getstudentsprojectstring(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(concat( a.name,' ',a.lastname1,' ',a.lastname2), '; ') as names from
    (select * from person_x_project pxp
    inner join person p on p.dni = pxp.dni
    where p.person_type = 'Estudiante'
    and id_project = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getresearchersprojectstring(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(concat( a.name,' ',a.lastname1,' ',a.lastname2), '; ') as names from
    (select * from person_x_project pxp
    inner join person p on p.dni = pxp.dni
    where p.person_type = 'Investigador'
    and id_project = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION projectfilter(pid_inv_unit INTEGER,ptype project_type, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.id_project, p.code_manage, 
    p.name, p.project_type, iv.name as inv_name
    FROM public.project p
    inner join investigation_unit iv on iv.id_inv_unit = p.id_inv_unit
    where p.id_inv_unit = coalesce(pid_inv_unit,p.id_inv_unit)
      AND project_type = coalesce(ptype,p.project_type)
    order by p.id_project;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getprojectsstudentstring(pid varchar, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(a.name , '; ') as names from
    (select * from person_x_project pxp
    inner join project p on p.id_project = pxp.id_project
    where pxp.dni = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getactivitiesstudentstring(pid varchar, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(a.name , '; ') as names from
    (select * from person_x_activity pxp
    inner join activity p on p.id_activity = pxp.id_activity
    where pxp.dni = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION studentfilter(pcampus varchar(30), pcareer integer,pstatus boolean, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.dni,p.name,p.lastname1,p.lastname2,TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates,s.nationality,p.phone_number,p.email,p.status,c.name as campus_name,s.address
    FROM public.person p
    inner join student s on s.dni = p.dni
    inner join campus c on s.campus_code = c.campus_code
    inner join person_x_career pc on pc.dni = s.dni and pc.career_code = coalesce(pcareer,pc.career_code)
    inner join career car on car.career_code = pc.career_code
    where s.campus_code = coalesce(pcampus,s.campus_code) 
        and p.status = coalesce(pstatus,p.status);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION studentfilternocareer(pcampus varchar(30),pstatus boolean, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.dni,p.name,p.lastname1,p.lastname2,TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates,s.nationality,p.phone_number,p.email,p.status,c.name as campus_name,s.address
    FROM public.person p
    inner join student s on s.dni = p.dni
    inner join campus c on s.campus_code = c.campus_code
    where s.campus_code = coalesce(pcampus,s.campus_code) 
        and p.status = coalesce(pstatus,p.status);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getcareersbydni(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR select c.career_code, c.name, c.degree
        from public.career c
    inner join public.person_x_career pxc on c.career_code = pxc.career_code
    where dni = pdni;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION researcherfilter(pid_inv_unit INTEGER,pstatus boolean, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.dni,p.name,p.lastname1,p.lastname2,TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, p.phone_number,p.email, p.status,iv.name as inv_name
    FROM public.person p
    inner join researcher r on r.dni = p.dni
    inner join investigation_unit iv on iv.id_inv_unit = r.id_inv_unit
    where r.id_inv_unit = coalesce(pid_inv_unit,r.id_inv_unit)
        and p.status = coalesce(pstatus,p.status);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getstudentsactivitystring(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(concat( a.name,' ',a.lastname1,' ',a.lastname2), '; ') as names from
    (select * from person_x_activity pxp
    inner join person p on p.dni = pxp.dni
    where p.person_type = 'Estudiante'
    and id_activity = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getresearchersactivitystring(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select string_agg(concat( a.name,' ',a.lastname1,' ',a.lastname2), '; ') as names from
    (select * from person_x_activity pxp
    inner join person p on p.dni = pxp.dni
    where p.person_type = 'Investigador'
    and id_activity = pid) as a;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION activityfilterproject(pid_acti_type INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT a.id_activity,a.name, acti.name as acti_type_name, p.name as project_name
    FROM public.activity a
    inner join project p on a.id_project = p.id_project
    inner join acti_type acti on a.id_acti_type = acti.id_acti_type
    where a.id_acti_type = coalesce(pid_acti_type,a.id_acti_type) AND a.id_project IS NOT null;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION activityfilternoproject(pid_acti_type INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT a.id_activity,a.name, acti.name as acti_type_name
    FROM public.activity a
    inner join acti_type acti on a.id_acti_type = acti.id_acti_type
    where a.id_acti_type = coalesce(null,a.id_acti_type) AND a.id_project IS NULL;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterIndependent(
  pstartdate date,
  penddate date,
  pdni varchar(50), 
  ptype financial_item_type, 
  pcode integer, 
  psubcode integer, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.id_financial_item,TO_CHAR(f.date_created,'YYYY-mm-dd') AS date_created,f.amount,p."name" ,p.lastname1 ,p.lastname2 ,bu."name" as budgetName,bsu."name" as subUnitName, f."type"
      from financial_item f
      inner join person p on p.dni = f.dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit 
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit
      where f.dni = coalesce(pdni,f.dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_project is null
          and f.id_activity is null
          and f.type = coalesce(ptype,f.type)
          and (date_created between coalesce(pstartdate,f.date_created) and coalesce(penddate,f.date_created));
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterActivity(
  pstartdate date,
  penddate date,
  pdni varchar(50),
  ptype financial_item_type, 
  pcode integer, 
  psubcode integer,
  pid integer, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.id_financial_item,TO_CHAR(f.date_created,'YYYY-mm-dd') AS date_created,f.amount,p."name" ,p.lastname1 ,p.lastname2 ,bu."name" as budgetName,bsu."name" as subUnitName, f."type", acti."name" as activityName
      from financial_item f
      inner join person p on p.dni = f.dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit 
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit 
      inner join activity acti on acti.id_activity = f.id_activity 
      where f.dni = coalesce(pdni,f.dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_activity = coalesce(pid,f.id_activity)
          and f.type = coalesce(ptype,f.type)
          and (date_created between coalesce(pstartdate,f.date_created) and coalesce(penddate,f.date_created));
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterProject(
  pstartdate date,
  penddate date,
  pdni varchar(50),
  ptype financial_item_type, 
  pcode integer, 
  psubcode integer,
  pid integer, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.id_financial_item,TO_CHAR(f.date_created,'YYYY-mm-dd') AS date_created,f.amount,p."name" ,p.lastname1 ,p.lastname2, bu."name" as budgetName,bsu."name" as subUnitName,f."type",prj."name"  as projectName
      from financial_item f
      inner join person p on p.dni = f.dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit 
      inner join project prj on prj.id_project = f.id_project
      where f.dni = coalesce(pdni,f.dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_project = coalesce(pid,f.id_project)
          and f.type = coalesce(ptype,f.type)
          and (date_created between coalesce(pstartdate,f.date_created) and coalesce(penddate,f.date_created));
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterAll(
  pstartdate date,
  penddate date,
  pdni varchar(50),
  pcode integer, 
  psubcode integer, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select t.id_financial_item,t.date_created,t.amount,t.name,t.lastname1,t.lastname2,t.budgetName,t.subUnitName,t.type,t.activityName,t.projectName from(
    select * from 
    (select f.id_financial_item,TO_CHAR(f.date_created,'YYYY-mm-dd') AS date_created, f."type",f.amount, f.id_activity,f.id_project,p."name" ,p.lastname1 ,p.lastname2 ,bu."name" as budgetName,bsu."name" as subUnitName
      from financial_item f
      inner join person p on p.dni = f.dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit 
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit
      where f.dni = coalesce(pdni,f.dni)
      and f.code_unit = coalesce(pcode,f.code_unit)
      and f.code_subunit = coalesce(psubcode,f.code_subunit)
      and (date_created between coalesce(pstartdate,f.date_created) and coalesce(penddate,f.date_created))) as a
    left join 
      (select id_activity,name as activityName from activity) as act on act.id_activity = a.id_activity
    left join 
      (select id_project,name as projectName from project) as prj on prj.id_project = a.id_project) as t;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;