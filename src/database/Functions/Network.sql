CREATE OR REPLACE FUNCTION createnetwork(n VARCHAR(50), nt network_type) 
RETURNS void AS $$
BEGIN
  INSERT INTO public.network (name,network_type) VALUES (n, nt);
END;
$$ LANGUAGE plpgsql;

--########################################################################################

CREATE OR REPLACE FUNCTION updatenetwork(n VARCHAR(50), nt network_type,idn integer) 
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
    SELECT * FROM network;
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