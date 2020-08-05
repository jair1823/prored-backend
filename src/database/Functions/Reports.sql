CREATE OR REPLACE FUNCTION financialStudentsReport(
  pstartdate date,
  penddate date, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select bsu."name" as subUnitName, concat( p.name,' ' ,p.lastname1 ,' ' ,p.lastname2 ) as personName,sum(fi.amount ) from financial_item fi
    inner join person p on p.dni = fi.dni
    inner join budget_sub_unit bsu on bsu.code_budget_subunit = fi.code_subunit 
    where fi.code_unit = 60109
    and (fi.date_created between coalesce(pstartdate,fi.date_created) and coalesce(penddate,fi.date_created))
    group by p.name,p.lastname1 , p.lastname2, bsu."name"
    order by bsu."name";
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION financialProjectsReport(
  pstartdate date,
  penddate date, 
  ref refcursor
  ) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR
    select bsu."name" as subUnitName ,prj."name" as projectName,sum(fi.amount ) from financial_item fi
    inner join person p on p.dni = fi.dni
    inner join budget_sub_unit bsu on bsu.code_budget_subunit = fi.code_subunit
    inner join project prj on prj.id_project = fi.id_project 
    where fi.code_unit = 60109 and fi.id_project is not null
    and (fi.date_created between coalesce(pstartdate,fi.date_created) and coalesce(penddate,fi.date_created))
    group by bsu."name", prj."name" 
    order by bsu."name";
  RETURN ref;
END;
$$ LANGUAGE plpgsql;