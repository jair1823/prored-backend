--###########################################################################

CREATE OR REPLACE FUNCTION getstudents(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, d.id_district ,d.name as district, 
c.campus_code, c.name as campus,
s.marital_status, s.profile, s.address, s.nationality,s.emergency_contact,p.status

from public.person p
inner join public.student s on s.dni = p.dni
inner join public.district d on d.id_district = s.id_district
inner join public.campus c on c.campus_code = s.campus_code
where p.status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getstudentsall(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, d.id_district ,d.name as district, 
c.campus_code, c.name as campus,
s.marital_status, s.profile, s.address, s.nationality,s.emergency_contact,p.status

from public.person p
inner join public.student s on s.dni = p.dni
inner join public.district d on d.id_district = s.id_district
inner join public.campus c on c.campus_code = s.campus_code
order by p.status desc;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getstudentsbasic(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR select 
p.dni, p.name, p.lastname1, p.lastname2,p.status
from public.person p
inner join public.student s on s.dni = p.dni
order by p.status desc;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--#######################################################################

CREATE OR REPLACE FUNCTION getstudentbydni(pdni varchar(50),ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR select 
        p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
        TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, d.id_district ,d.name as district, 
        c.campus_code, c.name as campus,
        s.marital_status, s.profile, s.address, s.nationality,s.emergency_contact,p.status
    from public.person p
    inner join public.student s on s.dni = p.dni
    inner join public.district d on d.id_district = s.id_district
    inner join public.campus c on c.campus_code = s.campus_code
    where p.status = true and p.dni = pdni;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getstudentbydniall(pdni varchar(50),ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR select 
        p.dni, p.name, p.lastname1, p.lastname2,p.phone_number,p.email,
        TO_CHAR(p.born_dates,'YYYY-mm-dd') AS born_dates, d.id_district ,d.name as district, 
        c.campus_code, c.name as campus,
        s.marital_status, s.profile, s.address, s.nationality,s.emergency_contact,p.status
    from public.person p
    inner join public.student s on s.dni = p.dni
    inner join public.district d on d.id_district = s.id_district
    inner join public.campus c on c.campus_code = s.campus_code
    where p.dni = pdni;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION getstudentstatus(pdni varchar(50),ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR 
        SELECT p.status FROM
        public.student s 
        INNER JOIN public.person p ON s.dni = p.dni
        WHERE s.dni = pdni;

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

--###########################################################################

CREATE OR REPLACE FUNCTION getnetworksbydni(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
    OPEN ref FOR select n.id_network, n.name, n.network_type
        from public.network n
    inner join public.person_x_network pxn on n.id_network = pxn.id_network
    where dni = pdni;
    RETURN ref;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getlanguagesbydni(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

        OPEN ref FOR select l.id_language, l.name
            from public.language l
        inner join public.person_x_language pxl on l.id_language = pxl.id_language
        where dni = pdni;
        RETURN ref;

    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getassociatedcareersbydni(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN
        OPEN ref FOR select ac.id_associated_career, ac.name as associated_career,
                c.id_center, c.name as center
            from public.associated_career ac
        inner join public.person_x_associated_career pxa on ac.id_associated_career = pxa.id_associated_career
        inner join public.center c on c.id_center = ac.id_center
        where dni = pdni;
        
        RETURN ref;

    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createperson(
    pdni varchar(50),
    pname varchar(50),
    plastname1 varchar(50),
    plastname2 varchar(50),
    pborn_dates date,
    pphone varchar(40),
    pmail varchar(60),
    ptype person_type
    )
    RETURNS void AS $$
    BEGIN
        INSERT INTO public.person( dni, name, lastname1, lastname2, born_dates, status, phone_number, email,person_type)
            VALUES (pdni, pname, plastname1, plastname2, pborn_dates, true,pphone,pmail,ptype);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createstudent(
    pdni varchar(50),
    pid_district integer,
    pmarital_status marital_status,
    pcampus_code varchar(30),
    pprofile profile,
    paddress text,
    pnationality nationality,
    pemergency varchar(40)
    )
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.student(dni, id_district, marital_status, campus_code, profile, address, nationality, emergency_contact)
        VALUES (pdni, pid_district, pmarital_status, pcampus_code, pprofile, paddress, pnationality, pemergency);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createstudentxcareer(pdni varchar(50),pcareer_code integer)
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.person_x_career(dni, career_code)
        VALUES (pdni, pcareer_code);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createstudentxlanguage(pdni varchar(50), pid_language integer)
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.person_x_language(dni, id_language)
        VALUES (pdni, pid_language);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createstudentxassociatedcareer(pdni varchar(50), pid_associated_career integer)
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.person_x_associated_career(dni, id_associated_career)
        VALUES (pdni, pid_associated_career);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION createstudentxnetwork(pdni varchar(50), pid_network integer)
    RETURNS void AS $$
    BEGIN
    INSERT INTO public.person_x_network(dni, id_network)
        VALUES (pdni, pid_network);
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION updatestudent(
    pdni varchar(50), 
    pname varchar(50), 
    plastname1 varchar(50), 
    plastname2 varchar(50),
    pborn_dates date,
    pid_district integer,
    pmarital_status marital_status,
    pcampus_code varchar(30),
    pprofile profile,
    paddress text,
    pnationality nationality,
    pphone varchar(40),
    pmail varchar(60),
    pemergency varchar(40)
    )
    RETURNS void AS $$
    BEGIN
        UPDATE public.person
            SET 
                name=pname,
                lastname1=plastname1,
                lastname2=plastname2,
                born_dates=pborn_dates,
                phone_number=pphone, 
                email=pmail
        WHERE dni = pdni;
        UPDATE public.student
            SET 
            id_district=pid_district,
            marital_status=pmarital_status,
            campus_code=pcampus_code,
            profile=pprofile,
            address=paddress,
            nationality=pnationality,
            emergency_contact=pemergency
        WHERE dni = pdni;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletestudentxcareer(pdni varchar(50),pcareer_code integer)
    RETURNS void AS $$
    BEGIN
    DELETE FROM public.person_x_career
	    WHERE dni = pdni and career_code = pcareer_code;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletestudentxlanguage(pdni varchar(50),pid_language integer)
    RETURNS void AS $$
    BEGIN
    DELETE FROM public.person_x_language
        WHERE dni = pdni and id_language = pid_language;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletestudentxassociatedcareer(pdni varchar(50), pid_associated_career integer)
    RETURNS void AS $$
    BEGIN
    DELETE FROM public.person_x_associated_career
        WHERE dni = pdni and id_associated_career = pid_associated_career;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION deletestudentxnetwork(pdni varchar(50), pid_network integer)
    RETURNS void AS $$
    BEGIN
    DELETE FROM public.person_x_network
        WHERE dni = pdni and id_network = pid_network;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getstudentbyprofile(pprofile profile, ref refcursor)
    RETURNS refcursor AS $$
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
    where p.status = true and S.profile = pprofile;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION getdirectionbydni(pdni varchar(50), ref refcursor)
    RETURNS refcursor AS $$
    BEGIN

    OPEN ref FOR select  
        d.id_district,d.name as district_name, 
        c.id_canton, c.name as canton_name,
        p.id_province, p.name
    from public.district d
    inner join public.student s on s.id_district = d.id_district
    inner join public.canton c on c.id_canton = d.id_canton
    inner join public.province p on p.id_province = c.id_province
    where s.dni = pdni;

    RETURN ref;

    END;
$$ LANGUAGE plpgsql;