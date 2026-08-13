
-- Transfer ownership of the public schema to 'beemood'
-- This grants full rights to CREATE, ALTER, and DROP tables/indexes/views/types
ALTER SCHEMA public OWNER TO beemood;

-- Grant all schema-level privileges explicitly
GRANT ALL PRIVILEGES ON SCHEMA public TO beemood;

-- Ensure future objects created by anyone in public schema grant full access to 'beemood'
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO beemood;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO beemood;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO beemood;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TYPES TO beemood;