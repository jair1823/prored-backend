----------------------------------------------------------------------------------------------------------------- 

-- Get Students con Cursor

CREATE OR REPLACE FUNCTION getstudents(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,
p.born_dates, d.id_district ,d.name as district, 
c.campus_code, c.name as campus,
s.marital_status, s.profile, s.address, s.nationality

from public.person p
inner join public.student s on s.dni = p.dni
inner join public.district d on d.id_district = s.id_district
inner join public.campus c on c.campus_code = s.campus_code
where p.status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

----------------------------------------------------------------------------------------------------------------- 

CREATE OR REPLACE FUNCTION createnetwork(n VARCHAR(70), nt network_type) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.network (name,network_type) VALUES (n, nt);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updatenetwork(n VARCHAR(70), nt network_type,idn integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.network SET name = n, network_type = nt WHERE id_network = idn;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deletenetwork(idn integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.network WHERE id_network = idn;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createinvestigation_unit(n VARCHAR(70)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.investigation_unit (name) VALUES (n);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updateinvestigation_unit(n VARCHAR(70),idi integer) 
RETURNS void AS $$
BEGIN
	UPDATE public.investigation_unit SET name = n WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deleteinvestigation_unit(idi integer) 
RETURNS void AS $$
BEGIN
	DELETE FROM public.investigation_unit WHERE id_inv_unit = idi;
END;
$$ LANGUAGE plpgsql;

------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createacademic_unit(n VARCHAR(70)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.academic_unit (name) VALUES (n);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updateacademic_unit(n VARCHAR(70),ida integer) 
RETURNS void AS $$
BEGIN
	UPDATE public.academic_unit SET name = n WHERE id_academic_unit = ida;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deleteacademic_unit(ida integer) 
RETURNS void AS $$
BEGIN
	DELETE FROM public.academic_unit WHERE id_academic_unit = ida;
END;
$$ LANGUAGE plpgsql;

--------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createassociated_career(n VARCHAR(70), idc integer) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.associated_career(name,id_center) values(n,idc);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updateassociated_career(n VARCHAR(70), idac integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.associated_career SET name = n WHERE id_associated_career = idac;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deleteassociated_career(idac integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.associated_career WHERE id_associated_career = idac;
END;
$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createcampus(ccode VARCHAR(30), n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.campus (campus_code, name) VALUES (ccode,n);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updatecampus(ccoden VARCHAR(30), n VARCHAR(50),ccodeo VARCHAR(30)) 
RETURNS void AS $$
BEGIN
  UPDATE public.campus SET campus_code = ccoden, name = n WHERE campus_code = ccodeo;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deletecampus(ccode VARCHAR(30)) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.campus WHERE campus_code = ccode;
END;
$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createcareer(ccode integer, n VARCHAR(100), dg degree) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.career(career_code, name, degree) values (ccode,n,dg);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updatecareer(n VARCHAR(100), dg degree, ccode integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.career SET name = n, degree = dg WHERE career_code = ccode;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deletecareer(ccode integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.career WHERE career_code = ccode;
END;
$$ LANGUAGE plpgsql;

-------------------------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION createcenter(n VARCHAR(50)) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.center(name) values(n);
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION updatecenter(n VARCHAR(50),idc integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.center SET name = n WHERE id_center = idc;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION deletecenter(idc integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.center WHERE id_center = idc;
END;
$$ LANGUAGE plpgsql;