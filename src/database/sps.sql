-- Get Students 

-- DROP FUNCTION getstudents();

CREATE OR REPLACE FUNCTION getstudents () 
   RETURNS TABLE (
      dni VARCHAR,
      name VARCHAR,
	  lastname1 VARCHAR,
	  lastname2 VARCHAR,
	  born_dates DATE,
   	  id_district INT,
	  district VARCHAR,
	  campus_code VARCHAR,
	  campus VARCHAR,
	  marital_status marital_status,
	  profile profile,
	  address TEXT,
	  nationality nationality
   )
AS $$
BEGIN
   RETURN QUERY select 
p.dni, p.name, p.lastname1, p.lastname2,
p.born_dates, d.id_district ,d.name as district, 
c.campus_code, c.name as campus,
s.marital_status, s.profile, s.address, s.nationality

from public.person p
inner join public.student s on s.dni = p.dni
inner join public.district d on d.id_district = s.id_district
inner join public.campus c on c.campus_code = s.campus_code
where p.status = true;
END; $$ 
 
LANGUAGE 'plpgsql';

SELECT * FROM getstudents();

-- 