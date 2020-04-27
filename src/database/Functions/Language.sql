CREATE OR REPLACE FUNCTION getlanguage(ref refcursor) RETURNS refcursor AS $$
BEGIN
  OPEN ref FOR 
    SELECT * FROM public.language;
  RETURN ref;
END;
$$ LANGUAGE plpgsql;