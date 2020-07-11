CREATE OR REPLACE FUNCTION createnetwork(n VARCHAR(100), nt network_type) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.network (name,network_type,status) VALUES (n, nt,true);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatenetwork(n VARCHAR(100), nt network_type,idn integer) 
RETURNS void AS $$
BEGIN
  UPDATE public.network SET name = n, network_type = nt WHERE id_network = idn;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION deletenetwork(idn integer) 
RETURNS void AS $$
BEGIN
  DELETE FROM public.network WHERE id_network = idn;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getnetworks(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM network
    order by status desc;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getnetworksEnable(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM network where status = true;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION getnetworksbyid(pid INTEGER, ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM network WHERE id_network = pid;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;


--###########################################################################

CREATE OR REPLACE FUNCTION disablenetwork(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.network
        SET status=false
    WHERE id_network = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################

CREATE OR REPLACE FUNCTION enablenetwork(pid INTEGER)
    RETURNS void AS $$
    BEGIN
    UPDATE public.network
        SET status=true
    WHERE id_network = pid;
    END;
$$ LANGUAGE plpgsql;

--###########################################################################
