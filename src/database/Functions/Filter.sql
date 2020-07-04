CREATE OR REPLACE FUNCTION projectfilter(pid_inv_unit INTEGER,ptype project_type, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.id_project, p.code_manage, p.name, p.project_type, iv.name as inv_name
    FROM public.project p
    inner join investigation_unit iv on iv.id_inv_unit = p.id_inv_unit
    where p.id_inv_unit = coalesce(pid_inv_unit,p.id_inv_unit)
        AND project_type = coalesce(ptype,p.project_type);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION studentfilter(pcampus varchar(30), pcareer integer,pstatus boolean, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    SELECT p.dni,p.name,p.lastname1,p.lastname2,p.status,c.name as campus_name
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
    SELECT p.dni,p.name,p.lastname1,p.lastname2,p.status,c.name as campus_name
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
    SELECT p.dni,p.name,p.lastname1,p.lastname2,p.status,iv.name as inv_name
    FROM public.person p
    inner join researcher r on r.dni = p.dni
    inner join investigation_unit iv on iv.id_inv_unit = r.id_inv_unit
    where r.id_inv_unit = coalesce(pid_inv_unit,r.id_inv_unit)
        and p.status = coalesce(pstatus,p.status);
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
    where a.id_acti_type = coalesce(pid_acti_type,a.id_acti_type) AND a.id_project IS NOT NULL;
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
    where a.id_acti_type = coalesce(pid_acti_type,a.id_acti_type) AND a.id_project IS NULL;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterIndependent(pdni varchar(50), ptype financial_item_type, pcode integer, psubcode integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.date_created, f."type",p."name" ,p.lastname1 ,p.lastname2 ,bu."name" as budgetName,bsu."name" as subUnitName
      from financial_item f
      inner join person p on p.dni = f.student_dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit 
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit
      where f.student_dni = coalesce(pdni,f.student_dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_project is null
          and f.id_activity is null
          and f."type" = coalesce(ptype,f."type");
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterActivity(pdni varchar(50),ptype financial_item_type, pcode integer, psubcode integer,pid integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.date_created, f."type", acti."name" as activityName,p."name" ,p.lastname1 ,p.lastname2 ,bu."name" as budgetName,bsu."name" as subUnitName
      from financial_item f
      inner join person p on p.dni = f.student_dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit 
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit 
      inner join activity acti on acti.id_activity = f.id_activity 
      where f.student_dni = coalesce(pdni,f.student_dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_activity = coalesce(pid,f.id_activity)
          and f.id_activity = coalesce(pid,f.id_activity);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialItemFilterProject(pdni varchar(50),ptype financial_item_type, pcode integer, psubcode integer,pid integer, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
  select f.date_created, f."type",prj."name"  as projectName,p."name" ,p.lastname1 ,p.lastname2, bu."name" as budgetName,bsu."name" as subUnitName
      from financial_item f
      inner join person p on p.dni = f.student_dni
      inner join budget_unit bu on bu.code_budget_unit = f.code_unit
      inner join budget_sub_unit bsu on bsu.code_budget_subunit = f.code_subunit 
      inner join project prj on prj.id_project = f.id_project
      where f.student_dni = coalesce(pdni,f.student_dni)
        and f.code_unit = coalesce(pcode,f.code_unit)
          and f.code_subunit = coalesce(psubcode,f.code_subunit)
          and f.id_project = coalesce(pid,f.id_project);
  RETURN ref;
END;
$$ LANGUAGE plpgsql;